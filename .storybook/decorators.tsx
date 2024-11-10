import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { Decorator } from '@storybook/react';

export const withClerk: Decorator = (Story) => {
  return (
    <div style={{ minWidth: '320px' }}>
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''}>
        <Story />
      </ClerkProvider>
    </div>
  );
}; 