'use client'
import { Button } from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("components.header");
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="text-primary text-2xl font-bold">{t("title")}</div> 
      <SignedOut>
        <SignInButton><Button>{t("signIn")}</Button></SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </header>
  )
}
