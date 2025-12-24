import { BaseEffect } from '../base/base-effect';
import { EffectType } from '../../core/models/effect.types';

interface Confetti {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  speed: number;
  wind: number;
  size: number;
  color: string;
  shape: 'rect' | 'circle';
}

/**
 * Confetti effect for celebrations
 */
export class ConfettiEffect extends BaseEffect {
  readonly id: EffectType = 'confetti';
  readonly supportsSSR = false;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private confetti: Confetti[] = [];
  private lastTime = 0;
  private resizeObserver: ResizeObserver | null = null;

  private readonly colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  protected onStart(): void {
    if (!this.container) return;

    if (this.config?.colors && this.config.colors.length > 0) {
      this.colors.splice(0, this.colors.length, ...this.config.colors);
    }

    this.canvas = this.createCanvas();
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    this.initConfetti();
    this.lastTime = performance.now();
    this.animate(this.lastTime);
    this.setupResizeObserver();
  }

  protected onStop(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.confetti = [];
    this.ctx = null;
    this.canvas = null;
  }

  private initConfetti(): void {
    if (!this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const intensity = this.getIntensityMultiplier();
    const count = Math.floor((width * height) / 8000 * intensity);

    this.confetti = [];
    for (let i = 0; i < count; i++) {
      this.confetti.push(this.createConfetti(width, height, true));
    }
  }

  private createConfetti(width: number, height: number, randomY = false): Confetti {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -10,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      speed: Math.random() * 2 + 1,
      wind: (Math.random() - 0.5) * 1,
      size: Math.random() * 6 + 4,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    };
  }

  private animate = (currentTime: number): void => {
    if (!this.running || !this.canvas || !this.ctx) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateConfetti(deltaTime);
    this.drawConfetti();

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private updateConfetti(deltaTime: number): void {
    if (!this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const timeFactor = Math.min(deltaTime / 16.67, 2);

    for (let i = 0; i < this.confetti.length; i++) {
      const piece = this.confetti[i];

      piece.y += piece.speed * timeFactor;
      piece.x += piece.wind * timeFactor;
      piece.rotation += piece.rotationSpeed * timeFactor;

      if (piece.y > height + 20) {
        this.confetti[i] = this.createConfetti(width, height, false);
      }

      if (piece.x > width + 20) piece.x = -20;
      else if (piece.x < -20) piece.x = width + 20;
    }
  }

  private drawConfetti(): void {
    if (!this.ctx) return;

    for (const piece of this.confetti) {
      this.ctx.save();
      this.ctx.translate(piece.x, piece.y);
      this.ctx.rotate(piece.rotation);
      this.ctx.fillStyle = piece.color;

      if (piece.shape === 'rect') {
        this.ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }
  }

  private setupResizeObserver(): void {
    if (!this.container || !this.canvas || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => {
      if (this.canvas && this.container) {
        this.handleResize(this.canvas);
        this.initConfetti();
      }
    });

    this.resizeObserver.observe(this.container);
  }
}
