# European Weather Forecast App

A professional weather forecast webpage for European travel agency visitors to check 7-day forecasts for major European cities using the 7Timer API.

## Features

- 🌍 Weather forecasts for 10 major European cities
- 📅 7-day forecast timeline
- 🌡️ Temperature unit toggle (Celsius/Fahrenheit)
- 📱 Responsive design for all devices
- ⚡ Real-time data from 7Timer API (no API key required)
- 🎨 Professional travel agency themed design

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Installation & Setup

1. **Clone or download the project files** to your PC

2. **Install Node.js** (if not already installed):
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - Follow the installation wizard

3. **Open terminal/command prompt** in the project folder

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** and go to:
   ```
   http://localhost:5000
   ```

## Available Cities

- London, United Kingdom
- Paris, France
- Rome, Italy
- Berlin, Germany
- Madrid, Spain
- Amsterdam, Netherlands
- Vienna, Austria
- Prague, Czech Republic
- Barcelona, Spain
- Lisbon, Portugal

## Project Structure

```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Application pages
│   │   └── lib/         # Utilities and configurations
├── server/          # Backend Express server
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── vite.ts      # Vite integration
├── shared/          # Shared types and schemas
└── package.json     # Dependencies and scripts
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## API Endpoints

- `GET /api/weather/:city/:unit` - Get 7-day weather forecast
  - `:city` - City ID (london, paris, rome, etc.)
  - `:unit` - Temperature unit (celsius, fahrenheit)

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript
- **Weather API**: 7Timer (free, no API key required)
- **Build Tool**: Vite
- **State Management**: TanStack Query

## Troubleshooting

### Port Already in Use
If port 5000 is busy, the app will automatically use the next available port.

### Cannot Connect to Weather API
The app uses the free 7Timer API. If you get connection errors:
- Check your internet connection
- Try refreshing the page
- The API may be temporarily unavailable

### Installation Issues
- Make sure you have Node.js 18+ installed
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again
- Try using `npm ci` instead of `npm install`

## Customization

### Adding New Cities
Edit `client/src/pages/home.tsx` and add to the `cities` array:
```javascript
{ id: "cityname", name: "City Name", country: "Country", flag: "🇨🇴", lat: 0.0, lon: 0.0 }
```

### Changing Theme Colors
Edit the CSS variables in `client/src/index.css`:
```css
:root {
  --travel-blue: hsl(221, 83%, 53%);
  --sunset-orange: hsl(38, 92%, 50%);
  /* ... other colors */
}
```

## License

This project is open source and available under the MIT License.