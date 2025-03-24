'use client'

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ControlledSelect, SelectOption } from '@/components/form-controls/controlled-select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { routing } from '@/i18n/routing';
import { MdLanguage, MdAttachMoney, MdPrivacyTip, MdNotifications, MdDelete, MdSecurity } from 'react-icons/md';

// Language options based on the supported locales in routing.ts
const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
];

// Currency options
const CURRENCY_OPTIONS: SelectOption[] = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'RUB', label: 'RUB - Russian Ruble' },
  { value: 'IDR', label: 'IDR - Indonesian Rupiah' },
];

interface ProfileFormValues {
  language: string;
  currency: string;
}

export function ProfileTab() {
  const t = useTranslations('profile');
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Get current locale from URL or use default
  const currentPathname = window.location.pathname;
  const currentLocale = currentPathname.split('/')[1] || routing.defaultLocale;
  
  const { control, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: {
      language: currentLocale,
      currency: 'USD',
    }
  });

  const onSubmit = (data: ProfileFormValues) => {
    // Handle language change by redirecting to the new locale path
    if (data.language !== currentLocale) {
      const newPath = currentPathname.replace(`/${currentLocale}`, `/${data.language}`);
      router.push(newPath);
    }
    
    // Here you would save currency preference to your state management or API
    console.log('Currency changed to:', data.currency);
  };

  return (
    <div className="space-y-6 py-4 px-2">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-4 space-y-6">
          {/* Language Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MdLanguage className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('languageSettings')}</h2>
            </div>
            <ControlledSelect
              name="language"
              control={control}
              options={LANGUAGE_OPTIONS}
              label={t('language')}
              placeholder={t('selectLanguage')}
            />
          </div>
          
          <Separator />
          
          {/* Currency Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MdAttachMoney className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('currencySettings')}</h2>
            </div>
            <ControlledSelect
              name="currency"
              control={control}
              options={CURRENCY_OPTIONS}
              label={t('currency')}
              placeholder={t('selectCurrency')}
            />
          </div>
          
          <Separator />
          
          {/* Privacy Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MdPrivacyTip className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('privacySettings')}</h2>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="privacy-policy" className="cursor-pointer">
                {t('privacyPolicy')}
              </Label>
              <Button variant="link" size="sm">
                {t('view')}
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Notification Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MdNotifications className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('notificationSettings')}</h2>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="cursor-pointer">
                {t('enableNotifications')}
              </Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Account Security */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MdSecurity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('accountSecurity')}</h2>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="delete-account" className="cursor-pointer">
                {t('deleteAccount')}
              </Label>
              <Button variant="destructive" size="sm">
                <MdDelete className="mr-1 w-4 h-4" />
                {t('delete')}
              </Button>
            </div>
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full">
              {t('saveChanges')}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}