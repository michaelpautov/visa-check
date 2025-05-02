'use client'
import { ReactNode } from 'react';
import { useVisaStep } from '../_providers/visa-step-provider';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { FaChevronLeft } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { useNavigateBack } from '@/hooks/use-navigate-back';
import { VisaStepLayoutButton } from './visa-step-layout-button';

interface StepLayoutProps {
  children: ReactNode;
}

export function VisaStepLayout({ children }: StepLayoutProps) {
  const { currentStep, steps, goToPreviousStep, cleanState, cleanCurrentStep } = useVisaStep();
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
    <div className="flex flex-col min-h-screen max-h-screen">
      <div className="flex-none bg-background m-4 space-y-4">
        <div className="flex flex-row items-center justify-between">
          <Button className="-ml-4 hover:bg-transparent hover:text-primary" variant="ghost" onClick={handleBack}>
            <FaChevronLeft className="w-4 h-4" />
          </Button>
          {currentStep !== 'passportCountry' && <Button variant="link" onClick={navigateBack}>{t('saveAndExit')}</Button>}
        </div>
        <Progress value={((steps.indexOf(currentStep) + 1) / steps.length) * 100} />
      </div>

      <main className="flex-1 overflow-y-auto mx-4 pb-24">
        {children}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
        <VisaStepLayoutButton />
      </div>
    </div>
  );
} 