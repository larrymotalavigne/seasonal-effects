import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SeasonalEffectsOverlayComponent,
  SeasonalEffectDirective,
} from '@seasonal-effects/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SeasonalEffectsOverlayComponent, SeasonalEffectDirective],
  template: `
    <!-- Global overlay for automatic seasonal/holiday effects -->
    <seasonal-effects-overlay />

    <div class="app-container">
      <header>
        <h1>@seasonal-effects/angular Demo</h1>
        <p>Production-ready seasonal effects for Angular</p>
      </header>

      <main>
        <section class="feature-section">
          <h2>Global Effects</h2>
          <p>
            The overlay above automatically displays effects based on:
          </p>
          <ul>
            <li>Current season (hemisphere-aware)</li>
            <li>Active holidays for your country</li>
            <li>Your configuration preferences</li>
          </ul>
        </section>

        <section class="feature-section snow-demo" seasonalEffect="snow">
          <h2>Snow Effect</h2>
          <p>This container has a localized snow effect using the directive.</p>
          <code>&lt;div seasonalEffect="snow"&gt;...&lt;/div&gt;</code>
        </section>

        <section class="feature-section fireworks-demo" seasonalEffect="fireworks">
          <h2>Fireworks Effect</h2>
          <p>Perfect for celebrations and special occasions!</p>
          <code>&lt;div seasonalEffect="fireworks"&gt;...&lt;/div&gt;</code>
        </section>

        <section class="feature-section petals-demo" seasonalEffect="petals">
          <h2>Petals Effect</h2>
          <p>Beautiful cherry blossom petals for spring.</p>
          <code>&lt;div seasonalEffect="petals"&gt;...&lt;/div&gt;</code>
        </section>

        <section class="feature-section">
          <h2>Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <h3>🌍 Hemisphere-Aware</h3>
              <p>Automatic season detection based on country</p>
            </div>
            <div class="feature-card">
              <h3>🎆 Holiday Effects</h3>
              <p>Built-in support for 30+ holidays</p>
            </div>
            <div class="feature-card">
              <h3>🚀 SSR-Safe</h3>
              <p>Full Angular Universal support</p>
            </div>
            <div class="feature-card">
              <h3>⚡ Performant</h3>
              <p>Canvas-based 60fps animations</p>
            </div>
            <div class="feature-card">
              <h3>♿ Accessible</h3>
              <p>Respects prefers-reduced-motion</p>
            </div>
            <div class="feature-card">
              <h3>📦 Tree-Shakable</h3>
              <p>Only bundle what you use</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Built with @seasonal-effects/angular</p>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    header {
      text-align: center;
      color: white;
      margin-bottom: 3rem;
    }

    h1 {
      font-size: 3rem;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    header p {
      font-size: 1.2rem;
      margin-top: 0.5rem;
      opacity: 0.9;
    }

    .feature-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .snow-demo,
    .fireworks-demo,
    .petals-demo {
      min-height: 300px;
      background: linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%);
    }

    .fireworks-demo {
      background: linear-gradient(180deg, #1a237e 0%, #283593 100%);
      color: white;
    }

    .petals-demo {
      background: linear-gradient(180deg, #fce4ec 0%, #f8bbd0 100%);
    }

    h2 {
      margin-top: 0;
      color: #333;
    }

    .fireworks-demo h2,
    .fireworks-demo p,
    .fireworks-demo code {
      color: white;
    }

    code {
      background: rgba(0, 0, 0, 0.05);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      display: inline-block;
      margin-top: 0.5rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .feature-card {
      padding: 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
      text-align: center;
    }

    .feature-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
    }

    .feature-card p {
      margin: 0;
      opacity: 0.9;
    }

    footer {
      text-align: center;
      color: white;
      padding: 2rem 0;
      opacity: 0.8;
    }

    ul {
      line-height: 1.8;
    }
  `],
})
export class AppComponent {
  title = 'Seasonal Effects Demo';
}
