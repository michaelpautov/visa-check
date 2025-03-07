import { BALI_FREE_VISA_COUNTRIES, BALI_VISA_ON_ARRIVAL_COUNTRIES } from "@/constants/bali-visa-countries";
import { VisaRequirement } from "@/types/visa/visa-requirement";

export function checkVisaRequirement(country: string): VisaRequirement {
  if (BALI_FREE_VISA_COUNTRIES.includes(country)) {
    return {
      canEnter: true,
      entryType: 'visa-free',
      duration: [
        {
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
          days: 30,
          price: 35,
          extendable: true,
          maxExtensions: 1,
          maxTotalDays: 60
        },
        {
          days: 60,
          price: 100,
          extendable: true,
          maxExtensions: 4,
          maxTotalDays: 180
        }
      ]
    };
  }
  
  return {
    canEnter: false,
    entryType: 'visa-required',
    duration: [
      {
        type: 'B211A',
        name: 'Social Cultural Visa',
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
        name: 'Business Visa',
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
        name: 'Temporary Stay Permit',
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
  };
}