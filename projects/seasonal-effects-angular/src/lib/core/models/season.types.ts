import { ISO3166_1_Alpha2 } from './country.types';

/**
 * Season types
 */
export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

/**
 * Month ranges for seasons (1-12)
 */
export interface SeasonRange {
  start: number; // Month (1-12)
  end: number;   // Month (1-12)
}

/**
 * Season configuration per hemisphere
 */
export interface SeasonConfig {
  winter: SeasonRange;
  spring: SeasonRange;
  summer: SeasonRange;
  autumn: SeasonRange;
}

/**
 * Default season ranges for northern hemisphere
 */
export const NORTHERN_HEMISPHERE_SEASONS: SeasonConfig = {
  winter: { start: 12, end: 2 },  // Dec-Feb
  spring: { start: 3, end: 5 },   // Mar-May
  summer: { start: 6, end: 8 },   // Jun-Aug
  autumn: { start: 9, end: 11 },  // Sep-Nov
};

/**
 * Default season ranges for southern hemisphere
 */
export const SOUTHERN_HEMISPHERE_SEASONS: SeasonConfig = {
  winter: { start: 6, end: 8 },   // Jun-Aug
  spring: { start: 9, end: 11 },  // Sep-Nov
  summer: { start: 12, end: 2 },  // Dec-Feb
  autumn: { start: 3, end: 5 },   // Mar-May
};

/**
 * Custom season override per country
 */
export interface CountrySeasonOverride {
  country: ISO3166_1_Alpha2;
  seasons: Partial<SeasonConfig>;
}

/**
 * Detection input for season calculation
 */
export interface SeasonDetectionInput {
  country: ISO3166_1_Alpha2;
  date?: Date;
  seasonOverride?: Season;
}

/**
 * Season detection result
 */
export interface SeasonDetectionResult {
  season: Season;
  isOverridden: boolean;
  date: Date;
  country: ISO3166_1_Alpha2;
}
