import type { Meta, StoryObj } from '@storybook/react';
import { 
  H1, H2, H3, H4, 
  P, Lead, Large, Small, 
  Muted, InlineCode, MultilineCode,
  List, Quote 
} from './typography';

const meta = {
  title: 'UI/Typography',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  render: () => (
    <H1>Heading 1</H1>
  ),
};

export const Heading2: Story = {
  render: () => (
    <H2>Heading 2</H2>
  ),
};

export const Heading3: Story = {
  render: () => (
    <H3>Heading 3</H3>
  ),
};

export const Heading4: Story = {
  render: () => (
    <H4>Heading 4</H4>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <P>This is a regular paragraph with some text. It demonstrates the standard paragraph styling with proper line height and spacing.</P>
  ),
};

export const LeadParagraph: Story = {
  render: () => (
    <Lead>This is a lead paragraph that stands out with larger text and muted color.</Lead>
  ),
};

export const LargeText: Story = {
  render: () => (
    <Large>This is large text with semi-bold weight.</Large>
  ),
};

export const SmallText: Story = {
  render: () => (
    <Small>This is small text with medium weight.</Small>
  ),
};

export const MutedText: Story = {
  render: () => (
    <Muted>This is muted text with reduced emphasis.</Muted>
  ),
};

export const InlineCodeExample: Story = {
  render: () => (
    <P>Here is some text with <InlineCode>inline code</InlineCode> inside it.</P>
  ),
};

export const MultilineCodeExample: Story = {
  render: () => (
    <MultilineCode>
{`function example() {
  return "Hello, World!";
}`}
    </MultilineCode>
  ),
};

export const ListExample: Story = {
  render: () => (
    <List>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </List>
  ),
};

export const QuoteExample: Story = {
  render: () => (
    <Quote>
      This is a blockquote that stands out with a border and italic text.
    </Quote>
  ),
};

export const TypographyShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <H1>Typography Example</H1>
      <H2>Various Text Styles</H2>
      <Lead>This is a lead paragraph that introduces the main content.</Lead>
      <P>This is a regular paragraph with standard text styling.</P>
      <H3>Code Examples</H3>
      <P>Here's some text with <InlineCode>inline code</InlineCode>.</P>
      <MultilineCode>
{`// This is a code block
function example() {
  return "Hello, World!";
}`}
      </MultilineCode>
      <H4>Additional Elements</H4>
      <List>
        <li>First item in a list</li>
        <li>Second item in a list</li>
        <li>Third item in a list</li>
      </List>
      <Quote>
        This is a notable quote that stands out from the rest of the content.
      </Quote>
      <Small>Small text for less emphasis</Small>
      <Muted>Muted text for secondary information</Muted>
    </div>
  ),
}; 