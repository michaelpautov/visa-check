'use client'
import { useVisaStep } from "../_providers/visa-step-provider";
import { PassportCountryStep } from "../_components-steps/steps/passport-country-step";
import { VisaTypeStep } from "../_components-steps/visa-type-step";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

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
              return <PassportCountryStep />;
            case 'visaType':
              return <VisaTypeStep />;
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
