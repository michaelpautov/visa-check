import type { Metadata } from "next";
import { VisaApplicationHeader } from "./_components/visa-application-header";

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
    <div className="flex flex-col w-full min-h-screen">
      <VisaApplicationHeader className="py-4" />
      <main className="flex flex-col flex-1 overflow-auto px-4">
        {children}
      </main>
    </div>
  );
}
