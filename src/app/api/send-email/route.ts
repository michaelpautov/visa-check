import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/aws/ses/send-email';

// Типы для данных запроса
interface RequestData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface FileData {
  buffer: Buffer;
  name: string;
  type: string;
}

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Обрабатывает multipart/form-data запрос и извлекает данные формы и файл
 */
async function processFormData(request: NextRequest): Promise<{ data: RequestData; attachments: FileData[] }> {
  const formData = await request.formData();
  
  const data: RequestData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  };
  
  const paymentProof = formData.get('paymentProof') as File | null;
  const passport = formData.get('passport') as File | null;
  const attachments: FileData[] = [];
  
  // Process payment proof file
  if (paymentProof) {
    // Check file size
    if (paymentProof.size > MAX_FILE_SIZE) {
      throw new Error(`Payment proof file is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }
    
    // Convert file to buffer
    const arrayBuffer = await paymentProof.arrayBuffer();
    attachments.push({
      buffer: Buffer.from(arrayBuffer),
      name: paymentProof.name,
      type: paymentProof.type,
    });
  }
  
  // Process passport file
  if (passport) {
    // Check file size
    if (passport.size > MAX_FILE_SIZE) {
      throw new Error(`Passport file is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }
    
    // Convert file to buffer
    const arrayBuffer = await passport.arrayBuffer();
    attachments.push({
      buffer: Buffer.from(arrayBuffer),
      name: passport.name,
      type: passport.type,
    });
  }
  
  return { data, attachments };
}

/**
 * Валидирует данные запроса
 */
function validateRequestData(data: RequestData): void {
  if (!data.name || !data.email || !data.message) {
    throw new Error('Missing required fields');
  }
}

/**
 * Создает HTML и текстовое содержимое письма
 */
function createEmailContent(data: RequestData, attachments: FileData[] = []): { html: string; text: string } {
  const attachmentsHtml = attachments.length > 0 
    ? `<p><strong>Приложения:</strong></p><ul>${attachments.map(file => 
        `<li>${file.name} (${(file.buffer.length / 1024).toFixed(2)} KB)</li>`).join('')}</ul>` 
    : '';
  
  const attachmentsText = attachments.length > 0 
    ? `\nПриложения:\n${attachments.map(file => 
        `- ${file.name} (${(file.buffer.length / 1024).toFixed(2)} KB)`).join('\n')}` 
    : '';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Новое сообщение с сайта</h2>
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Сообщение:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${data.message.replace(/\n/g, '<br>')}
      </div>
      ${attachmentsHtml}
    </div>
  `;

  const textContent = `
    Новое сообщение с сайта
    
    Имя: ${data.name}
    Email: ${data.email}
    Сообщение: ${data.message}
    ${attachmentsText}
  `;

  return { html: htmlContent, text: textContent };
}

export async function POST(request: NextRequest) {
  try {
    // Определяем тип запроса
    const contentType = request.headers.get('content-type') || '';
    
    let data: RequestData;
    let attachments: FileData[] = [];
    
    // Обрабатываем запрос в зависимости от типа
    if (contentType.includes('multipart/form-data')) {
      const result = await processFormData(request);
      data = result.data;
      attachments = result.attachments;
    } else {
      // Обрабатываем JSON запрос (для обратной совместимости)
      data = await request.json() as RequestData;
    }
    
    // Валидируем данные
    validateRequestData(data);

    // Создаем содержимое письма
    const { html, text } = createEmailContent(data, attachments);
    
    // Отправляем письмо
    const result = await sendEmail({
      to: 'michael.pautov.bali@gmail.com', // Отправляем на верифицированный email
      subject: data.subject || 'Новое сообщение с сайта',
      text,
      html,
      attachments: attachments.length > 0 ? attachments.map(file => ({
        content: file.buffer,
        filename: file.name,
        contentType: file.type
      })) : undefined
    });

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully',
        messageId: result.messageId
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error sending email',
          error: result.error
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in email API route:', error);
    
    // Определяем статус ошибки
    let status = 500;
    let message = 'Error sending email';
    
    if (error instanceof Error) {
      // Для ошибок валидации возвращаем 400
      if (error.message.includes('Missing required fields') || 
          error.message.includes('too large')) {
        status = 400;
        message = error.message;
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status }
    );
  }
}