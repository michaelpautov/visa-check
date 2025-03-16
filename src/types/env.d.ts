declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
    SES_EMAIL_SENDER_CONSOLE_PASSWORD: string;
    SES_EMAIL_SENDER_CONSOLE_USERNAME: string;
    SES_CONSOLE_SIGN_IN_URL: string;
    SES_EMAIL_ACCESS_KEY: string;
    SES_SECRET_ACCESS_KEY: string;
    SES_FROM_EMAIL: string;
    AWS_REGION: string;
  }
}

