/**
 * Effect types available
 */
export type EffectType =
  | 'snow'
  | 'fireworks'
  | 'petals'
  | 'confetti'
  | 'leaves'
  | 'rain'
  | 'stars'
  | 'none';

/**
 * Effect intensity levels
 */
export type EffectIntensity = 'low' | 'medium' | 'high';

/**
 * Effect configuration passed to effects
 */
export interface EffectConfig {
  intensity: EffectIntensity;
  respectReducedMotion: boolean;
  colors?: string[];
  customOptions?: Record<string, unknown>;
}

/**
 * Base interface for all seasonal effects
 */
export interface SeasonalEffect {
  /**
   * Unique identifier for the effect
   */
  readonly id: EffectType;

  /**
   * Whether this effect can run during SSR
   */
  readonly supportsSSR: boolean;

  /**
   * Start the effect
   * @param container - HTML element to render the effect in
   * @param config - Effect configuration
   */
  start(container: HTMLElement, config: EffectConfig): void;

  /**
   * Stop the effect and clean up resources
   */
  stop(): void;

  /**
   * Check if the effect is currently running
   */
  isRunning(): boolean;
}

/**
 * Effect factory function type
 */
export type EffectFactory = () => SeasonalEffect;

/**
 * Effect registration info
 */
export interface EffectRegistration {
  type: EffectType;
  factory: EffectFactory;
  priority?: number;
}
