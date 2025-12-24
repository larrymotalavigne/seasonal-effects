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
