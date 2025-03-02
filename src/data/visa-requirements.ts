// Auto-generated from Bali.com scraper - Last updated: 2025-01-28T12:11:59.138Z
export const visaFreeCountries = [
  "Brunei",
  "Cambodia",
  "Colombia",
  "Hong Kong",
  "Laos",
  "Malaysia",
  "Myanmar",
  "Philippines",
  "Singapore",
  "Suriname",
  "Thailand",
  "Vietnam"
];

export const visaOnArrivalCountries = [
  "Albania",
  "Andorra",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Belarus",
  "Belgium",
  "Bosnia Herzegovina",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Chile",
  "China",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Ecuador",
  "Egypt",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Guatemala",
  "Hungary",
  "Iceland",
  "India",
  "Ireland",
  "Italy",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Maldives",
  "Malta",
  "Mauritius",
  "Mexico",
  "Monaco",
  "Mongolia",
  "Morocco",
  "Mozambique",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Oman",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Peru",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "San Marino",
  "Saudi Arabia",
  "Serbia",
  "Seychelles",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Tanzania",
  "Tunisia",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uzbekistan",
  "Vatican City",
  "Venezuela"
];

export function checkVisaRequirement(country: string) {
  if (visaFreeCountries.includes(country)) {
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
  
  if (visaOnArrivalCountries.includes(country)) {
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