import { BaseEffect } from '../base/base-effect';
import { EffectType } from '../../core/models/effect.types';

/**
 * Firework particle
 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

/**
 * Firework rocket
 */
interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  exploded: boolean;
}

/**
 * Canvas-based fireworks effect
 * Creates beautiful firework explosions with particle physics
 */
export class FireworksEffect extends BaseEffect {
  readonly id: EffectType = 'fireworks';
  readonly supportsSSR = false;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private rockets: Rocket[] = [];
  private particles: Particle[] = [];
  private lastTime = 0;
  private lastRocketTime = 0;
  private resizeObserver: ResizeObserver | null = null;

  private readonly colors = [
    '#ff0000', // Red
    '#ff7f00', // Orange
    '#ffff00', // Yellow
    '#00ff00', // Green
    '#0000ff', // Blue
    '#4b0082', // Indigo
    '#9400d3', // Violet
    '#ff1493', // Deep Pink
    '#00ffff', // Cyan
    '#ffd700', // Gold
  ];

  protected onStart(): void {
    if (!this.container) {
      return;
    }

    // Use custom colors if provided
    if (this.config?.colors && this.config.colors.length > 0) {
      this.colors.splice(0, this.colors.length, ...this.config.colors);
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

    // Start animation loop
    this.lastTime = performance.now();
    this.lastRocketTime = this.lastTime;
    this.animate(this.lastTime);

    // Handle resize
    this.setupResizeObserver();
  }

  protected onStop(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    this.rockets = [];
    this.particles = [];
    this.ctx = null;
    this.canvas = null;
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

    // Clear canvas with fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Launch new rockets periodically
    this.launchRockets(currentTime);

    // Update and draw rockets
    this.updateRockets(deltaTime);
    this.drawRockets();

    // Update and draw particles
    this.updateParticles(deltaTime);
    this.drawParticles();

    // Continue animation
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  /**
   * Launch rockets periodically
   */
  private launchRockets(currentTime: number): void {
    if (!this.canvas) {
      return;
    }

    const intensity = this.getIntensityMultiplier();
    const launchInterval = 1500 / intensity; // More frequent with higher intensity

    if (currentTime - this.lastRocketTime > launchInterval) {
      const count = Math.floor(Math.random() * 2 + 1) * (intensity >= 1.5 ? 2 : 1);
      for (let i = 0; i < count; i++) {
        this.rockets.push(this.createRocket());
      }
      this.lastRocketTime = currentTime;
    }
  }

  /**
   * Create a rocket
   */
  private createRocket(): Rocket {
    if (!this.canvas) {
      return {
        x: 0,
        y: 0,
        targetY: 0,
        vy: 0,
        color: this.colors[0],
        exploded: false,
      };
    }

    const width = this.canvas.width;
    const height = this.canvas.height;

    return {
      x: Math.random() * width,
      y: height,
      targetY: Math.random() * (height * 0.4) + height * 0.1, // Top 10-50%
      vy: -8,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      exploded: false,
    };
  }

  /**
   * Update rocket positions and create explosions
   */
  private updateRockets(deltaTime: number): void {
    const timeFactor = Math.min(deltaTime / 16.67, 2);

    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const rocket = this.rockets[i];

      rocket.y += rocket.vy * timeFactor;

      // Explode when reaching target or going up (vy becomes positive due to gravity)
      if (!rocket.exploded && (rocket.y <= rocket.targetY || rocket.vy > 0)) {
        this.createExplosion(rocket);
        rocket.exploded = true;
        this.rockets.splice(i, 1);
      }
    }
  }

  /**
   * Create explosion particles
   */
  private createExplosion(rocket: Rocket): void {
    const intensity = this.getIntensityMultiplier();
    const particleCount = Math.floor(100 * intensity);

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = Math.random() * 4 + 2;

      this.particles.push({
        x: rocket.x,
        y: rocket.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 0.5 + 0.5,
        color: rocket.color,
        size: Math.random() * 3 + 2,
      });
    }
  }

  /**
   * Update particle positions and life
   */
  private updateParticles(deltaTime: number): void {
    const timeFactor = Math.min(deltaTime / 16.67, 2);
    const gravity = 0.1;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      // Update position
      particle.x += particle.vx * timeFactor;
      particle.y += particle.vy * timeFactor;

      // Apply gravity
      particle.vy += gravity * timeFactor;

      // Update life
      particle.life -= (1 / 60) * timeFactor / particle.maxLife;

      // Remove dead particles
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  /**
   * Draw rockets
   */
  private drawRockets(): void {
    if (!this.ctx) {
      return;
    }

    for (const rocket of this.rockets) {
      this.ctx.fillStyle = rocket.color;
      this.ctx.beginPath();
      this.ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw trail
      this.ctx.strokeStyle = rocket.color;
      this.ctx.lineWidth = 2;
      this.ctx.globalAlpha = 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(rocket.x, rocket.y);
      this.ctx.lineTo(rocket.x, rocket.y + 10);
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
    }
  }

  /**
   * Draw particles
   */
  private drawParticles(): void {
    if (!this.ctx) {
      return;
    }

    for (const particle of this.particles) {
      this.ctx.globalAlpha = particle.life;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
  }

  /**
   * Setup resize observer
   */
  private setupResizeObserver(): void {
    if (!this.container || !this.canvas || typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      if (this.canvas) {
        this.handleResize(this.canvas);
      }
    });

    this.resizeObserver.observe(this.container);
  }
}
