# Basic Usage Example

This example demonstrates the basic usage of `@seasonal-effects/angular`.

## Running the Example

1. Build the library:
   ```bash
   npm run build
   ```

2. Install the built library in this example:
   ```bash
   cd examples/basic-usage
   npm install ../../dist/seasonal-effects-angular
   npm install
   npm start
   ```

3. Open http://localhost:4200

## What's Demonstrated

- Global overlay for automatic seasonal/holiday effects
- Inline directive usage for localized effects
- Multiple effect types (snow, fireworks, petals)
- Responsive design
- SSR-safe implementation

## Code Structure

- `main.ts` - Provider configuration
- `app.component.ts` - Component with effects usage
