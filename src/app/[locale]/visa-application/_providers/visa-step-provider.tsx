'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import VisaSkeleton from '../_components/visa-skeleton';
import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage';
import { VisaFiles, visaFilesSchema } from '../_components-steps/visa-files-step/schema';
import { PassportCountry, passportCountrySchema } from '../_components-steps/visa-trip-details-step/schema';
import { VisaType, visaTypeSchema } from '../_components-steps/visa-type-step/schema';
import { VisaArrivalDates, visaArrivalDatesSchema } from '../_components-steps/visa-trip-plan-step/schema';
import { VisaPersonalData, visaPersonalDataSchema } from '../_components-steps/visa-personal-data-step/schema';
import { VisaPassportInformation, visaPassportInformationSchema } from '../_components-steps/visa-passport-information-step/schema';
import { VisaOrder, visaOrderSchema } from '../_components-steps/visa-order-step/schema';
import { VisaPayment, visaPaymentSchema } from '../_components-steps/visa-payment-step/schema';

export type Step = 'passportCountry' | 'visaType' | 'visaArrivalDates' | 'visaFiles' | 'visaPersonalData' | 'visaPassportInformation' | 'visaOrder' | 'visaPayment';

// Combined schema for the entire form
export const formSchema = z.object({
  passportCountry: passportCountrySchema,
  visaType: visaTypeSchema,
  visaArrivalDates: visaArrivalDatesSchema,
  visaFiles: visaFilesSchema,
  visaPersonalData: visaPersonalDataSchema,
  visaPassportInformation: visaPassportInformationSchema,
  visaOrder: visaOrderSchema,
  visaPayment: visaPaymentSchema,
});

// TypeScript types from Zod schemas
export type FormData = z.infer<typeof formSchema>;

// Type for the forms map
type StepForms = {
  passportCountry: UseFormReturn<PassportCountry>;
  visaType: UseFormReturn<VisaType>;
  visaArrivalDates: UseFormReturn<VisaArrivalDates>;
  visaFiles: UseFormReturn<VisaFiles>;
  visaPersonalData: UseFormReturn<VisaPersonalData>;
  visaPassportInformation: UseFormReturn<VisaPassportInformation>;
  visaOrder: UseFormReturn<VisaOrder>;
  visaPayment: UseFormReturn<VisaPayment>;
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
  cleanState: () => void;
  cleanCurrentStep: () => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

const STEPS: Step[] = ['passportCountry', 'visaType', 'visaArrivalDates', 'visaFiles', 'visaPersonalData', 'visaPassportInformation', 'visaOrder', 'visaPayment'];
const STORAGE_KEY = LOCAL_STORAGE_KEYS.VISA_APPLICATION_STATE;

interface StoredState {
  currentStep: Step;
  formData: Partial<FormData>;
}

export function VisaStepProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Step>('passportCountry');
  const [canProceed, setCanProceed] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [shouldSaveToStorage, setShouldSaveToStorage] = useState(true);

  const cleanState = () => {
    setShouldSaveToStorage(false);
    setCurrentStep('passportCountry');
    setFormData({});
    setCanProceed(false);
    localStorage.removeItem(STORAGE_KEY);
    passportCountryForm.reset();
    visaTypeForm.reset();
    visaArrivalDatesForm.reset();
    visaFilesForm.reset();
    visaPersonalDataForm.reset();
    visaPassportInformationForm.reset();
    visaOrderForm.reset();
    // Re-enable saving to storage after state is cleaned
    setTimeout(() => setShouldSaveToStorage(true), 0);
  };

  const cleanCurrentStep = () => {
    forms[currentStep].reset();
    setFormData(prev => {
      const newFormData = { ...prev };
      delete newFormData[currentStep];
      return newFormData;
    });
  };

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

  const passportCountryForm = useForm<PassportCountry>({
    resolver: zodResolver(passportCountrySchema),
    mode: 'onChange',
    defaultValues: formData.passportCountry,
  });

  const visaTypeForm = useForm<VisaType>({
    resolver: zodResolver(visaTypeSchema),
    mode: 'onChange',
    defaultValues: formData.visaType || { selectedVisas: [] },
  });

  const visaArrivalDatesForm = useForm<VisaArrivalDates>({
    resolver: zodResolver(visaArrivalDatesSchema),
    mode: 'onChange',
    defaultValues: formData.visaArrivalDates,
  });

  const visaFilesForm = useForm<VisaFiles>({
    resolver: zodResolver(visaFilesSchema),
    mode: 'onChange',
    defaultValues: formData.visaFiles || { visaFiles: [] },
  });

  const visaPersonalDataForm = useForm<VisaPersonalData>({
    resolver: zodResolver(visaPersonalDataSchema),
    mode: 'onChange',
    defaultValues: formData.visaPersonalData,
  });

  const visaPassportInformationForm = useForm<VisaPassportInformation>({
    resolver: zodResolver(visaPassportInformationSchema),
    mode: 'onChange',
    defaultValues: formData.visaPassportInformation,
  });

  const visaOrderForm = useForm<VisaOrder>({
    resolver: zodResolver(visaOrderSchema),
    mode: 'onChange',
    defaultValues: formData.visaOrder,
  });

  const visaPaymentForm = useForm<VisaPayment>({
    resolver: zodResolver(visaPaymentSchema),
    mode: 'onChange',
    defaultValues: formData.visaPayment,
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
      if (formData.visaArrivalDates) {
        visaArrivalDatesForm.reset(formData.visaArrivalDates);
      }
      if (formData.visaFiles) {
        visaFilesForm.reset(formData.visaFiles);
      }
      if (formData.visaPersonalData) {
        visaPersonalDataForm.reset(formData.visaPersonalData);
      }
      if (formData.visaPassportInformation) {
        visaPassportInformationForm.reset(formData.visaPassportInformation);
      }
      if (formData.visaOrder) {
        visaOrderForm.reset(formData.visaOrder);
      }
      if (formData.visaPayment) {
        visaPaymentForm.reset(formData.visaPayment);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, [formData]);

  const forms: StepForms = {
    passportCountry: passportCountryForm,
    visaType: visaTypeForm,
    visaArrivalDates: visaArrivalDatesForm,
    visaFiles: visaFilesForm,
    visaPersonalData: visaPersonalDataForm,
    visaPassportInformation: visaPassportInformationForm,
    visaOrder: visaOrderForm,
    visaPayment: visaPaymentForm,
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && shouldSaveToStorage) {
      const state: StoredState = {
        currentStep,
        formData
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [currentStep, formData, isLoading, shouldSaveToStorage]);

  // Update canProceed based on form validation
  useEffect(() => {
    const currentForm = forms[currentStep];
    const { formState } = currentForm;
    const hasValidExistingData = Boolean(formData[currentStep as keyof typeof formData]) && formState.isValid;
    // Add small delay to allow validation to complete
    setCanProceed(hasValidExistingData || (formState.isDirty && formState.isValid));
  }, [currentStep, forms[currentStep].formState, formData]);

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
        cleanState,
        cleanCurrentStep,
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