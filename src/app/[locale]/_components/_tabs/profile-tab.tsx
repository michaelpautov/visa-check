'use client'

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { ControlledSelect, SelectOption } from '@/components/form-controls/controlled-select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { routing } from '@/i18n/routing';
import { MdLanguage, MdAttachMoney, MdPrivacyTip, MdNotifications, MdDelete, MdSecurity } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

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

interface ProfileTabProps {
  tabsHeight: number;
}

export function ProfileTab({ tabsHeight }: ProfileTabProps) {
  const t = useTranslations('profile');
  const router = useRouter();
  const pathname = usePathname();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Get current locale from URL or use default
  const currentLocale = pathname.split('/')[1] || routing.defaultLocale;
  
  const { control, handleSubmit, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      language: currentLocale,
      currency: 'USD',
    }
  });

  // Watch for form changes
  const formValues = watch();
  useEffect(() => {
    const hasFormChanges = formValues.language !== currentLocale || formValues.currency !== 'USD';
    setHasChanges(hasFormChanges);
  }, [formValues, currentLocale]);

  const onSubmit = (data: ProfileFormValues) => {
    // Handle language change by redirecting to the new locale path
    const newLocale = data.language;
    // Get the path segments after the locale
    const pathSegments = pathname.split('/').slice(2);
    const pathWithoutLocale = '/' + pathSegments.join('/');
    
    // If the new locale is the default (English), we need to handle it specially
    if (newLocale === 'en') {
      router.replace(pathWithoutLocale);
    } else if (newLocale !== currentLocale) {
      console.log('Switching to non-default locale:', newLocale);
      router.replace(pathWithoutLocale, { locale: newLocale });
    }
    
    // Here you would save currency preference to your state management or API
    console.log('Currency changed to:', data.currency);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col " style={{height: `calc(100vh - ${tabsHeight}px)`}}>
      <div className="flex-none bg-background px-6">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          {hasChanges && (
            <Button 
              type="submit" 
              variant="default"
              className="ml-4 flex items-center gap-2" 
            >
              <FaCheck className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-6">
        <div className="mx-2 py-4 space-y-6 bg-background/50 rounded-lg">
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
        </div>
      </div>
    </form>
  );
}