import { BaseEffect } from '../base/base-effect';
import { EffectType } from '../../core/models/effect.types';

/**
 * Snowflake particle
 */
interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  opacity: number;
}

/**
 * Canvas-based snow effect
 * High-performance implementation with configurable intensity
 */
export class SnowEffect extends BaseEffect {
  readonly id: EffectType = 'snow';
  readonly supportsSSR = false;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private snowflakes: Snowflake[] = [];
  private lastTime = 0;
  private resizeObserver: ResizeObserver | null = null;

  protected onStart(): void {
    if (!this.container) {
      return;
    }

    // Create canvas
    this.canvas = this.createCanvas();
    if (!this.canvas) {
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      return;
    }

    // Initialize snowflakes
    this.initSnowflakes();

    // Start animation loop
    this.lastTime = performance.now();
    this.animate(this.lastTime);

    // Handle resize
    this.setupResizeObserver();
  }

  protected onStop(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    this.snowflakes = [];
    this.ctx = null;
    this.canvas = null;
  }

  /**
   * Initialize snowflakes based on canvas size and intensity
   */
  private initSnowflakes(): void {
    if (!this.canvas) {
      return;
    }

    const width = this.canvas.width;
    const height = this.canvas.height;
    const intensity = this.getIntensityMultiplier();

    // Calculate number of snowflakes based on area and intensity
    const area = width * height;
    const baseCount = Math.floor(area / 10000); // 1 per 10000px²
    const count = Math.floor(baseCount * intensity);

    this.snowflakes = [];

    for (let i = 0; i < count; i++) {
      this.snowflakes.push(this.createSnowflake(width, height, true));
    }
  }

  /**
   * Create a single snowflake
   */
  private createSnowflake(width: number, height: number, randomY = false): Snowflake {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -10,
      radius: Math.random() * 3 + 1, // 1-4px
      speed: Math.random() * 1 + 0.5, // 0.5-1.5 px/frame
      wind: (Math.random() - 0.5) * 0.5, // -0.25 to 0.25 px/frame
      opacity: Math.random() * 0.6 + 0.4, // 0.4-1.0
    };
  }

  /**
   * Animation loop
   */
  private animate = (currentTime: number): void => {
    if (!this.running || !this.canvas || !this.ctx) {
      return;
    }

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw snowflakes
    this.updateSnowflakes(deltaTime);
    this.drawSnowflakes();

    // Continue animation
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  /**
   * Update snowflake positions
   */
  private updateSnowflakes(deltaTime: number): void {
    if (!this.canvas) {
      return;
    }

    const width = this.canvas.width;
    const height = this.canvas.height;
    const timeFactor = Math.min(deltaTime / 16.67, 2); // Normalize to 60fps, cap at 2x

    for (let i = 0; i < this.snowflakes.length; i++) {
      const flake = this.snowflakes[i];

      // Update position
      flake.y += flake.speed * timeFactor;
      flake.x += flake.wind * timeFactor;

      // Add subtle horizontal oscillation
      flake.x += Math.sin(flake.y * 0.01) * 0.3;

      // Reset if off screen
      if (flake.y > height + 10) {
        this.snowflakes[i] = this.createSnowflake(width, height, false);
      }

      // Wrap around horizontally
      if (flake.x > width + 10) {
        flake.x = -10;
      } else if (flake.x < -10) {
        flake.x = width + 10;
      }
    }
  }

  /**
   * Draw all snowflakes
   */
  private drawSnowflakes(): void {
    if (!this.ctx) {
      return;
    }

    this.ctx.fillStyle = 'white';

    for (const flake of this.snowflakes) {
      this.ctx.globalAlpha = flake.opacity;
      this.ctx.beginPath();
      this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
  }

  /**
   * Setup resize observer to handle container size changes
   */
  private setupResizeObserver(): void {
    if (!this.container || !this.canvas || typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      if (this.canvas && this.container) {
        this.handleResize(this.canvas);
        this.initSnowflakes(); // Reinitialize with new size
      }
    });

    this.resizeObserver.observe(this.container);
  }
}
