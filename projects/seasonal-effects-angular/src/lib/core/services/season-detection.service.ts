import { Injectable } from '@angular/core';
import {
  Season,
  SeasonConfig,
  SeasonDetectionInput,
  SeasonDetectionResult,
  NORTHERN_HEMISPHERE_SEASONS,
  SOUTHERN_HEMISPHERE_SEASONS,
  CountrySeasonOverride,
} from '../models/season.types';
import { COUNTRY_METADATA, ISO3166_1_Alpha2 } from '../models/country.types';

/**
 * Service for detecting seasons based on country and date
 * Supports hemisphere-aware season calculation
 */
@Injectable({
  providedIn: 'root',
})
export class SeasonDetectionService {
  private customSeasonOverrides = new Map<ISO3166_1_Alpha2, Partial<SeasonConfig>>();

  /**
   * Detect the current season for a given country and date
   */
  detectSeason(input: SeasonDetectionInput): SeasonDetectionResult {
    const date = input.date || new Date();
    const { country, seasonOverride } = input;

    // If manual override is provided, use it
    if (seasonOverride) {
      return {
        season: seasonOverride,
        isOverridden: true,
        date,
        country,
      };
    }

    // Get season configuration for this country
    const seasonConfig = this.getSeasonConfigForCountry(country);

    // Calculate season based on date
    const season = this.calculateSeason(date, seasonConfig);

    return {
      season,
      isOverridden: false,
      date,
      country,
    };
  }

  /**
   * Register custom season overrides for a specific country
   */
  registerSeasonOverride(override: CountrySeasonOverride): void {
    const existing = this.customSeasonOverrides.get(override.country) || {};
    this.customSeasonOverrides.set(override.country, {
      ...existing,
      ...override.seasons,
    });
  }

  /**
   * Get season configuration for a country
   */
  private getSeasonConfigForCountry(country: ISO3166_1_Alpha2): SeasonConfig {
    // Check for custom overrides first
    const customOverride = this.customSeasonOverrides.get(country);

    // Get default config based on hemisphere
    const metadata = COUNTRY_METADATA[country];
    const defaultConfig = metadata.hemisphere === 'northern'
      ? NORTHERN_HEMISPHERE_SEASONS
      : SOUTHERN_HEMISPHERE_SEASONS;

    // Merge custom overrides with defaults
    return {
      ...defaultConfig,
      ...customOverride,
    };
  }

  /**
   * Calculate season from date and season configuration
   */
  private calculateSeason(date: Date, config: SeasonConfig): Season {
    const month = date.getMonth() + 1; // 0-indexed to 1-indexed

    // Check each season
    if (this.isInSeasonRange(month, config.winter)) {
      return 'winter';
    }
    if (this.isInSeasonRange(month, config.spring)) {
      return 'spring';
    }
    if (this.isInSeasonRange(month, config.summer)) {
      return 'summer';
    }
    if (this.isInSeasonRange(month, config.autumn)) {
      return 'autumn';
    }

    // Default to summer if no match (shouldn't happen)
    return 'summer';
  }

  /**
   * Check if a month falls within a season range
   * Handles ranges that wrap around year boundaries (e.g., Dec-Feb)
   */
  private isInSeasonRange(month: number, range: { start: number; end: number }): boolean {
    if (range.start <= range.end) {
      // Normal range (e.g., 3-5 for Mar-May)
      return month >= range.start && month <= range.end;
    } else {
      // Wrapped range (e.g., 12-2 for Dec-Feb)
      return month >= range.start || month <= range.end;
    }
  }

  /**
   * Get all seasons for a country throughout the year
   * Useful for preview/testing
   */
  getSeasonTimeline(country: ISO3166_1_Alpha2, year: number = new Date().getFullYear()): Array<{
    month: number;
    season: Season;
  }> {
    const config = this.getSeasonConfigForCountry(country);
    const timeline: Array<{ month: number; season: Season }> = [];

    for (let month = 1; month <= 12; month++) {
      const date = new Date(year, month - 1, 15); // Mid-month
      const season = this.calculateSeason(date, config);
      timeline.push({ month, season });
    }

    return timeline;
  }
}
