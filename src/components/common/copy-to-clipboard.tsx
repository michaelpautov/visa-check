import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CopyToClipboard({ text, className = '', variant = 'outline', size = 'sm', fullWidth = true }: { 
  text: string; 
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  fullWidth?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      size={size}
      className={cn('flex items-center justify-between', fullWidth && 'w-full', className)}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      title="Copy to clipboard"
    >
      {text}
      {copied ? <FiCheck /> : <FiCopy />}
    </Button>
  );
}