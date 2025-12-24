import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SEASONAL_EFFECTS_CONFIG } from '../config/seasonal-effects.config';
import { SeasonDetectionService } from './season-detection.service';
import { HolidayEngineService } from '../../holidays/engine/holiday-engine.service';
import { EffectRegistryService } from '../../effects/registry/effect-registry.service';
import { EffectType } from '../models/effect.types';
import { Season } from '../models/season.types';

/**
 * Orchestrates effect selection based on season, holidays, and configuration
 */
@Injectable({
  providedIn: 'root',
})
export class EffectOrchestratorService {
  private readonly config = inject(SEASONAL_EFFECTS_CONFIG);
  private readonly seasonDetection = inject(SeasonDetectionService);
  private readonly holidayEngine = inject(HolidayEngineService);
  private readonly effectRegistry = inject(EffectRegistryService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Current active effect type
   */
  readonly activeEffect = signal<EffectType>('none');

  /**
   * Whether effects are enabled
   */
  readonly enabled = computed(() => {
    return this.isBrowser && !this.config.disabled;
  });

  /**
   * Determine which effect should be active
   */
  determineEffect(): EffectType {
    if (!this.enabled()) {
      return 'none';
    }

    const date = this.config.dateOverride || new Date();

    // Check for holiday effect first (higher priority)
    if (this.config.enableHolidays) {
      const holiday = this.holidayEngine.getTopHoliday(date, this.config.country);
      if (holiday && this.isEffectAllowed(holiday.effect)) {
        return holiday.effect;
      }
    }

    // Fall back to seasonal effect
    if (this.config.enableSeasons) {
      const seasonResult = this.seasonDetection.detectSeason({
        country: this.config.country,
        date,
        seasonOverride: this.config.seasonOverride,
      });

      const seasonalEffect = this.getSeasonalEffect(seasonResult.season);
      if (seasonalEffect && this.isEffectAllowed(seasonalEffect)) {
        return seasonalEffect;
      }
    }

    // Manual mode
    if (this.config.mode === 'manual' && this.config.effects && this.config.effects.length > 0) {
      const firstEffect = this.config.effects[0];
      if (firstEffect !== 'auto') {
        return firstEffect;
      }
    }

    return 'none';
  }

  /**
   * Map season to default effect
   */
  private getSeasonalEffect(season: Season): EffectType | null {
    const mapping: Record<Season, EffectType> = {
      winter: 'snow',
      spring: 'petals',
      summer: 'none',
      autumn: 'leaves',
    };

    return mapping[season];
  }

  /**
   * Check if an effect is allowed by configuration
   */
  private isEffectAllowed(effect: EffectType): boolean {
    if (!this.config.effects || this.config.effects.length === 0) {
      return true;
    }

    // 'auto' means all effects are allowed
    if (this.config.effects.includes('auto')) {
      return true;
    }

    return this.config.effects.includes(effect);
  }

  /**
   * Update active effect
   */
  updateEffect(): void {
    const newEffect = this.determineEffect();
    this.activeEffect.set(newEffect);
  }
}
