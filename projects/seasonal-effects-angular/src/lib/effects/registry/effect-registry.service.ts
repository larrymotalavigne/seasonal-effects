import { Injectable } from '@angular/core';
import { EffectType, EffectFactory, SeasonalEffect } from '../../core/models/effect.types';
import { SnowEffect } from '../snow/snow-effect';
import { FireworksEffect } from '../fireworks/fireworks-effect';
import { PetalsEffect } from '../petals/petals-effect';
import { ConfettiEffect } from '../confetti/confetti-effect';
import { LeavesEffect } from '../leaves/leaves-effect';

/**
 * Registry for all available effects
 * Manages effect creation and retrieval
 */
@Injectable({
  providedIn: 'root',
})
export class EffectRegistryService {
  private factories = new Map<EffectType, EffectFactory>();

  constructor() {
    this.registerBuiltInEffects();
  }

  /**
   * Register built-in effects
   */
  private registerBuiltInEffects(): void {
    this.register('snow', () => new SnowEffect());
    this.register('fireworks', () => new FireworksEffect());
    this.register('petals', () => new PetalsEffect());
    this.register('confetti', () => new ConfettiEffect());
    this.register('leaves', () => new LeavesEffect());
  }

  /**
   * Register a custom effect
   */
  register(type: EffectType, factory: EffectFactory): void {
    this.factories.set(type, factory);
  }

  /**
   * Create an effect instance
   */
  create(type: EffectType): SeasonalEffect | null {
    const factory = this.factories.get(type);
    return factory ? factory() : null;
  }

  /**
   * Check if an effect type is registered
   */
  has(type: EffectType): boolean {
    return this.factories.has(type);
  }

  /**
   * Get all registered effect types
   */
  getRegisteredTypes(): EffectType[] {
    return Array.from(this.factories.keys());
  }
}
