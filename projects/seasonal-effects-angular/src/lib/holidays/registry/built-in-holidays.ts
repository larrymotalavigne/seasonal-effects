import { Holiday } from '../../core/models/holiday.types';

/**
 * Built-in holiday definitions by country
 */
export const BUILT_IN_HOLIDAYS: Holiday[] = [
  // Global holidays
  {
    name: "New Year's Day",
    rule: { type: 'fixed', month: 1, day: 1 },
    effect: 'fireworks',
    priority: 100,
  },
  {
    name: "New Year's Eve",
    rule: { type: 'fixed', month: 12, day: 31 },
    effect: 'fireworks',
    priority: 100,
  },

  // United States
  {
    name: 'Independence Day',
    rule: { type: 'fixed', month: 7, day: 4 },
    effect: 'fireworks',
    countries: ['US'],
    priority: 90,
  },
  {
    name: 'Thanksgiving',
    rule: { type: 'relative', month: 11, weekday: 4, occurrence: 4 }, // 4th Thursday of November
    effect: 'leaves',
    countries: ['US'],
    priority: 80,
  },
  {
    name: 'Halloween',
    rule: { type: 'fixed', month: 10, day: 31 },
    effect: 'leaves',
    countries: ['US', 'GB', 'CA', 'IE'],
    priority: 70,
  },

  // France
  {
    name: 'Bastille Day',
    rule: { type: 'fixed', month: 7, day: 14 },
    effect: 'fireworks',
    countries: ['FR'],
    priority: 90,
  },
  {
    name: 'Épiphanie (Galette des Rois)',
    rule: { type: 'fixed', month: 1, day: 6 },
    effect: 'confetti',
    countries: ['FR'],
    priority: 75,
  },
  {
    name: 'Fête du Travail (Labour Day)',
    rule: { type: 'fixed', month: 5, day: 1 },
    effect: 'petals', // Lily of the valley tradition
    countries: ['FR'],
    priority: 80,
  },
  {
    name: 'Victoire 1945 (Victory in Europe Day)',
    rule: { type: 'fixed', month: 5, day: 8 },
    effect: 'fireworks',
    countries: ['FR'],
    priority: 85,
  },
  {
    name: 'Fête de la Musique',
    rule: { type: 'fixed', month: 6, day: 21 },
    effect: 'confetti',
    countries: ['FR'],
    priority: 80,
  },
  {
    name: 'Assomption (Assumption of Mary)',
    rule: { type: 'fixed', month: 8, day: 15 },
    effect: 'petals',
    countries: ['FR'],
    priority: 75,
  },
  {
    name: 'Toussaint (All Saints Day)',
    rule: { type: 'fixed', month: 11, day: 1 },
    effect: 'leaves',
    countries: ['FR'],
    priority: 70,
  },
  {
    name: 'Armistice 1918',
    rule: { type: 'fixed', month: 11, day: 11 },
    effect: 'leaves',
    countries: ['FR'],
    priority: 80,
  },

  // Netherlands
  {
    name: 'Tulip Season',
    rule: { type: 'range', startMonth: 4, startDay: 1, endMonth: 5, endDay: 10 },
    effect: 'petals',
    countries: ['NL'],
    priority: 75,
  },
  {
    name: 'Koningsdag Eve (King\'s Night)',
    rule: { type: 'fixed', month: 4, day: 26 },
    effect: 'confetti',
    countries: ['NL'],
    priority: 85,
  },
  {
    name: 'Koningsdag (King\'s Day)',
    rule: { type: 'fixed', month: 4, day: 27 },
    effect: 'fireworks',
    countries: ['NL'],
    priority: 95,
  },
  {
    name: 'Dodenherdenking (Remembrance Day)',
    rule: { type: 'fixed', month: 5, day: 4 },
    effect: 'none',
    countries: ['NL'],
    priority: 90,
  },
  {
    name: 'Bevrijdingsdag (Liberation Day)',
    rule: { type: 'fixed', month: 5, day: 5 },
    effect: 'fireworks',
    countries: ['NL'],
    priority: 90,
  },
  {
    name: 'Prinsjesdag (Prince\'s Day)',
    rule: { type: 'relative', month: 9, weekday: 2, occurrence: 3 }, // 3rd Tuesday of September
    effect: 'confetti',
    countries: ['NL'],
    priority: 75,
  },
  {
    name: 'Sinterklaas Arrival',
    rule: { type: 'range', startMonth: 11, startDay: 12, endMonth: 11, endDay: 17 },
    effect: 'confetti',
    countries: ['NL'],
    priority: 80,
  },
  {
    name: 'Sinterklaasavond (St. Nicholas Eve)',
    rule: { type: 'fixed', month: 12, day: 5 },
    effect: 'snow',
    countries: ['NL'],
    priority: 85,
  },

  // Belgium
  {
    name: 'Fête du Travail / Dag van de Arbeid (Labour Day)',
    rule: { type: 'fixed', month: 5, day: 1 },
    effect: 'petals',
    countries: ['BE'],
    priority: 80,
  },
  {
    name: 'Belgian National Day',
    rule: { type: 'fixed', month: 7, day: 21 },
    effect: 'fireworks',
    countries: ['BE'],
    priority: 90,
  },
  {
    name: 'Armistice Day',
    rule: { type: 'fixed', month: 11, day: 11 },
    effect: 'leaves',
    countries: ['BE'],
    priority: 80,
  },
  {
    name: 'Sinterklaas / Saint-Nicolas',
    rule: { type: 'fixed', month: 12, day: 6 },
    effect: 'confetti',
    countries: ['BE'],
    priority: 80,
  },

  // Japan
  {
    name: 'Hanami (Cherry Blossom Season)',
    rule: { type: 'range', startMonth: 3, startDay: 20, endMonth: 4, endDay: 15 },
    effect: 'petals',
    countries: ['JP'],
    priority: 85,
  },
  {
    name: 'Golden Week',
    rule: { type: 'range', startMonth: 4, startDay: 29, endMonth: 5, endDay: 5 },
    effect: 'confetti',
    countries: ['JP'],
    priority: 80,
  },

  // Germany
  {
    name: 'Oktoberfest Period',
    rule: { type: 'range', startMonth: 9, startDay: 15, endMonth: 10, endDay: 5 },
    effect: 'leaves',
    countries: ['DE'],
    priority: 75,
  },
  {
    name: 'German Unity Day',
    rule: { type: 'fixed', month: 10, day: 3 },
    effect: 'confetti',
    countries: ['DE'],
    priority: 80,
  },

  // Canada
  {
    name: 'Canada Day',
    rule: { type: 'fixed', month: 7, day: 1 },
    effect: 'fireworks',
    countries: ['CA'],
    priority: 90,
  },

  // Mexico
  {
    name: 'Día de los Muertos',
    rule: { type: 'range', startMonth: 11, startDay: 1, endMonth: 11, endDay: 2 },
    effect: 'petals',
    countries: ['MX'],
    priority: 90,
  },
  {
    name: 'Independence Day (Mexico)',
    rule: { type: 'fixed', month: 9, day: 16 },
    effect: 'fireworks',
    countries: ['MX'],
    priority: 90,
  },

  // Brazil
  {
    name: 'Carnival',
    rule: { type: 'easter', offsetDays: -47 }, // 47 days before Easter
    effect: 'confetti',
    countries: ['BR'],
    priority: 95,
  },
  {
    name: 'Independence Day (Brazil)',
    rule: { type: 'fixed', month: 9, day: 7 },
    effect: 'fireworks',
    countries: ['BR'],
    priority: 90,
  },

  // Australia
  {
    name: 'Australia Day',
    rule: { type: 'fixed', month: 1, day: 26 },
    effect: 'fireworks',
    countries: ['AU'],
    priority: 90,
  },

  // India
  {
    name: 'Holi (approximate)',
    rule: { type: 'range', startMonth: 3, startDay: 1, endMonth: 3, endDay: 15 },
    effect: 'confetti',
    countries: ['IN'],
    priority: 90,
  },
  {
    name: 'Independence Day (India)',
    rule: { type: 'fixed', month: 8, day: 15 },
    effect: 'fireworks',
    countries: ['IN'],
    priority: 90,
  },

  // China
  {
    name: 'National Day',
    rule: { type: 'fixed', month: 10, day: 1 },
    effect: 'fireworks',
    countries: ['CN'],
    priority: 90,
  },

  // Easter-based holidays (Christian countries)
  {
    name: 'Easter Sunday',
    rule: { type: 'easter', offsetDays: 0 },
    effect: 'petals',
    countries: ['US', 'GB', 'FR', 'DE', 'IT', 'ES', 'PL', 'IE', 'AU', 'NZ', 'CA', 'BR', 'AR', 'CL'],
    priority: 85,
  },

  // Christmas season
  {
    name: 'Christmas Season',
    rule: { type: 'range', startMonth: 12, startDay: 20, endMonth: 12, endDay: 26 },
    effect: 'snow',
    priority: 95,
  },
];
