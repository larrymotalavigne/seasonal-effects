import { BaseEffect } from '../base/base-effect';
import { EffectType } from '../../core/models/effect.types';

interface Leaf {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  speed: number;
  wind: number;
  size: number;
  color: string;
  swayOffset: number;
}

/**
 * Falling leaves effect for autumn
 */
export class LeavesEffect extends BaseEffect {
  readonly id: EffectType = 'leaves';
  readonly supportsSSR = false;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private leaves: Leaf[] = [];
  private lastTime = 0;
  private resizeObserver: ResizeObserver | null = null;

  private readonly colors = ['#ff6b35', '#f7931e', '#fdc82f', '#8b4513', '#d2691e'];

  protected onStart(): void {
    if (!this.container) return;

    this.canvas = this.createCanvas();
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    this.initLeaves();
    this.lastTime = performance.now();
    this.animate(this.lastTime);
    this.setupResizeObserver();
  }

  protected onStop(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.leaves = [];
    this.ctx = null;
    this.canvas = null;
  }

  private initLeaves(): void {
    if (!this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const intensity = this.getIntensityMultiplier();
    const count = Math.floor((width * height) / 12000 * intensity);

    this.leaves = [];
    for (let i = 0; i < count; i++) {
      this.leaves.push(this.createLeaf(width, height, true));
    }
  }

  private createLeaf(width: number, height: number, randomY = false): Leaf {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -10,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.08,
      speed: Math.random() * 1 + 0.5,
      wind: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 10 + 8,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      swayOffset: Math.random() * Math.PI * 2,
    };
  }

  private animate = (currentTime: number): void => {
    if (!this.running || !this.canvas || !this.ctx) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateLeaves(deltaTime);
    this.drawLeaves();

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private updateLeaves(deltaTime: number): void {
    if (!this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const timeFactor = Math.min(deltaTime / 16.67, 2);

    for (let i = 0; i < this.leaves.length; i++) {
      const leaf = this.leaves[i];

      leaf.y += leaf.speed * timeFactor;
      leaf.x += leaf.wind * timeFactor;
      leaf.x += Math.sin(leaf.y * 0.01 + leaf.swayOffset) * 0.7;
      leaf.rotation += leaf.rotationSpeed * timeFactor;

      if (leaf.y > height + 20) {
        this.leaves[i] = this.createLeaf(width, height, false);
      }

      if (leaf.x > width + 20) leaf.x = -20;
      else if (leaf.x < -20) leaf.x = width + 20;
    }
  }

  private drawLeaves(): void {
    if (!this.ctx) return;

    for (const leaf of this.leaves) {
      this.ctx.save();
      this.ctx.translate(leaf.x, leaf.y);
      this.ctx.rotate(leaf.rotation);
      this.ctx.fillStyle = leaf.color;

      // Draw simple leaf shape
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, leaf.size, leaf.size * 0.7, 0, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  private setupResizeObserver(): void {
    if (!this.container || !this.canvas || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => {
      if (this.canvas && this.container) {
        this.handleResize(this.canvas);
        this.initLeaves();
      }
    });

    this.resizeObserver.observe(this.container);
  }
}
