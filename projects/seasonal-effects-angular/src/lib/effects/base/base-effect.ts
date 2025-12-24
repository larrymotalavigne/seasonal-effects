import { SeasonalEffect, EffectType, EffectConfig } from '../../core/models/effect.types';

/**
 * Abstract base class for all seasonal effects
 * Provides common functionality and enforces the contract
 */
export abstract class BaseEffect implements SeasonalEffect {
  abstract readonly id: EffectType;
  abstract readonly supportsSSR: boolean;

  protected container: HTMLElement | null = null;
  protected config: EffectConfig | null = null;
  protected running = false;
  protected animationFrameId: number | null = null;
  protected reducedMotion = false;

  /**
   * Start the effect
   */
  start(container: HTMLElement, config: EffectConfig): void {
    if (this.running) {
      this.stop();
    }

    this.container = container;
    this.config = config;
    this.running = true;

    // Check for reduced motion preference
    if (config.respectReducedMotion) {
      this.reducedMotion = this.prefersReducedMotion();
      if (this.reducedMotion) {
        // Don't start intensive animations if user prefers reduced motion
        return;
      }
    }

    this.onStart();
  }

  /**
   * Stop the effect and clean up
   */
  stop(): void {
    if (!this.running) {
      return;
    }

    this.running = false;
    this.onStop();
    this.cleanup();
  }

  /**
   * Check if effect is currently running
   */
  isRunning(): boolean {
    return this.running;
  }

  /**
   * Subclasses implement this to start their effect
   */
  protected abstract onStart(): void;

  /**
   * Subclasses implement this to stop their effect
   */
  protected abstract onStop(): void;

  /**
   * Clean up resources
   */
  protected cleanup(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Remove any created DOM elements
    if (this.container) {
      this.container.innerHTML = '';
    }

    this.container = null;
    this.config = null;
  }

  /**
   * Check if user prefers reduced motion
   */
  protected prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Get intensity multiplier based on config
   */
  protected getIntensityMultiplier(): number {
    if (!this.config) {
      return 1;
    }

    switch (this.config.intensity) {
      case 'low':
        return 0.5;
      case 'medium':
        return 1;
      case 'high':
        return 1.5;
      default:
        return 1;
    }
  }

  /**
   * Safely create canvas element
   */
  protected createCanvas(): HTMLCanvasElement | null {
    if (!this.container) {
      return null;
    }

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';

    // Set actual size
    const rect = this.container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    this.container.appendChild(canvas);
    return canvas;
  }

  /**
   * Handle window resize
   */
  protected handleResize(canvas: HTMLCanvasElement): void {
    if (!this.container) {
      return;
    }

    const rect = this.container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
}
