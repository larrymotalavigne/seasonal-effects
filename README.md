# @seasonal-effects/angular

[![npm version](https://badge.fury.io/js/%40seasonal-effects%2Fangular.svg)](https://www.npmjs.com/package/@seasonal-effects/angular)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Production-ready Angular library for adding seasonal and holiday-based visual effects to your web applications. Features hemisphere-aware season detection, extensible holiday engine, and full SSR support.

## ✨ Features

- 🌍 **Hemisphere-Aware** - Automatic season detection based on country and hemisphere
- 🎆 **Holiday Effects** - Built-in holiday registry with support for 40+ countries
- 🎨 **Multiple Effects** - Snow, fireworks, petals, confetti, leaves, and more
- 🚀 **SSR-Safe** - Full Angular Universal support with hydration
- 📦 **Tree-Shakable** - Only bundle what you use
- ⚡ **Performant** - Canvas-based rendering with 60fps animations
- ♿ **Accessible** - Respects `prefers-reduced-motion`
- 🎛️ **Configurable** - Multiple intensity levels and customization options
- 🔧 **Extensible** - Easy to add custom effects and holidays

## 🎥 Demo

See the effects in action:

https://github.com/larrymotalavigne/seasonal-effects/raw/main/assets/demo.mp4

[![Watch Demo Video](./assets/demo.mp4)](./assets/demo.mp4)

### Quick Preview

| Effect | Preview |
|--------|---------|
| **Snow** | ![Snow Effect](./assets/snow-preview.gif) |
| **Fireworks** | ![Fireworks Effect](./assets/fireworks-preview.gif) |
| **Petals** | ![Petals Effect](./assets/petals-preview.gif) |
| **Confetti** | ![Confetti Effect](./assets/confetti-preview.gif) |
| **Leaves** | ![Leaves Effect](./assets/leaves-preview.gif) |

> **Tip**: To create preview GIFs, use tools like:
> - [ScreenToGif](https://www.screentogif.com/) (Windows)
> - [Kap](https://getkap.co/) (macOS)
> - [Peek](https://github.com/phw/peek) (Linux)
> - Or record with OBS and convert with [FFmpeg](https://ffmpeg.org/)

### Live Demo

Try it yourself: [Live Demo on StackBlitz](https://stackblitz.com/edit/seasonal-effects-angular-demo)

> **Creating a Live Demo**:
> 1. Build the library: `npm run build`
> 2. Create a StackBlitz project with the example code
> 3. Import from the built distribution
> 4. Share the StackBlitz link here

## 🎯 Supported Angular Versions

- Angular 16.x
- Angular 17.x
- Angular 18.x+

Works with both zone.js and zoneless applications.

## 📦 Installation

```bash
npm install @seasonal-effects/angular
```

## 🚀 Quick Start

### Step 1: Add Provider

```typescript
// main.ts or app.config.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideSeasonalEffects } from '@seasonal-effects/angular';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideSeasonalEffects({
      country: 'US',
      enableHolidays: true,
      enableSeasons: true,
      intensity: 'medium',
    }),
  ],
});
```

### Step 2: Add Overlay Component

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { SeasonalEffectsOverlayComponent } from '@seasonal-effects/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SeasonalEffectsOverlayComponent],
  template: `
    <seasonal-effects-overlay />
    <h1>Welcome to my app!</h1>
    <!-- Your content -->
  `,
})
export class AppComponent {}
```

That's it! The library will automatically:
- Detect the current season based on your country
- Check for matching holidays
- Display appropriate effects

## 📖 Usage Examples

### Global Overlay

The simplest way to add effects across your entire application:

```html
<seasonal-effects-overlay />
```

### Inline Effects

Apply effects to specific elements:

```html
<div seasonalEffect="snow" style="position: relative; height: 400px;">
  <h2>Holiday Sale!</h2>
  <p>Check out our winter collection</p>
</div>
```

Available effects: `snow`, `fireworks`, `petals`, `confetti`, `leaves`

### Regional Examples

#### For French websites

```typescript
// main.ts
provideSeasonalEffects({
  country: 'FR',
  enableHolidays: true,
  enableSeasons: true,
  intensity: 'medium',
})
```

This will automatically show:
- Fireworks on Bastille Day (July 14)
- Petals on May 1st (lily of the valley tradition)
- Confetti during Fête de la Musique (June 21)
- And all other French holidays!

#### For Dutch websites

```typescript
// main.ts
provideSeasonalEffects({
  country: 'NL',
  enableHolidays: true,
  enableSeasons: true,
  intensity: 'high', // King's Day deserves it!
})
```

This will automatically show:
- Fireworks on Koningsdag (April 27) - the biggest celebration!
- Petals during tulip season (April-May)
- Confetti on Koningsdag Eve (April 26)
- Snow for Sinterklaas (December 5)
- And all other Dutch holidays!

## ⚙️ Configuration

### Complete Configuration Example

```typescript
provideSeasonalEffects({
  // Required: Country code for season/holiday detection
  country: 'US',

  // Enable/disable features
  enableHolidays: true,        // Default: true
  enableSeasons: true,         // Default: true

  // Effect selection mode
  mode: 'auto',                // 'auto' | 'manual' | 'disabled'

  // Whitelist specific effects (or use ['auto'] for all)
  effects: ['snow', 'fireworks'],

  // Intensity level
  intensity: 'medium',         // 'low' | 'medium' | 'high'

  // Accessibility
  respectReducedMotion: true,  // Default: true

  // Manual overrides
  seasonOverride: 'winter',    // Force a specific season
  dateOverride: new Date(),    // Test with specific date

  // Styling
  zIndex: 9999,                // Default: 9999

  // Debugging
  debug: false,                // Enable console logging
})
```

## 🌍 Countries & Seasons

### Supported Countries

The library includes metadata for 40+ countries with hemisphere information.

### Built-in Holidays

The library includes 50+ holidays across different countries with extensive support for French and Dutch regions:

#### Global Holidays
| Holiday | Date | Effect |
|---------|------|--------|
| New Year's Day | Jan 1 | Fireworks |
| New Year's Eve | Dec 31 | Fireworks |
| Easter Sunday | Easter | Petals |
| Christmas Season | Dec 20-26 | Snow |

#### France (FR)
| Holiday | Date | Effect |
|---------|------|--------|
| Épiphanie (Galette des Rois) | Jan 6 | Confetti |
| Fête du Travail (Labour Day) | May 1 | Petals |
| Victoire 1945 (VE Day) | May 8 | Fireworks |
| Fête de la Musique | Jun 21 | Confetti |
| Bastille Day | Jul 14 | Fireworks |
| Assomption (Assumption) | Aug 15 | Petals |
| Toussaint (All Saints Day) | Nov 1 | Leaves |
| Armistice 1918 | Nov 11 | Leaves |

#### Netherlands (NL)
| Holiday | Date | Effect |
|---------|------|--------|
| Tulip Season | Apr 1 - May 10 | Petals |
| Koningsdag Eve (King's Night) | Apr 26 | Confetti |
| Koningsdag (King's Day) | Apr 27 | Fireworks |
| Dodenherdenking (Remembrance) | May 4 | None |
| Bevrijdingsdag (Liberation Day) | May 5 | Fireworks |
| Prinsjesdag (Prince's Day) | 3rd Tue Sep | Confetti |
| Sinterklaas Arrival | Nov 12-17 | Confetti |
| Sinterklaasavond (St. Nicholas) | Dec 5 | Snow |

#### Belgium (BE)
| Holiday | Date | Effect |
|---------|------|--------|
| Fête du Travail / Dag van de Arbeid | May 1 | Petals |
| Belgian National Day | Jul 21 | Fireworks |
| Armistice Day | Nov 11 | Leaves |
| Sinterklaas / Saint-Nicolas | Dec 6 | Confetti |

#### Other Countries
| Country | Holiday | Date | Effect |
|---------|---------|------|--------|
| US | Independence Day | Jul 4 | Fireworks |
| US | Thanksgiving | 4th Thu Nov | Leaves |
| US | Halloween | Oct 31 | Leaves |
| JP | Hanami (Cherry Blossom) | Mar 20 - Apr 15 | Petals |
| JP | Golden Week | Apr 29 - May 5 | Confetti |
| DE | Oktoberfest Period | Sep 15 - Oct 5 | Leaves |
| DE | German Unity Day | Oct 3 | Confetti |
| BR | Carnival | Easter -47 days | Confetti |
| BR | Independence Day | Sep 7 | Fireworks |
| MX | Día de los Muertos | Nov 1-2 | Petals |
| MX | Independence Day | Sep 16 | Fireworks |
| CA | Canada Day | Jul 1 | Fireworks |
| AU | Australia Day | Jan 26 | Fireworks |
| IN | Holi (approximate) | Mar 1-15 | Confetti |
| IN | Independence Day | Aug 15 | Fireworks |
| CN | National Day | Oct 1 | Fireworks |

See [full documentation](./projects/seasonal-effects-angular/README.md) for complete API reference and advanced usage.

## 🎨 Available Effects

- **snow** - Falling snowflakes
- **fireworks** - Colorful explosions
- **petals** - Cherry blossom petals
- **confetti** - Celebration confetti
- **leaves** - Falling autumn leaves

## 🌐 SSR & Hydration

Fully compatible with Angular Universal:
- Safe for SSR - No DOM access during server rendering
- Hydration-aware - Effects start after hydration completes
- Platform guards throughout

## ♿ Accessibility

- Respects `prefers-reduced-motion`
- Effects marked `aria-hidden`
- No impact on page layout
- Pointer events disabled

## 📄 License

MIT