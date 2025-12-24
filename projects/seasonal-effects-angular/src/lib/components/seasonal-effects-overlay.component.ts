import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
  signal,
  effect,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EffectOrchestratorService } from '../core/services/effect-orchestrator.service';
import { EffectRegistryService } from '../effects/registry/effect-registry.service';
import { SEASONAL_EFFECTS_CONFIG } from '../core/config/seasonal-effects.config';
import { SeasonalEffect } from '../core/models/effect.types';
import { afterHydration } from '../core/utils/platform.utils';

/**
 * Overlay component for rendering seasonal effects
 * SSR-safe: Effects only start after hydration in browser
 *
 * @example
 * ```html
 * <seasonal-effects-overlay />
 * ```
 */
@Component({
  selector: 'seasonal-effects-overlay',
  standalone: true,
  template: `
    <div
      #container
      class="seasonal-effects-container"
      [style.z-index]="zIndex()"
      [attr.aria-hidden]="true"
    ></div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .seasonal-effects-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonalEffectsOverlayComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly config = inject(SEASONAL_EFFECTS_CONFIG);
  private readonly orchestrator = inject(EffectOrchestratorService);
  private readonly effectRegistry = inject(EffectRegistryService);

  private currentEffect: SeasonalEffect | null = null;
  private hydrated = false;

  readonly zIndex = signal(this.config.zIndex ?? 9999);

  constructor() {
    // React to effect changes
    effect(() => {
      if (!this.hydrated) {
        return;
      }

      const effectType = this.orchestrator.activeEffect();
      this.switchEffect(effectType);
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Update effect determination
    this.orchestrator.updateEffect();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Wait for hydration before starting effects
    afterHydration(() => {
      this.hydrated = true;
      const effectType = this.orchestrator.activeEffect();
      this.switchEffect(effectType);
    });
  }

  ngOnDestroy(): void {
    this.stopCurrentEffect();
  }

  /**
   * Switch to a different effect
   */
  private switchEffect(effectType: string): void {
    // Stop current effect
    this.stopCurrentEffect();

    // Don't start if disabled or none
    if (effectType === 'none' || !this.hydrated) {
      return;
    }

    // Create and start new effect
    const effect = this.effectRegistry.create(effectType as any);
    if (!effect) {
      console.warn(`[SeasonalEffects] Effect type "${effectType}" not found in registry`);
      return;
    }

    if (this.config.debug) {
      console.log(`[SeasonalEffects] Starting effect: ${effectType}`);
    }

    effect.start(this.container.nativeElement, {
      intensity: this.config.intensity ?? 'medium',
      respectReducedMotion: this.config.respectReducedMotion ?? true,
      colors: this.config.effects as any,
    });

    this.currentEffect = effect;
  }

  /**
   * Stop the current effect
   */
  private stopCurrentEffect(): void {
    if (this.currentEffect) {
      if (this.config.debug) {
        console.log(`[SeasonalEffects] Stopping effect: ${this.currentEffect.id}`);
      }
      this.currentEffect.stop();
      this.currentEffect = null;
    }
  }
}
