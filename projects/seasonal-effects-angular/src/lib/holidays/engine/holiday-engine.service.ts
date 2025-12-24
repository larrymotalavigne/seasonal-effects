import { Injectable } from '@angular/core';
import {
  Holiday,
  HolidayMatch,
  HolidayRegistration,
} from '../../core/models/holiday.types';
import { ISO3166_1_Alpha2 } from '../../core/models/country.types';
import { HolidayRuleMatcherFactory } from '../rules/holiday-rule-matcher';
import { BUILT_IN_HOLIDAYS } from '../registry/built-in-holidays';

/**
 * Holiday engine for detecting and managing holidays
 */
@Injectable({
  providedIn: 'root',
})
export class HolidayEngineService {
  private customHolidays: Holiday[] = [];

  /**
   * Find matching holidays for a given date and country
   */
  findHolidays(date: Date, country: ISO3166_1_Alpha2): HolidayMatch[] {
    const allHolidays = [...BUILT_IN_HOLIDAYS, ...this.customHolidays];
    const matches: HolidayMatch[] = [];

    for (const holiday of allHolidays) {
      // Check if holiday applies to this country
      if (holiday.countries && !holiday.countries.includes(country)) {
        continue;
      }

      // Check if the date matches the holiday rule
      const matcher = HolidayRuleMatcherFactory.createMatcher(holiday.rule);
      if (matcher.matches(date, country)) {
        matches.push({
          holiday,
          country,
          effect: holiday.effect,
        });
      }
    }

    // Sort by priority (higher first)
    return matches.sort((a, b) => {
      const priorityA = a.holiday.priority ?? 0;
      const priorityB = b.holiday.priority ?? 0;
      return priorityB - priorityA;
    });
  }

  /**
   * Get the highest priority holiday match for a date and country
   */
  getTopHoliday(date: Date, country: ISO3166_1_Alpha2): HolidayMatch | null {
    const matches = this.findHolidays(date, country);
    return matches.length > 0 ? matches[0] : null;
  }

  /**
   * Register custom holidays
   */
  registerHolidays(registration: HolidayRegistration): void {
    // If country-specific, add country to each holiday
    const holidays = registration.country
      ? registration.holidays.map((h) => ({
          ...h,
          countries: h.countries
            ? [...h.countries, registration.country!]
            : [registration.country!],
        }))
      : registration.holidays;

    this.customHolidays.push(...holidays);
  }

  /**
   * Clear all custom holidays
   */
  clearCustomHolidays(): void {
    this.customHolidays = [];
  }

  /**
   * Get all holidays (built-in + custom)
   */
  getAllHolidays(): Holiday[] {
    return [...BUILT_IN_HOLIDAYS, ...this.customHolidays];
  }

  /**
   * Get holidays for a specific country
   */
  getHolidaysForCountry(country: ISO3166_1_Alpha2): Holiday[] {
    const allHolidays = this.getAllHolidays();
    return allHolidays.filter(
      (h) => !h.countries || h.countries.includes(country)
    );
  }
}
