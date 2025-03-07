import type { Metadata } from "next";
import { VisaStepProvider } from "./_providers/visa-step-provider";
import { VisaStepLayout } from "./_components/visa-step-layout";

export const metadata: Metadata = {
  title: 'Выбор страны | Виза на Бали',
  description: 'Выберите страну вашего паспорта для оформления визы на Бали',
};

export default async function VisaApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VisaStepProvider>
      <VisaStepLayout>
        {children}
      </VisaStepLayout>
    </VisaStepProvider>
  );
}
