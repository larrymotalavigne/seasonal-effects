/**
 * ISO 3166-1 Alpha-2 country codes
 * Add more as needed for holiday support
 */
export type ISO3166_1_Alpha2 =
  | 'US' // United States
  | 'GB' // United Kingdom
  | 'FR' // France
  | 'DE' // Germany
  | 'IT' // Italy
  | 'ES' // Spain
  | 'JP' // Japan
  | 'CN' // China
  | 'KR' // South Korea
  | 'IN' // India
  | 'BR' // Brazil
  | 'AU' // Australia
  | 'NZ' // New Zealand
  | 'CA' // Canada
  | 'MX' // Mexico
  | 'AR' // Argentina
  | 'CL' // Chile
  | 'ZA' // South Africa
  | 'RU' // Russia
  | 'PL' // Poland
  | 'NL' // Netherlands
  | 'BE' // Belgium
  | 'SE' // Sweden
  | 'NO' // Norway
  | 'DK' // Denmark
  | 'FI' // Finland
  | 'IE' // Ireland
  | 'CH' // Switzerland
  | 'AT' // Austria
  | 'PT' // Portugal
  | 'GR' // Greece
  | 'TR' // Turkey
  | 'IL' // Israel
  | 'EG' // Egypt
  | 'SA' // Saudi Arabia
  | 'AE' // United Arab Emirates
  | 'TH' // Thailand
  | 'VN' // Vietnam
  | 'ID' // Indonesia
  | 'MY' // Malaysia
  | 'SG' // Singapore
  | 'PH' // Philippines;

/**
 * Hemisphere classification
 */
export type Hemisphere = 'northern' | 'southern';

/**
 * Country metadata for seasonal calculations
 */
export interface CountryMetadata {
  code: ISO3166_1_Alpha2;
  hemisphere: Hemisphere;
  name: string;
}

/**
 * Mapping of countries to their hemispheres
 */
export const COUNTRY_METADATA: Record<ISO3166_1_Alpha2, CountryMetadata> = {
  US: { code: 'US', hemisphere: 'northern', name: 'United States' },
  GB: { code: 'GB', hemisphere: 'northern', name: 'United Kingdom' },
  FR: { code: 'FR', hemisphere: 'northern', name: 'France' },
  DE: { code: 'DE', hemisphere: 'northern', name: 'Germany' },
  IT: { code: 'IT', hemisphere: 'northern', name: 'Italy' },
  ES: { code: 'ES', hemisphere: 'northern', name: 'Spain' },
  JP: { code: 'JP', hemisphere: 'northern', name: 'Japan' },
  CN: { code: 'CN', hemisphere: 'northern', name: 'China' },
  KR: { code: 'KR', hemisphere: 'northern', name: 'South Korea' },
  IN: { code: 'IN', hemisphere: 'northern', name: 'India' },
  BR: { code: 'BR', hemisphere: 'southern', name: 'Brazil' },
  AU: { code: 'AU', hemisphere: 'southern', name: 'Australia' },
  NZ: { code: 'NZ', hemisphere: 'southern', name: 'New Zealand' },
  CA: { code: 'CA', hemisphere: 'northern', name: 'Canada' },
  MX: { code: 'MX', hemisphere: 'northern', name: 'Mexico' },
  AR: { code: 'AR', hemisphere: 'southern', name: 'Argentina' },
  CL: { code: 'CL', hemisphere: 'southern', name: 'Chile' },
  ZA: { code: 'ZA', hemisphere: 'southern', name: 'South Africa' },
  RU: { code: 'RU', hemisphere: 'northern', name: 'Russia' },
  PL: { code: 'PL', hemisphere: 'northern', name: 'Poland' },
  NL: { code: 'NL', hemisphere: 'northern', name: 'Netherlands' },
  BE: { code: 'BE', hemisphere: 'northern', name: 'Belgium' },
  SE: { code: 'SE', hemisphere: 'northern', name: 'Sweden' },
  NO: { code: 'NO', hemisphere: 'northern', name: 'Norway' },
  DK: { code: 'DK', hemisphere: 'northern', name: 'Denmark' },
  FI: { code: 'FI', hemisphere: 'northern', name: 'Finland' },
  IE: { code: 'IE', hemisphere: 'northern', name: 'Ireland' },
  CH: { code: 'CH', hemisphere: 'northern', name: 'Switzerland' },
  AT: { code: 'AT', hemisphere: 'northern', name: 'Austria' },
  PT: { code: 'PT', hemisphere: 'northern', name: 'Portugal' },
  GR: { code: 'GR', hemisphere: 'northern', name: 'Greece' },
  TR: { code: 'TR', hemisphere: 'northern', name: 'Turkey' },
  IL: { code: 'IL', hemisphere: 'northern', name: 'Israel' },
  EG: { code: 'EG', hemisphere: 'northern', name: 'Egypt' },
  SA: { code: 'SA', hemisphere: 'northern', name: 'Saudi Arabia' },
  AE: { code: 'AE', hemisphere: 'northern', name: 'United Arab Emirates' },
  TH: { code: 'TH', hemisphere: 'northern', name: 'Thailand' },
  VN: { code: 'VN', hemisphere: 'northern', name: 'Vietnam' },
  ID: { code: 'ID', hemisphere: 'southern', name: 'Indonesia' },
  MY: { code: 'MY', hemisphere: 'northern', name: 'Malaysia' },
  SG: { code: 'SG', hemisphere: 'northern', name: 'Singapore' },
  PH: { code: 'PH', hemisphere: 'northern', name: 'Philippines' },
};
