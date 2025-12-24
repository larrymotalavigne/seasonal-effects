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
      debug: true,
    }),
  ],
}).catch((err) => console.error(err));
