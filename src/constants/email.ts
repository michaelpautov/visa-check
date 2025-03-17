export const EMAIL_CONFIG = {
  from: process.env.SES_FROM_EMAIL,
  configurationSet: 'email-tracking',
};



export const MAX_FILE_SIZE = 5 * 1024 * 1024;