'use client'
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useVisaStep } from '../_providers/visa-step-provider';
import { useSendEmail } from '@/hooks/use-send-email';
import { useMemo } from 'react';

interface VisaStepLayoutButtonProps {
  className?: string;
}

export function VisaStepLayoutButton({ className = 'w-full' }: VisaStepLayoutButtonProps) {
  const { currentStep, goToNextStep, canProceed } = useVisaStep();
  const t = useTranslations('common');
  const tButton = useTranslations('components.visaStepLayoutButton');

  const { isLoading, messageId, sendEmail } = useSendEmail();

  const buttonText = useMemo(() => {
    if (isLoading) return tButton('sending');
    if (messageId) return tButton('sent');
    if (currentStep === 'visaPayment') return tButton('sendEmail');
    return t(currentStep === 'visaFiles' ? 'skip' : 'continue');
  }, [isLoading, messageId, currentStep, tButton, t]);

  const handleClick = () => {
    if (currentStep === 'visaPayment') {
      sendEmail();
    } else {
      goToNextStep();
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={className}
      disabled={!canProceed && currentStep !== 'visaFiles'}
    >
      {buttonText}
    </Button>
  );
} 