/**
 * Utility functions for platform detection
 */

/**
 * Check if code is running in browser with hydration support
 */
export function afterHydration(callback: () => void): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Check if Angular hydration is available
  if (typeof (window as any).ngHydrationEnabled !== 'undefined') {
    // Wait for hydration to complete
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback, { once: true });
    }
  } else {
    // No hydration, run immediately
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }
}
