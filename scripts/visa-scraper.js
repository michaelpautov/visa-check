/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeVisaInformation() {
  try {
    const url = 'https://bali.com/bali/bali-visa-indonesia-entry-regulations/bali-visa-regulations-per-country-nationality/';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const visaInfo = [];

    // Find all table rows
    $('table tr').each((_, row) => {
      const $row = $(row);
      const $cells = $row.find('td');
      
      if ($cells.length === 2) { // Valid row with country info
        const countryCell = $cells.eq(1);
        const countryText = countryCell.text().trim();
        
        // Check if cell contains a country name (starts with "strong" tag)
        const strongText = countryCell.find('strong').first().text().trim();
        if (strongText) {
          // Extract the visa requirement text that follows the country name
          const visaText = countryText.split('-')[1]?.trim() || '';
          const visaType = visaText.split(':')[1]?.trim() || '';
          
          let entryType = 'visa-required';
          let duration = '0';
          
          if (visaType.toLowerCase().includes('visa exemption')) {
            entryType = 'visa-free';
            duration = '30';
          } else if (visaType.toLowerCase().includes('visa on arrival')) {
            entryType = 'visa-on-arrival';
            duration = '30';
          } else if (visaType.toLowerCase().includes('211a visit visa')) {
            entryType = '211a-visit-visa';
            duration = '60';
          } else if (visaType.toLowerCase().includes('special calling visa')) {
            entryType = 'special-calling-visa';
            duration = '0';
          }

          // Skip rows that just contain section headers (A, B, C etc)
          if (strongText.length > 1) {
            visaInfo.push({
              country: strongText,
              entryType,
              duration,
              visaType,
              sourceUrl: url
            });
          }
        }
      }
    });

    // Save the scraped data
    const outputPath = path.join(__dirname, '../src/data/scraped-visa-data.json');
    await fs.promises.writeFile(outputPath, JSON.stringify(visaInfo, null, 2));

    console.log(`✅ Successfully scraped visa information for ${visaInfo.length} countries`);
    return visaInfo;

  } catch (error) {
    console.error('Error scraping visa information:', error);
    throw error;
  }
}

async function updateVisaFreeCountries(visaInfo) {
  const visaFreeCountries = visaInfo
    .filter(info => info.entryType === 'visa-free')
    .map(info => info.country);

  const visaOnArrivalCountries = visaInfo
    .filter(info => info.entryType === 'visa-on-arrival')
    .map(info => info.country);

  const fileContent = `// Auto-generated from Bali.com scraper - Last updated: ${new Date().toISOString()}
export const visaFreeCountries = ${JSON.stringify(visaFreeCountries, null, 2)};

export const visaOnArrivalCountries = ${JSON.stringify(visaOnArrivalCountries, null, 2)};

export function checkVisaRequirement(country: string) {
  if (visaFreeCountries.includes(country)) {
    return {
      canEnter: true,
      entryType: 'visa-free',
      duration: 30
    };
  }
  
  if (visaOnArrivalCountries.includes(country)) {
    return {
      canEnter: true, 
      entryType: 'visa-on-arrival',
      duration: 30
    };
  }
  
  return {
    canEnter: false,
    entryType: 'visa-required',
    duration: 0
  };
}`;

  const outputPath = path.join(__dirname, '../src/data/visa-requirements.ts');
  fs.writeFileSync(outputPath, fileContent);
  console.log('✅ Successfully updated visa-requirements.ts');
}

async function main() {
  try {
    const visaInfo = await scrapeVisaInformation();
    await updateVisaFreeCountries(visaInfo);
  } catch (error) {
    console.error('Failed to update visa information:', error);
    process.exit(1);
  }
}

// Run the scraper
main(); 