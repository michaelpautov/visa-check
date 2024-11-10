import type { Meta, StoryObj } from '@storybook/react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';
import { Button } from './button';

const meta = {
  title: 'UI/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a drawer component that slides up from the bottom of the screen.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Drawer content goes here</p>
        </div>
      </DrawerContent>
    </Drawer>
  ),
}; 