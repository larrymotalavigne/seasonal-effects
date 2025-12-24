import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  inject,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EffectRegistryService } from '../effects/registry/effect-registry.service';
import { SEASONAL_EFFECTS_CONFIG } from '../core/config/seasonal-effects.config';
import { SeasonalEffect, EffectType } from '../core/models/effect.types';
import { afterHydration } from '../core/utils/platform.utils';

/**
 * Directive to apply a specific seasonal effect to an element
 * SSR-safe: Effects only start after hydration in browser
 *
 * @example
 * ```html
 * <div seasonalEffect="snow" style="position: relative; height: 400px;">
 *   Your content here
 * </div>
 * ```
 */
@Directive({
  selector: '[seasonalEffect]',
  standalone: true,
})
export class SeasonalEffectDirective implements OnInit, AfterViewInit, OnDestroy {
  /**
   * The effect type to apply
   */
  @Input({ required: true }) seasonalEffect!: EffectType;

  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly config = inject(SEASONAL_EFFECTS_CONFIG);
  private readonly effectRegistry = inject(EffectRegistryService);

  private effect: SeasonalEffect | null = null;
  private container: HTMLDivElement | null = null;
  private hydrated = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Ensure host element has position
    const element = this.elementRef.nativeElement as HTMLElement;
    const position = window.getComputedStyle(element).position;
    if (position === 'static') {
      element.style.position = 'relative';
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Wait for hydration before starting effects
    afterHydration(() => {
      this.hydrated = true;
      this.startEffect();
    });
  }

  ngOnDestroy(): void {
    this.stopEffect();
  }

  /**
   * Start the effect
   */
  private startEffect(): void {
    if (!this.hydrated || this.config.disabled) {
      return;
    }

    // Create container for the effect
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.pointerEvents = 'none';
    this.container.style.overflow = 'hidden';
    this.container.setAttribute('aria-hidden', 'true');

    const element = this.elementRef.nativeElement as HTMLElement;
    element.appendChild(this.container);

    // Create and start effect
    const effect = this.effectRegistry.create(this.seasonalEffect);
    if (!effect) {
      console.warn(
        `[SeasonalEffects] Effect type "${this.seasonalEffect}" not found in registry`
      );
      return;
    }

    if (this.config.debug) {
      console.log(`[SeasonalEffects] Starting directive effect: ${this.seasonalEffect}`);
    }

    effect.start(this.container, {
      intensity: this.config.intensity ?? 'medium',
      respectReducedMotion: this.config.respectReducedMotion ?? true,
    });

    this.effect = effect;
  }

  /**
   * Stop the effect
   */
  private stopEffect(): void {
    if (this.effect) {
      if (this.config.debug) {
        console.log(`[SeasonalEffects] Stopping directive effect: ${this.effect.id}`);
      }
      this.effect.stop();
      this.effect = null;
    }

    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
