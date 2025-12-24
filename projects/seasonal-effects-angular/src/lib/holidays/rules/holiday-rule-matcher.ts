import {
  HolidayRule,
  FixedDateRule,
  DateRangeRule,
  RelativeDateRule,
  EasterBasedRule,
  CustomRule,
} from '../../core/models/holiday.types';
import { ISO3166_1_Alpha2 } from '../../core/models/country.types';

/**
 * Interface for holiday rule matchers
 */
export interface HolidayRuleMatcher {
  matches(date: Date, country: ISO3166_1_Alpha2): boolean;
}

/**
 * Matcher for fixed date rules
 */
export class FixedDateMatcher implements HolidayRuleMatcher {
  constructor(private rule: FixedDateRule) {}

  matches(date: Date): boolean {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return month === this.rule.month && day === this.rule.day;
  }
}

/**
 * Matcher for date range rules
 */
export class DateRangeMatcher implements HolidayRuleMatcher {
  constructor(private rule: DateRangeRule) {}

  matches(date: Date): boolean {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const startDate = new Date(date.getFullYear(), this.rule.startMonth - 1, this.rule.startDay);
    const endDate = new Date(date.getFullYear(), this.rule.endMonth - 1, this.rule.endDay);
    const currentDate = new Date(date.getFullYear(), month - 1, day);

    // Handle ranges that may cross year boundaries
    if (this.rule.startMonth <= this.rule.endMonth) {
      return currentDate >= startDate && currentDate <= endDate;
    } else {
      return currentDate >= startDate || currentDate <= endDate;
    }
  }
}

/**
 * Matcher for relative date rules (e.g., 4th Thursday of November)
 */
export class RelativeDateMatcher implements HolidayRuleMatcher {
  constructor(private rule: RelativeDateRule) {}

  matches(date: Date): boolean {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Must be in the correct month
    if (month !== this.rule.month) {
      return false;
    }

    // Get the weekday of the current date
    const weekday = date.getDay();
    if (weekday !== this.rule.weekday) {
      return false;
    }

    // Calculate which occurrence this is (1st, 2nd, 3rd, etc.)
    const occurrence = Math.ceil(day / 7);
    return occurrence === this.rule.occurrence;
  }
}

/**
 * Matcher for Easter-based rules
 * Uses Computus algorithm for Easter calculation
 */
export class EasterBasedMatcher implements HolidayRuleMatcher {
  constructor(private rule: EasterBasedRule) {}

  matches(date: Date): boolean {
    const easterDate = this.calculateEaster(date.getFullYear());
    const targetDate = new Date(easterDate);
    targetDate.setDate(targetDate.getDate() + this.rule.offsetDays);

    return (
      date.getFullYear() === targetDate.getFullYear() &&
      date.getMonth() === targetDate.getMonth() &&
      date.getDate() === targetDate.getDate()
    );
  }

  /**
   * Calculate Easter Sunday using the Meeus/Jones/Butcher algorithm
   */
  private calculateEaster(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month - 1, day);
  }
}

/**
 * Matcher for custom function rules
 */
export class CustomRuleMatcher implements HolidayRuleMatcher {
  constructor(private rule: CustomRule) {}

  matches(date: Date, country: ISO3166_1_Alpha2): boolean {
    return this.rule.matcher(date, country);
  }
}

/**
 * Factory for creating matchers based on rule type
 */
export class HolidayRuleMatcherFactory {
  static createMatcher(rule: HolidayRule): HolidayRuleMatcher {
    switch (rule.type) {
      case 'fixed':
        return new FixedDateMatcher(rule);
      case 'range':
        return new DateRangeMatcher(rule);
      case 'relative':
        return new RelativeDateMatcher(rule);
      case 'easter':
        return new EasterBasedMatcher(rule);
      case 'custom':
        return new CustomRuleMatcher(rule);
      default:
        throw new Error(`Unknown rule type: ${(rule as HolidayRule).type}`);
    }
  }
}
