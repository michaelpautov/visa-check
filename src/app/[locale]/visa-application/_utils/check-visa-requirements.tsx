import { BALI_FREE_VISA_COUNTRIES, BALI_VISA_ON_ARRIVAL_COUNTRIES } from "@/constants/bali-visa-countries";
import { VisaRequirement } from "@/types/visa/visa-requirement";

const BALI_VISA_TYPES = [
  {
    type: 'B211A',
    shortName: 'Social Visa',
    officialName: 'Social Cultural Visa',
    days: 60,
    price: 300,
    extendable: true,
    maxExtensions: 4,
    maxTotalDays: 180,
    requirements: [
      'Sponsor letter',
      'Bank statements',
      'Return ticket',
      'Passport valid > 12 months'
    ]
  },
  {
    type: 'B211B',
    shortName: 'Business Visa',
    officialName: 'Business Visit Visa',
    days: 60,
    price: 350,
    extendable: true,
    maxExtensions: 4,
    maxTotalDays: 180,
    requirements: [
      'Business sponsor letter',
      'Company documents',
      'Bank statements',
      'Passport valid > 12 months'
    ]
  },
  {
    type: 'KITAS',
    shortName: 'KITAS',
    officialName: 'Temporary Stay Permit Visa',
    days: 365,
    price: 1200,
    extendable: true,
    maxExtensions: 4,
    maxTotalDays: 1825, // 5 years
    requirements: [
      'Sponsor company/organization',
      'Work permit (if working)',
      'Local address proof',
      'Health insurance',
      'Passport valid > 18 months'
    ]
  }
]

export function checkVisaRequirement(country: string): VisaRequirement {
  if (BALI_FREE_VISA_COUNTRIES.includes(country)) {
    return {
      canEnter: true,
      entryType: 'visa-free',
      duration: [
        {
          shortName: 'Visa Free',
          officialName: 'Visa Exemption',
          days: 30,
          price: 0,
          extendable: false,
          maxExtensions: 0,
          maxTotalDays: 30
        }
      ]
    };
  }
  
  if (BALI_VISA_ON_ARRIVAL_COUNTRIES.includes(country)) {
    return {
      canEnter: true, 
      entryType: 'visa-on-arrival',
      duration: [
        {
          shortName: 'VOA',
          officialName: 'Visa on Arrival',
          days: 30,
          price: 35,
          extendable: true,
          maxExtensions: 1,
          maxTotalDays: 60
        },
        {
          shortName: 'Extended VOA',
          officialName: 'Extended Visa on Arrival',
          days: 60,
          price: 100,
          extendable: true,
          maxExtensions: 4,
          maxTotalDays: 180
        },
        ...BALI_VISA_TYPES
      ]
    };
  }
  
  return {
    canEnter: false,
    entryType: 'visa-required',
    duration: BALI_VISA_TYPES
  };
}