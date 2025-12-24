import { InjectionToken } from '@angular/core';
import { ISO3166_1_Alpha2 } from '../models/country.types';
import { EffectType, EffectIntensity } from '../models/effect.types';
import { Season } from '../models/season.types';

/**
 * Effect selection mode
 */
export type EffectSelectionMode = 'auto' | 'manual' | 'disabled';

/**
 * Global seasonal effects configuration
 */
export interface SeasonalEffectsConfig {
  /**
   * Country code for seasonal and holiday detection
   */
  country: ISO3166_1_Alpha2;

  /**
   * Enable holiday-based effects
   * @default true
   */
  enableHolidays?: boolean;

  /**
   * Enable season-based effects
   * @default true
   */
  enableSeasons?: boolean;

  /**
   * Effect selection mode
   * - 'auto': Automatically select effects based on season/holiday
   * - 'manual': Use only effects specified in 'effects' array
   * - 'disabled': No effects
   * @default 'auto'
   */
  mode?: EffectSelectionMode;

  /**
   * Effects to use
   * - If mode is 'auto', this is used as a whitelist
   * - If mode is 'manual', these effects are always applied
   * @default ['auto'] - Allow all effects
   */
  effects?: (EffectType | 'auto')[];

  /**
   * Effect intensity
   * @default 'medium'
   */
  intensity?: EffectIntensity;

  /**
   * Disable all effects
   * @default false
   */
  disabled?: boolean;

  /**
   * Respect prefers-reduced-motion
   * @default true
   */
  respectReducedMotion?: boolean;

  /**
   * Manual season override
   */
  seasonOverride?: Season;

  /**
   * Custom date for testing/preview
   */
  dateOverride?: Date;

  /**
   * z-index for effect overlay
   * @default 9999
   */
  zIndex?: number;

  /**
   * Enable debug mode (console logging)
   * @default false
   */
  debug?: boolean;
}

/**
 * Default configuration
 */
export const DEFAULT_SEASONAL_EFFECTS_CONFIG: Required<Omit<SeasonalEffectsConfig, 'seasonOverride' | 'dateOverride' | 'country'>> = {
  enableHolidays: true,
  enableSeasons: true,
  mode: 'auto',
  effects: ['auto'],
  intensity: 'medium',
  disabled: false,
  respectReducedMotion: true,
  zIndex: 9999,
  debug: false,
};

/**
 * Injection token for seasonal effects configuration
 */
export const SEASONAL_EFFECTS_CONFIG = new InjectionToken<SeasonalEffectsConfig>(
  'SEASONAL_EFFECTS_CONFIG'
);

/**
 * Partial configuration for runtime updates
 */
export type PartialSeasonalEffectsConfig = Partial<SeasonalEffectsConfig>;
