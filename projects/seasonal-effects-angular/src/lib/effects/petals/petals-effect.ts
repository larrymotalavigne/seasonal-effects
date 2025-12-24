import { BaseEffect } from '../base/base-effect';
import { EffectType } from '../../core/models/effect.types';

interface Petal {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  speed: number;
  wind: number;
  size: number;
  opacity: number;
}

/**
 * Cherry blossom petals effect
 * Perfect for spring or Hanami celebrations
 */
export class PetalsEffect extends BaseEffect {
  readonly id: EffectType = 'petals';
  readonly supportsSSR = false;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private petals: Petal[] = [];
  private lastTime = 0;
  private resizeObserver: ResizeObserver | null = null;

  protected onStart(): void {
    if (!this.container) return;

    this.canvas = this.createCanvas();
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    this.initPetals();
    this.lastTime = performance.now();
    this.animate(this.lastTime);
    this.setupResizeObserver();
  }

  protected onStop(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.petals = [];
    this.ctx = null;
    this.canvas = null;
  }

  private initPetals(): void {
    if (!this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const intensity = this.getIntensityMultiplier();
    const count = Math.floor((width * height) / 15000 * intensity);

    this.petals = [];
    for (let i = 0; i < count; i++) {
      this.petals.push(this.createPetal(width, height, true));
    }
  }

  private createPetal(width: number, height: number, randomY = false): Petal {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -10,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      speed: Math.random() * 0.8 + 0.3,
      wind: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 8 + 6,
      opacity: Math.random() * 0.4 + 0.6,
    };
  }

  private animate = (currentTime: number): void => {
    if (!this.running || !this.canvas || !this.ctx) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updatePetals(deltaTime);
    this.drawPetals();

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private updatePetals(deltaTime: number): void {
    if (!this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const timeFactor = Math.min(deltaTime / 16.67, 2);

    for (let i = 0; i < this.petals.length; i++) {
      const petal = this.petals[i];

      petal.y += petal.speed * timeFactor;
      petal.x += petal.wind * timeFactor;
      petal.x += Math.sin(petal.y * 0.01) * 0.5;
      petal.rotation += petal.rotationSpeed * timeFactor;

      if (petal.y > height + 20) {
        this.petals[i] = this.createPetal(width, height, false);
      }

      if (petal.x > width + 20) petal.x = -20;
      else if (petal.x < -20) petal.x = width + 20;
    }
  }

  private drawPetals(): void {
    if (!this.ctx) return;

    for (const petal of this.petals) {
      this.ctx.save();
      this.ctx.translate(petal.x, petal.y);
      this.ctx.rotate(petal.rotation);
      this.ctx.globalAlpha = petal.opacity;

      // Draw petal shape (simple ellipse)
      this.ctx.fillStyle = '#ffb7d5'; // Pink color
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }

    this.ctx.globalAlpha = 1;
  }

  private setupResizeObserver(): void {
    if (!this.container || !this.canvas || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => {
      if (this.canvas && this.container) {
        this.handleResize(this.canvas);
        this.initPetals();
      }
    });

    this.resizeObserver.observe(this.container);
  }
}
