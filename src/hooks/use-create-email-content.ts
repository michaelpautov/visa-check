import { useVisaStep } from '@/app/[locale]/visa-application/_providers/visa-step-provider';
import { useMemo } from 'react';

export function useCreateEmailContent() {
  const { formData, forms } = useVisaStep();
  
  // Extract files from the payment form using useMemo
  const { files, paymentProof, passport } = useMemo(() => {
    const files: File[] = [];
    const paymentProof = forms.visaPayment.getValues('paymentProof') as File | undefined;
    const passport = forms.visaPayment.getValues('passport') as File | undefined;
    
    if (paymentProof) files.push(paymentProof);
    if (passport) files.push(passport);
    
    return { files, paymentProof, passport };
  }, [forms.visaPayment]);
  
  return useMemo(() => {
    // Create a data object with all the necessary fields for the email
    const data = {
      // Basic info
      name: formData.visaPersonalData ? `${formData.visaPersonalData.firstName} ${formData.visaPersonalData.lastName}` : '',
      email: formData.visaPersonalData?.email || '',
      message: '', // Add message if needed
      
      // Form data sections
      passportCountry: formData.passportCountry,
      visaType: formData.visaType,
      visaArrivalDates: formData.visaArrivalDates,
      visaPersonalData: formData.visaPersonalData,
      visaPassportInformation: formData.visaPassportInformation,
      visaOrder: formData.visaOrder,
      
      // Payment info
      paymentMethod: forms.visaPayment.getValues('paymentMethod'),
      paymentProofName: paymentProof?.name,
      paymentProofSize: paymentProof?.size,
      passportFileName: passport?.name,
      passportFileSize: passport?.size,
    };

    const attachmentsHtml = files.length > 0 
      ? `<div style="margin-top: 20px;">
           <p style="font-weight: 600; color: #333; margin-bottom: 10px;">Приложения:</p>
           <ul style="list-style-type: none; padding: 0; margin: 0;">
             ${files.map(file => 
               `<li style="display: flex; align-items: center; margin-bottom: 8px;">
                  <span style="display: inline-block; width: 16px; height: 16px; margin-right: 8px;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4F46E5" width="16px" height="16px">
                      <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4l-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z"/>
                    </svg>
                  </span>
                  <span style="color: #4F46E5;">${file.name}</span>
                  <span style="color: #6B7280; font-size: 0.875rem; margin-left: 8px;">(${(file.size / 1024).toFixed(2)} KB)</span>
                </li>`
             ).join('')}
           </ul>
         </div>` 
      : '';
    
    const attachmentsText = files.length > 0 
      ? `\nПриложения:\n${files.map(file => 
          `- ${file.name} (${(file.size / 1024).toFixed(2)} KB)`).join('\n')}` 
      : '';

    // Создаем секции для детальной информации о визовой заявке
    const sections = [];

    // Passport Country Section
    if (data.passportCountry) {
      sections.push({
        title: 'Passport Country',
        content: [
          `- Passport Country: ${data.passportCountry.passportCountry.name}`,
          `- Fly To Country: ${data.passportCountry.flyToCountry.name}`
        ],
        color: '#2563EB',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563EB" width="20px" height="20px" style="margin-right: 8px;">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
        </svg>`
      });
    }

    // Visa Type Section
    if (data.visaType && data.visaType.selectedVisas.length > 0) {
      sections.push({
        title: 'Visa Type',
        content: [
          `- Selected Visas: ${data.visaType.selectedVisas.map(visa => 
            visa.shortName || visa.type || `${visa.day} days visa`
          ).join(', ')}`
        ],
        color: '#8B5CF6',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8B5CF6" width="20px" height="20px" style="margin-right: 8px;">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>`
      });
    }

    // Arrival Dates Section
    if (data.visaArrivalDates) {
      sections.push({
        title: 'Arrival Dates',
        content: [
          `- Arrival Date: ${data.visaArrivalDates.arrivalDate ? new Date(data.visaArrivalDates.arrivalDate).toLocaleDateString() : 'Not provided'}`,
          `- Departure Date: ${data.visaArrivalDates.departureDate ? new Date(data.visaArrivalDates.departureDate).toLocaleDateString() : 'Not provided'}`
        ],
        color: '#10B981',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10B981" width="20px" height="20px" style="margin-right: 8px;">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>`
      });
    }

    // Personal Information Section
    if (data.visaPersonalData) {
      sections.push({
        title: 'Personal Information',
        content: [
          `- Name: ${data.visaPersonalData.firstName} ${data.visaPersonalData.lastName}`,
          `- Email: ${data.visaPersonalData.email}`,
          `- Date of Birth: ${data.visaPersonalData.dateOfBirth ? new Date(data.visaPersonalData.dateOfBirth).toLocaleDateString() : 'Not provided'}`
        ],
        color: '#F59E0B',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F59E0B" width="20px" height="20px" style="margin-right: 8px;">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>`
      });
    }

    // Passport Information Section
    if (data.visaPassportInformation) {
      sections.push({
        title: 'Passport Information',
        content: [
          `- Passport Country: ${data.visaPassportInformation.passportCountry.name}`,
          `- Born Country: ${data.visaPassportInformation.bornCountry.name}`,
          `- Passport Number: ${data.visaPassportInformation.passportNumber || 'Not provided'}`,
          `- Passport Expiration Date: ${data.visaPassportInformation.passportExpirationDate ? new Date(data.visaPassportInformation.passportExpirationDate).toLocaleDateString() : 'Not provided'}`
        ],
        color: '#2563EB',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563EB" width="20px" height="20px" style="margin-right: 8px;">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
        </svg>`
      });
    }

    // Order Information Section
    if (data.visaOrder) {
      sections.push({
        title: 'Order Information',
        content: [
          `- Agreed to Terms: ${data.visaOrder.agreed ? 'Yes' : 'No'}`
        ],
        color: '#EC4899',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EC4899" width="20px" height="20px" style="margin-right: 8px;">
          <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>
        </svg>`
      });
    }

    // Payment Information Section
    if (data.paymentMethod || data.paymentProofName || data.passportFileName) {
      const paymentContent = [];
      
      if (data.paymentMethod) {
        paymentContent.push(`- Method: ${data.paymentMethod}`);
      }
      
      if (data.paymentProofName && data.paymentProofSize) {
        paymentContent.push(`- Payment Proof: ${data.paymentProofName} (${(data.paymentProofSize / 1024).toFixed(2)} KB)`);
      }
      
      if (data.passportFileName && data.passportFileSize) {
        paymentContent.push(`- Passport: ${data.passportFileName} (${(data.passportFileSize / 1024).toFixed(2)} KB)`);
      }
      
      sections.push({
        title: 'Payment Information',
        content: paymentContent,
        color: '#EF4444',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EF4444" width="20px" height="20px" style="margin-right: 8px;">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2zm-5 8.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>`
      });
    }

    // Создаем HTML для детальной информации
    const detailedInfoHtml = sections.length > 0
      ? `<div style="margin-bottom: 24px;">
          <p style="font-weight: 600; color: #333; margin-bottom: 10px;">Детали заявки:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; color: #374151; line-height: 1.5; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
              ${sections.map(section => `
                <div style="background-color: white; border-radius: 6px; padding: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                  <div style="display: flex; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
                    ${section.icon}
                    <h3 style="margin: 0; color: ${section.color}; font-size: 16px; font-weight: 600;">${section.title}</h3>
                  </div>
                  <div style="color: #4B5563; font-size: 14px; padding-left: 4px;">
                    ${section.content.map(line => `
                      <div style="display: flex; align-items: baseline; margin-bottom: 6px;">
                        <span style="color: ${section.color}; margin-right: 8px; font-size: 18px;">•</span>
                        <span style="flex: 1;">${line.replace('- ', '').replace(/: /g, ':</span><span style="font-weight: 500; margin-left: 4px;">')}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>`
      : '';

    // Создаем текстовую версию детальной информации
    const detailedInfoText = sections.length > 0
      ? '\n' + sections.map(section => 
          `${section.title}:\n${section.content.join('\n')}`
        ).join('\n\n')
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Новое сообщение с сайта</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; color: #111827;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background-color: #4F46E5; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Новое сообщение с сайта</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 24px;">
            <!-- User Info Section -->
            <div style="margin-bottom: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; width: 100px;">Имя:</td>
                  <td style="padding: 8px 0; font-weight: 500;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; width: 100px;">Email:</td>
                  <td style="padding: 8px 0; font-weight: 500;">${data.email}</td>
                </tr>
              </table>
            </div>
            
            ${data.message ? `
            <!-- Message Section -->
            <div style="margin-bottom: 24px;">
              <p style="font-weight: 600; color: #333; margin-bottom: 10px;">Сообщение:</p>
              <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; color: #374151; line-height: 1.5;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            ` : ''}
            
            <!-- Detailed Info Section -->
            ${detailedInfoHtml}
            
            <!-- Attachments Section -->
            ${attachmentsHtml}
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f3f4f6; padding: 16px; text-align: center; color: #6B7280; font-size: 14px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Visa Check. Все права защищены.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
      Новое сообщение с сайта
      
      Имя: ${data.name}
      Email: ${data.email}
      ${data.message ? `Сообщение: ${data.message}` : ''}
      ${detailedInfoText}
      ${attachmentsText}
    `;

    return { html: htmlContent, text: textContent };
  }, [formData, forms, paymentProof, passport, files]);
} 