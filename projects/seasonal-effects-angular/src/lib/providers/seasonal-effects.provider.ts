import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  SeasonalEffectsConfig,
  SEASONAL_EFFECTS_CONFIG,
  DEFAULT_SEASONAL_EFFECTS_CONFIG,
} from '../core/config/seasonal-effects.config';

/**
 * Provide seasonal effects configuration
 * Use this in your application providers
 *
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideSeasonalEffects({
 *       country: 'US',
 *       enableHolidays: true,
 *       intensity: 'medium'
 *     })
 *   ]
 * });
 * ```
 */
export function provideSeasonalEffects(
  config: SeasonalEffectsConfig
): EnvironmentProviders {
  const mergedConfig: SeasonalEffectsConfig = {
    ...DEFAULT_SEASONAL_EFFECTS_CONFIG,
    ...config,
  };

  return makeEnvironmentProviders([
    {
      provide: SEASONAL_EFFECTS_CONFIG,
      useValue: mergedConfig,
    },
  ]);
}
