import { EMAIL_CONFIG } from "@/constants/email";
import { SESClient, SendEmailCommand, SendEmailCommandInput, SendRawEmailCommand } from "@aws-sdk/client-ses";
import { z } from "zod";
import { createMimeMessage } from "./mime-builder";

// Конфигурация SES
interface SESConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  fromEmail: string;
}

export interface EmailAttachment {
  content: Buffer;
  filename: string;
  contentType: string;
}

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachment?: EmailAttachment;
  attachments?: EmailAttachment[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Схема для валидации конфигурации окружения
const envSchema = z.object({
  AWS_REGION: z.string().min(1),
  SES_EMAIL_ACCESS_KEY: z.string().min(1),
  SES_SECRET_ACCESS_KEY: z.string().min(1),
  SES_FROM_EMAIL: z.string().email(),
});

function getSESConfig(): SESConfig {
  try {
    // Валидируем переменные окружения
    const env = envSchema.parse(process.env);
    
    return {
      region: env.AWS_REGION,
      accessKeyId: env.SES_EMAIL_ACCESS_KEY,
      secretAccessKey: env.SES_SECRET_ACCESS_KEY,
      fromEmail: env.SES_FROM_EMAIL || EMAIL_CONFIG.from,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(e => e.path.join('.'));
      throw new Error(`Missing or invalid environment variables: ${missingVars.join(', ')}`);
    }
    throw error;
  }
}

// Класс для отправки электронной почты через SES
class SESEmailService {
  private client: SESClient;
  private config: SESConfig;

  constructor() {
    this.config = getSESConfig();
    this.client = new SESClient({
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
    });
  }

  /**
   * Отправляет электронное письмо через AWS SES
   */
  async sendEmail(params: SendEmailParams): Promise<{ messageId: string }> {
    const { to, subject, html, text, cc, bcc, replyTo, attachment, attachments } = params;
    
    // Если есть вложения, используем SendRawEmailCommand
    if (attachment || attachments?.length) {
      return this.sendEmailWithAttachment(params);
    }
    
    // Преобразуем получателей в массив, если это строка
    const toAddresses = Array.isArray(to) ? to : [to];
    const ccAddresses = cc ? (Array.isArray(cc) ? cc : [cc]) : undefined;
    const bccAddresses = bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined;
    
    // Создаем параметры для команды отправки
    const emailParams: SendEmailCommandInput = {
      Source: this.config.fromEmail,
      Destination: {
        ToAddresses: toAddresses,
        ...(ccAddresses && { CcAddresses: ccAddresses }),
        ...(bccAddresses && { BccAddresses: bccAddresses }),
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          ...(html && {
            Html: {
              Data: html,
              Charset: "UTF-8",
            },
          }),
          ...(text && {
            Text: {
              Data: text,
              Charset: "UTF-8",
            },
          }),
        },
      },
      ...(replyTo && { ReplyToAddresses: [replyTo] }),
    };

    try {
      // Отправляем письмо
      const command = new SendEmailCommand(emailParams);
      const response = await this.client.send(command);
      
      return {
        messageId: response.MessageId || "",
      };
    } catch (error) {
      console.error("Error sending email via SES:", error);
      throw error;
    }
  }

  /**
   * Отправляет электронное письмо с вложением через AWS SES
   * Использует SendRawEmailCommand для поддержки вложений
   */
  private async sendEmailWithAttachment(params: SendEmailParams): Promise<{ messageId: string }> {
    const { to, subject, html, text, cc, bcc, replyTo, attachment, attachments } = params;
    
    // If no attachments, use regular send
    if (!attachment && (!attachments || attachments.length === 0)) {
      return this.sendEmail({ ...params, attachment: undefined, attachments: undefined });
    }

    try {
      // Prepare all attachments
      const allAttachments: EmailAttachment[] = [];
      
      // Add single attachment if provided
      if (attachment) {
        allAttachments.push(attachment);
      }
      
      // Add multiple attachments if provided
      if (attachments && attachments.length > 0) {
        allAttachments.push(...attachments);
      }

      // Создаем MIME-сообщение
      const rawMessage = await createMimeMessage({
        from: this.config.fromEmail,
        to: Array.isArray(to) ? to : [to],
        cc: cc ? (Array.isArray(cc) ? cc : [cc]) : undefined,
        bcc: bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined,
        replyTo: replyTo,
        subject,
        html,
        text,
        attachments: allAttachments,
      });

      // Отправляем сырое MIME-сообщение
      const command = new SendRawEmailCommand({
        RawMessage: { Data: rawMessage },
      });

      const response = await this.client.send(command);
      
      return {
        messageId: response.MessageId || "",
      };
    } catch (error) {
      console.error("Error sending email with attachment via SES:", error);
      throw error;
    }
  }
}

// Создаем экземпляр сервиса
const sesEmailService = new SESEmailService();

export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  try {
    console.info('Attempting to send email', {
      to: params.to,
      from: EMAIL_CONFIG.from,
      subject: params.subject,
      hasAttachment: !!params.attachment,
      attachmentsCount: params.attachments?.length || 0
    });
    
    // Отправляем письмо через SES
    const result = await sesEmailService.sendEmail(params);
    
    console.info('Email sent successfully', {
      messageId: result.messageId,
    });
    
    return { 
      success: true, 
      messageId: result.messageId 
    };
  } catch (error) {
    console.error("Error sending email with SES:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
