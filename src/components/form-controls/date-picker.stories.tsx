import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Form Controls/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {},
};

export const WithPreselectedDate: Story = {
  render: () => {
    return (
      <div className="min-w-[320px]">
        <DatePicker />
      </div>
    );
  },
};

export const WithInitialDate: Story = {
  args: {
    value: new Date('2024-03-15'),
  },
};

export const WithCustomWidth: Story = {
  args: {
    className: 'w-[400px]',
  },
}; 