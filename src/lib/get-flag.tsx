import * as CountryFlags from 'country-flag-icons/react/3x2';
import * as CountryFlagsSquare from 'country-flag-icons/react/1x1';
import { cn } from './utils';

export const getFlag = (code: string, className?: string) => {
  const FlagComponent = CountryFlags[code as keyof typeof CountryFlags];
  return FlagComponent ? <FlagComponent className={cn('w-6 h-4', className)} /> : null;
};

export const getFlagSquare = (code: string, className?: string) => {
  const FlagComponent = CountryFlagsSquare[code as keyof typeof CountryFlagsSquare];
  return FlagComponent ? <FlagComponent className={cn('w-4 h-4', className)} /> : null;
};