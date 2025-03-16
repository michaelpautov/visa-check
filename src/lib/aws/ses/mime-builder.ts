import { Buffer } from 'buffer';
import { EmailAttachment } from './send-email';

interface MimeMessageOptions {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
  configurationSet?: string;
}

/**
 * Создает MIME-сообщение для отправки через AWS SES SendRawEmail
 */
export async function createMimeMessage(options: MimeMessageOptions): Promise<Uint8Array> {
  const {
    from,
    to,
    cc,
    bcc,
    replyTo,
    subject,
    html,
    text,
    attachments = [],
    configurationSet,
  } = options;

  // Генерируем уникальный boundary для разделения частей MIME
  const boundary = `----=_Part_${Math.random().toString(36).substr(2)}`;
  const rootBoundary = `----=_RootPart_${Math.random().toString(36).substr(2)}`;

  // Формируем заголовки
  let headers = [
    `From: ${from}`,
    `To: ${to.join(', ')}`,
    ...(cc && cc.length > 0 ? [`Cc: ${cc.join(', ')}`] : []),
    ...(bcc && bcc.length > 0 ? [`Bcc: ${bcc.join(', ')}`] : []),
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    ...(configurationSet ? [`X-SES-CONFIGURATION-SET: ${configurationSet}`] : []),
    `Content-Type: multipart/mixed; boundary="${rootBoundary}"`,
    '',
    `--${rootBoundary}`,
  ];

  // Если есть и HTML, и текст, создаем multipart/alternative
  if (html && text) {
    headers = [
      ...headers,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      text,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      html,
      '',
      `--${boundary}--`,
    ];
  } else if (html) {
    // Только HTML
    headers = [
      ...headers,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      html,
    ];
  } else if (text) {
    // Только текст
    headers = [
      ...headers,
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      text,
    ];
  }

  // Добавляем вложения
  for (const attachment of attachments) {
    headers = [
      ...headers,
      '',
      `--${rootBoundary}`,
      `Content-Type: ${attachment.contentType || 'application/octet-stream'}; name="${attachment.filename}"`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${attachment.filename}"`,
      '',
      // Преобразуем содержимое в base64 и разбиваем на строки по 76 символов
      attachment.content.toString('base64').match(/.{1,76}/g)?.join('\r\n') || '',
    ];
  }

  // Закрываем корневую границу
  headers = [...headers, '', `--${rootBoundary}--`];

  // Объединяем все строки с CRLF
  const message = headers.join('\r\n');

  // Возвращаем как Uint8Array
  return Buffer.from(message, 'utf-8');
} 