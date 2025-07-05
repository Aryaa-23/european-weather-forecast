// Simple test server for European Weather Forecast
const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Simple weather data for testing
const weatherData = {
  london: [
    { dayName: "Today", date: "Jul 5", temperature: 21, condition: "Cloudy" },
    { dayName: "Tomorrow", date: "Jul 6", temperature: 18, condition: "Partly Cloudy" },
    { dayName: "Sunday", date: "Jul 7", temperature: 22, condition: "Clear" }
  ]
};

// API endpoint
app.get('/api/weather/:city/:unit', (req, res) => {
  const { city } = req.params;
  const data = weatherData[city] || weatherData.london;
  res.json(data);
});

// Serve a simple HTML page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>European Weather Forecast</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f0f9ff; }
        .container { max-width: 800px; margin: 0 auto; }
        .header { text-align: center; color: #1e40af; margin-bottom: 30px; }
        .weather-card { background: white; padding: 20px; margin: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .button { background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; margin: 5px; }
        .button:hover { background: #2563eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌍 European Weather Forecast</h1>
          <p>Your trusted travel companion for European adventures</p>
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
          <button class="button" onclick="loadWeather('london')">London</button>
          <button class="button" onclick="loadWeather('paris')">Paris</button>
          <button class="button" onclick="loadWeather('rome')">Rome</button>
        </div>
        
        <div id="weather-results"></div>
      </div>
      
      <script>
        async function loadWeather(city) {
          try {
            const response = await fetch('/api/weather/' + city + '/celsius');
            const data = await response.json();
            
            const html = data.map(day => 
              '<div class="weather-card">' +
              '<h3>' + day.dayName + ' (' + day.date + ')</h3>' +
              '<p><strong>' + day.temperature + '°C</strong> - ' + day.condition + '</p>' +
              '</div>'
            ).join('');
            
            document.getElementById('weather-results').innerHTML = html;
          } catch (error) {
            document.getElementById('weather-results').innerHTML = '<p>Error loading weather data</p>';
          }
        }
        
        // Load London weather by default
        loadWeather('london');
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('European Weather Forecast running at http://localhost:' + PORT);
  console.log('Open your browser and visit the URL above!');
});