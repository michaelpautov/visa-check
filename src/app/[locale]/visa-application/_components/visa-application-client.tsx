'use client'
import { useVisaStep } from "../_providers/visa-step-provider";
import { VisaTripPlanStep } from "../_components-steps/visa-trip-plan-step";
import { VisaTypeStep } from "../_components-steps/visa-type-step";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { VisaTripDetailsStep } from "../_components-steps/visa-trip-details-step";
import { VisaFilesStep } from "../_components-steps/visa-files-step";
import { VisaPersonalDataStep } from "../_components-steps/visa-personal-data-step";
import { VisaPassportInformationStep } from "../_components-steps/visa-passport-information-step";
import { VisaOrderStep } from "../_components-steps/visa-order-step";
import { VisaPaymentStep } from "../_components-steps/visa-payment-step";

function StepContent() {
  const { currentStep, steps } = useVisaStep();
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [prevStep, setPrevStep] = useState(currentStep);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction * -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction * 300,
      opacity: 0
    })
  };

  // Update direction when step changes
  useEffect(() => {
    const currentIndex = steps.indexOf(currentStep);
    const prevIndex = steps.indexOf(prevStep);
    setDirection(currentIndex > prevIndex ? 1 : -1);
    setPrevStep(currentStep);
  }, [currentStep, steps, prevStep]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        custom={direction}
        variants={slideVariants}
        animate="center"
        exit="exit"
        transition={{
          duration: 0.3,
          type: "tween"
        }}
      >
        {(() => {
          switch (currentStep) {
            case 'passportCountry':
              return <VisaTripPlanStep />;
            case 'visaType':
              return <VisaTypeStep />;
            case 'visaArrivalDates':
              return <VisaTripDetailsStep />;
            case 'visaFiles':
              return <VisaFilesStep />;
            case 'visaPersonalData':
              return <VisaPersonalDataStep />;
            case 'visaPassportInformation':
              return <VisaPassportInformationStep />;
            case 'visaOrder':
              return <VisaOrderStep />;
            case 'visaPayment':
              return <VisaPaymentStep />;
            default:
              return null;
          }
        })()}
      </motion.div>
    </AnimatePresence>
  );
}

export function VisaApplicationClient() {
  return <StepContent />
}
