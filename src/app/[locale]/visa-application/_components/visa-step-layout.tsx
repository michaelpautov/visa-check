'use client'
import { ReactNode } from 'react';
import { useVisaStep } from '../_providers/visa-step-provider';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { FaChevronLeft } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { useNavigateBack } from '@/hooks/use-navigate-back';

interface StepLayoutProps {
  children: ReactNode;
}

export function VisaStepLayout({ children }: StepLayoutProps) {
  const { currentStep, steps, goToNextStep, goToPreviousStep, canProceed, cleanState, cleanCurrentStep } = useVisaStep();
  const t = useTranslations('common');

  const navigateBack = useNavigateBack()

  const handleBack = () => {
    if (currentStep === 'passportCountry') {
      cleanState()
      navigateBack()
    } else {
      cleanCurrentStep()
      goToPreviousStep();
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none bg-background m-4 space-y-4">
        <div className="flex flex-row items-center justify-between">
          <Button className="-ml-4 hover:bg-transparent hover:text-primary" variant="ghost" onClick={handleBack}>
            <FaChevronLeft className="w-4 h-4" />
          </Button>
          {currentStep !== 'passportCountry' && <Button variant="link" onClick={navigateBack}>{t('saveAndExit')}</Button>}
        </div>
        <Progress value={((steps.indexOf(currentStep) + 1) / steps.length) * 100} />
      </div>

      <main className="flex-1 overflow-auto px-4">
        {children}
      </main>

      <div className="flex-none p-4 bg-background">
        <Button
          onClick={goToNextStep}
          className="w-full"
          disabled={!canProceed && currentStep !== 'visaFiles'}
        >
          {t(currentStep === 'visaFiles' ? 'skip' : 'continue')}
        </Button>
      </div>
    </div>
  );
} 