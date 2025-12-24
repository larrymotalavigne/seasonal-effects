import { ISO3166_1_Alpha2 } from './country.types';
import { EffectType } from './effect.types';

/**
 * Fixed date rule (e.g., Jan 1, Jul 4)
 */
export interface FixedDateRule {
  type: 'fixed';
  month: number; // 1-12
  day: number;   // 1-31
}

/**
 * Date range rule (e.g., Mar 20 - Apr 10)
 */
export interface DateRangeRule {
  type: 'range';
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

/**
 * Relative date rule (e.g., 4th Thursday of November)
 */
export interface RelativeDateRule {
  type: 'relative';
  month: number;        // 1-12
  weekday: number;      // 0-6 (Sunday = 0)
  occurrence: number;   // 1-5 (1st, 2nd, 3rd, 4th, 5th)
}

/**
 * Easter-based rule (offset from Easter Sunday)
 */
export interface EasterBasedRule {
  type: 'easter';
  offsetDays: number; // Days before (-) or after (+) Easter
}

/**
 * Custom function rule for complex calculations
 */
export interface CustomRule {
  type: 'custom';
  matcher: (date: Date, country: ISO3166_1_Alpha2) => boolean;
}

/**
 * Union of all holiday rule types
 */
export type HolidayRule =
  | FixedDateRule
  | DateRangeRule
  | RelativeDateRule
  | EasterBasedRule
  | CustomRule;

/**
 * Holiday definition
 */
export interface Holiday {
  name: string;
  rule: HolidayRule;
  effect: EffectType;
  countries?: ISO3166_1_Alpha2[]; // If undefined, applies globally
  priority?: number; // Higher priority wins if multiple holidays match
}

/**
 * Holiday registration payload
 */
export interface HolidayRegistration {
  country?: ISO3166_1_Alpha2; // If undefined, applies globally
  holidays: Holiday[];
}

/**
 * Holiday match result
 */
export interface HolidayMatch {
  holiday: Holiday;
  country?: ISO3166_1_Alpha2;
  effect: EffectType;
}
