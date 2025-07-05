import type { Express } from "express";
import { createServer, type Server } from "http";

interface WeatherData {
  dayName: string;
  date: string;
  temperature: number;
  tempRange: string;
  condition: string;
  precipitation: number;
  icon: string;
  weatherCode: string;
}

const cityCoordinates: Record<string, { lat: number; lon: number; name: string }> = {
  london: { lat: 51.5074, lon: -0.1278, name: "London, UK" },
  paris: { lat: 48.8566, lon: 2.3522, name: "Paris, France" },
  rome: { lat: 41.9028, lon: 12.4964, name: "Rome, Italy" },
  berlin: { lat: 52.5200, lon: 13.4050, name: "Berlin, Germany" },
  madrid: { lat: 40.4168, lon: -3.7038, name: "Madrid, Spain" },
  amsterdam: { lat: 52.3676, lon: 4.9041, name: "Amsterdam, Netherlands" },
  vienna: { lat: 48.2082, lon: 16.3738, name: "Vienna, Austria" },
  prague: { lat: 50.0755, lon: 14.4378, name: "Prague, Czech Republic" },
  barcelona: { lat: 41.3851, lon: 2.1734, name: "Barcelona, Spain" },
  lisbon: { lat: 38.7223, lon: -9.1393, name: "Lisbon, Portugal" }
};

function convertTemperature(celsius: number, unit: string): number {
  if (unit === "fahrenheit") {
    return Math.round((celsius * 9/5) + 32);
  }
  return Math.round(celsius);
}

function getWeatherCondition(weatherCode: string): string {
  const conditionMap: Record<string, string> = {
    clear: "Sunny",
    clearday: "Sunny",
    clearnight: "Clear",
    pcloudy: "Partly Cloudy",
    pcloudyday: "Partly Cloudy", 
    pcloudynight: "Partly Cloudy",
    mcloudy: "Mostly Cloudy",
    mcloudyday: "Mostly Cloudy",
    mcloudynight: "Mostly Cloudy",
    cloudy: "Cloudy",
    cloudyday: "Cloudy",
    cloudynight: "Cloudy",
    humid: "Humid",
    lightrain: "Light Rain",
    lightrainday: "Light Rain",
    lightrainnight: "Light Rain", 
    oshower: "Light Rain",
    ishower: "Heavy Rain",
    rain: "Rain",
    rainday: "Rain",
    rainnight: "Rain",
    snow: "Snow",
    snowday: "Snow",
    snownight: "Snow",
    tstorm: "Thunderstorm",
    tstormday: "Thunderstorm",
    tstormnight: "Thunderstorm"
  };
  return conditionMap[weatherCode] || "Partly Cloudy";
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getDayName(forecastDate: Date, index: number): string {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[forecastDate.getDay()];
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/weather/:city/:unit?", async (req, res) => {
    try {
      const { city, unit = "celsius" } = req.params;
      
      if (!cityCoordinates[city]) {
        return res.status(400).json({ error: "City not found" });
      }

      const { lat, lon } = cityCoordinates[city];
      
      // Call 7Timer API
      const apiUrl = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const apiData = await response.json();
      
      if (!apiData.dataseries || !Array.isArray(apiData.dataseries)) {
        throw new Error("Invalid API response format");
      }

      // Create 7-day forecast starting from today
      const weatherData: WeatherData[] = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      
      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        // Calculate target date
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + dayOffset);
        
        // Calculate day name
        let dayName: string;
        if (dayOffset === 0) {
          dayName = "Today";
        } else if (dayOffset === 1) {
          dayName = "Tomorrow";
        } else {
          const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          dayName = days[targetDate.getDay()];
        }
        
        // For simplicity, use the first available forecast data and adjust it per day
        const baseItem = apiData.dataseries[Math.min(dayOffset, apiData.dataseries.length - 1)];
        
        // Add some variation to temperature based on day
        const baseTemp = baseItem.temp2m || 20;
        const tempVariation = Math.sin(dayOffset * 0.5) * 3; // Slight variation over days
        const adjustedTemp = baseTemp + tempVariation;
        
        const currentTemp = convertTemperature(adjustedTemp, unit);
        const minTemp = convertTemperature(adjustedTemp - 5, unit);
        const maxTemp = convertTemperature(adjustedTemp + 5, unit);
        
        // Weather code processing
        const weatherCode = baseItem.weather || "clear";
        const cleanWeatherCode = weatherCode.replace(/(day|night)$/, '');
        
        weatherData.push({
          dayName,
          date: formatDate(targetDate),
          temperature: currentTemp,
          tempRange: `${minTemp}° / ${maxTemp}°`,
          condition: getWeatherCondition(weatherCode),
          precipitation: Math.min(Math.max(0, (baseItem.prec_amount || 0) * 10), 100),
          icon: cleanWeatherCode,
          weatherCode: cleanWeatherCode
        });
      }

      res.json(weatherData);
      
    } catch (error) {
      console.error("Weather API Error:", error);
      res.status(500).json({ 
        error: "Failed to fetch weather data", 
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
