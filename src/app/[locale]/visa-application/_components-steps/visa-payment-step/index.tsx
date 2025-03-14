'use client';

import { H1, Small } from '@/components/ui/typography';
import { VisaStepContainer } from '../../_components/visa-step-container';
import { useTranslations } from 'next-intl';
import { useVisaStep } from '../../_providers/visa-step-provider';
import { VisaInfo } from '../../_components/visa-info';
import { ControlledPaymentMethod } from '../../../../../components/form-controls/controlled-payment-method';
import { CopyToClipboard } from '@/components/common/copy-to-clipboard';
import { PAYMENT_INFO } from '@/constants/payment-info';
import { ControlledFileInput } from '@/components/form-controls/controlled-file-input';

export function VisaPaymentStep() {
  const t = useTranslations('components.visaPaymentStep');
  const { forms: { visaPayment } } = useVisaStep();

  const watchPaymentMethod = visaPayment.watch('paymentMethod');
  const paymentMethod = watchPaymentMethod as 'permata' | 'USDT_TRC20';

  return (
    <VisaStepContainer>
      <H1>{t('title')}</H1>
      <VisaInfo />
      <ControlledPaymentMethod
        name="paymentMethod"
        control={visaPayment.control}
      />
      {paymentMethod && (
        <div className="flex flex-col gap-4">
          <Small>{t('paymentInfo')}</Small>
          <CopyToClipboard text={paymentMethod === 'permata' ? PAYMENT_INFO.permata : PAYMENT_INFO.USDT_TRC20} />
        </div>
      )}
      {paymentMethod && (
        <ControlledFileInput
          name="paymentProof"
          control={visaPayment.control}
          label={t('paymentProof')}
        />
      )}
    </VisaStepContainer>
  );
}