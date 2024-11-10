import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'sonner';

import { Button } from './button';
import { Toaster } from './sonner';

const meta = {
  title: 'UI/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
          })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  ),
};

export const Success: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast.success('Success', {
            description: 'Your action was completed successfully',
          })
        }
      >
        Show Success Toast
      </Button>
      <Toaster />
    </>
  ),
};

export const Error: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast.error('Error', {
            description: 'There was a problem with your request',
          })
        }
      >
        Show Error Toast
      </Button>
      <Toaster />
    </>
  ),
}; 