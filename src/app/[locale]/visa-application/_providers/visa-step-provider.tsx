'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '@/components/ui/skeleton';
import VisaSkeleton from '../_components/visa-skeleton';

export type Step = 'passportCountry' | 'visaType';

export const passportCountrySchema = z.object({
  passportCountry: z.object({
    code: z.string(),
    name: z.string(),
    native: z.string(),
  }),
  flyToCountry: z.object({
    code: z.string(),
    name: z.string(),
    native: z.string(),
  }),
});

export const visaTypeSchema = z.object({
  visaType: z.string().min(2, 'Visa type is required'),
});

// Combined schema for the entire form
export const formSchema = z.object({
  passportCountry: passportCountrySchema,
  visaType: visaTypeSchema,
});

// TypeScript types from Zod schemas
export type PasportCountry = z.infer<typeof passportCountrySchema>;
export type VisaType = z.infer<typeof visaTypeSchema>;
export type FormData = z.infer<typeof formSchema>;

// Type for the forms map
type StepForms = {
  passportCountry: UseFormReturn<PasportCountry>;
  visaType: UseFormReturn<VisaType>;
};

interface StepContextType {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  steps: Step[];
  canProceed: boolean;
  setCanProceed: (can: boolean) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  forms: StepForms;
  formData: Partial<FormData>;
  isLoading: boolean;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

const STEPS: Step[] = ['passportCountry', 'visaType'];
const STORAGE_KEY = 'visaApplicationState';

interface StoredState {
  currentStep: Step;
  formData: Partial<FormData>;
}

export function VisaStepProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Step>('passportCountry');
  const [canProceed, setCanProceed] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load state from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { currentStep: savedStep, formData: savedFormData } = JSON.parse(saved) as StoredState;
        setCurrentStep(savedStep);
        setFormData(savedFormData);
      } catch (error) {
        console.error('Error loading saved state:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const passportCountryForm = useForm<PasportCountry>({
    resolver: zodResolver(passportCountrySchema),
    mode: 'onChange',
    defaultValues: formData.passportCountry,
  });

  const visaTypeForm = useForm<VisaType>({
    resolver: zodResolver(visaTypeSchema),
    mode: 'onChange',
    defaultValues: formData.visaType || { visaType: '' },
  });

  // Update forms when formData changes from localStorage
  useEffect(() => {
    if (formData) {
      if (formData.passportCountry) {
        passportCountryForm.reset(formData.passportCountry);
      }
      if (formData.visaType) {
        visaTypeForm.reset(formData.visaType);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, [formData]);

  const forms: StepForms = {
    passportCountry: passportCountryForm,
    visaType: visaTypeForm,
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      const state: StoredState = {
        currentStep,
        formData
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [currentStep, formData, isLoading]);

  // Update canProceed based on form validation
  useEffect(() => {
    const currentForm = forms[currentStep];
    const { formState } = currentForm;
    setCanProceed(formState.isDirty && formState.isValid);
  }, [currentStep, forms[currentStep].formState]);

  const goToNextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      const currentForm = forms[currentStep];
      currentForm.handleSubmit((data) => {
        setFormData(prev => ({
          ...prev,
          [currentStep]: data
        }));
        setCurrentStep(STEPS[currentIndex + 1]);
        setCanProceed(false);
      })();
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
      setCanProceed(true);
    }
  };
  if (isLoading) {
    return <VisaSkeleton />;
  }

  return (
    <StepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        steps: STEPS,
        canProceed,
        setCanProceed,
        goToNextStep,
        goToPreviousStep,
        forms,
        formData,
        isLoading,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

export function useVisaStep() {
  const context = useContext(StepContext);
  if (context === undefined) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
} 