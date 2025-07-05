import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plane, CloudSun, Shield, Route, Euro, Phone, Calendar, Bus, Search, MapPin, Thermometer, Sun, Cloud, CloudRain, Snowflake, Zap, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  lat: number;
  lon: number;
}

const cities: City[] = [
  { id: "london", name: "London", country: "United Kingdom", flag: "🇬🇧", lat: 51.5074, lon: -0.1278 },
  { id: "paris", name: "Paris", country: "France", flag: "🇫🇷", lat: 48.8566, lon: 2.3522 },
  { id: "rome", name: "Rome", country: "Italy", flag: "🇮🇹", lat: 41.9028, lon: 12.4964 },
  { id: "berlin", name: "Berlin", country: "Germany", flag: "🇩🇪", lat: 52.5200, lon: 13.4050 },
  { id: "madrid", name: "Madrid", country: "Spain", flag: "🇪🇸", lat: 40.4168, lon: -3.7038 },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", flag: "🇳🇱", lat: 52.3676, lon: 4.9041 },
  { id: "vienna", name: "Vienna", country: "Austria", flag: "🇦🇹", lat: 48.2082, lon: 16.3738 },
  { id: "prague", name: "Prague", country: "Czech Republic", flag: "🇨🇿", lat: 50.0755, lon: 14.4378 },
  { id: "barcelona", name: "Barcelona", country: "Spain", flag: "🇪🇸", lat: 41.3851, lon: 2.1734 },
  { id: "lisbon", name: "Lisbon", country: "Portugal", flag: "🇵🇹", lat: 38.7223, lon: -9.1393 }
];

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("london");
  const [temperatureUnit, setTemperatureUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const { toast } = useToast();

  const { data: weatherData, isLoading, error, refetch } = useQuery<WeatherData[]>({
    queryKey: [`/api/weather/${selectedCity}/${temperatureUnit}`],
    enabled: !!selectedCity,
  });

  const selectedCityData = cities.find(city => city.id === selectedCity);

  const getWeatherIcon = (weatherCode: string) => {
    switch (weatherCode) {
      case "clear": return <Sun className="w-10 h-10 text-yellow-500" />;
      case "pcloudy": return <CloudSun className="w-10 h-10 text-gray-400" />;
      case "mcloudy":
      case "cloudy": return <Cloud className="w-10 h-10 text-gray-500" />;
      case "lightrain":
      case "rain": return <CloudRain className="w-10 h-10 text-blue-500" />;
      case "snow": return <Snowflake className="w-10 h-10 text-blue-300" />;
      case "tstorm": return <Zap className="w-10 h-10 text-purple-500" />;
      default: return <Sun className="w-10 h-10 text-yellow-500" />;
    }
  };

  const handleGetForecast = () => {
    refetch();
  };

  const handleStartBooking = () => {
    toast({
      title: "Ready to Book!",
      description: "Our travel experts will contact you shortly to plan your perfect European adventure.",
    });
  };

  const handleContactAgent = () => {
    toast({
      title: "Contact Request Sent",
      description: "A travel specialist will reach out to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Plane className="text-travel-blue w-8 h-8" />
              <h1 className="text-2xl font-bold text-dark-gray">EuroTravel Pro</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-dark-gray hover:text-travel-blue transition-colors">Destinations</a>
              <a href="#" className="text-dark-gray hover:text-travel-blue transition-colors">Packages</a>
              <a href="#" className="text-dark-gray hover:text-travel-blue transition-colors">Weather</a>
              <Button className="bg-travel-blue text-white hover:bg-blue-700 font-medium">
                Book Now
              </Button>
            </nav>
            <Button variant="ghost" className="md:hidden text-dark-gray">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000" 
            alt="European cityscape panorama" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Plan Your Perfect<br />
              <span className="text-sunset-orange">European Adventure</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Check the 7-day weather forecast for major European cities and book your dream vacation with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="bg-sunset-orange text-white px-8 py-4 text-lg hover:bg-orange-600 shadow-lg"
                onClick={() => document.getElementById('weather-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Search className="w-5 h-5 mr-2" />
                Check Weather Now
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white px-8 py-4 text-lg hover:bg-white hover:text-blue-800"
                onClick={handleContactAgent}
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Weather Forecast Tool */}
      <section id="weather-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-dark-gray mb-4">
                <CloudSun className="inline w-10 h-10 text-travel-blue mr-3" />
                European Weather Forecast
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get accurate 7-day weather forecasts for major European destinations to plan your perfect trip.
              </p>
            </div>

            {/* City Selection */}
            <div className="bg-light-gray rounded-2xl p-8 mb-8 shadow-sm text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-end">
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-semibold text-dark-gray mb-2 text-left">
                    <MapPin className="inline w-4 h-4 mr-2" />
                    Select Destination
                  </label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-full h-14 p-4 bg-white border border-gray-300 rounded-xl text-lg font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.flag} {city.name}, {city.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-1 lg:col-span-1">
                  <label className="block text-sm font-semibold text-dark-gray mb-2 text-left">
                    <Thermometer className="inline w-4 h-4 mr-2" />
                    Temperature Unit
                  </label>
                  <Select value={temperatureUnit} onValueChange={(value) => setTemperatureUnit(value as "celsius" | "fahrenheit")}>
                    <SelectTrigger className="w-full h-14 p-4 bg-white border border-gray-300 rounded-xl text-lg font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celsius">Celsius (°C)</SelectItem>
                      <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3 lg:col-span-1 flex items-end">
                  <Button 
                    className="w-full h-14 bg-travel-blue text-white px-6 text-lg hover:bg-blue-700 shadow-lg whitespace-nowrap rounded-xl font-medium"
                    onClick={handleGetForecast}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5 mr-2" />
                    )}
                    Get Forecast
                  </Button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-xl">
                  <Loader2 className="animate-spin w-6 h-6 text-travel-blue mr-3" />
                  <span className="text-travel-blue font-medium text-lg">Loading weather forecast...</span>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-red-800">Unable to load weather data</h4>
                    <p className="text-red-600 mt-1">Please check your connection and try again, or contact our travel experts for assistance.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Weather Forecast Display */}
            {weatherData && Array.isArray(weatherData) && !isLoading && (
              <div className="space-y-4">
                {/* First 4 cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {weatherData.slice(0, 4).map((day: WeatherData, index: number) => (
                    <Card key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                      <CardContent className="p-3 md:p-4 lg:p-5 text-center">
                        <div className="text-xs md:text-sm font-semibold text-gray-500 mb-1 md:mb-2">{day.dayName}</div>
                        <div className="text-xs text-gray-400 mb-2 md:mb-3">{day.date}</div>
                        
                        <div className="mb-2 md:mb-3 flex justify-center">
                          <div className="scale-75 md:scale-90 lg:scale-100">
                            {getWeatherIcon(day.weatherCode)}
                          </div>
                        </div>
                        
                        <div className="mb-2 md:mb-3">
                          <div className="text-lg md:text-xl lg:text-2xl font-bold text-dark-gray">{day.temperature}°{temperatureUnit === 'celsius' ? 'C' : 'F'}</div>
                          <div className="text-xs md:text-sm text-gray-500">{day.tempRange}</div>
                        </div>
                        
                        <div className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2 line-clamp-2">{day.condition}</div>
                        
                        <div className="flex items-center justify-center text-xs text-gray-500">
                          <Droplets className="w-3 h-3 mr-1 text-blue-400" />
                          <span>{day.precipitation}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Last 3 cards centered */}
                {weatherData.length > 4 && (
                  <div className="flex justify-center">
                    <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl">
                      {weatherData.slice(4).map((day: WeatherData, index: number) => (
                        <Card key={index + 4} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                          <CardContent className="p-3 md:p-4 lg:p-5 text-center">
                            <div className="text-xs md:text-sm font-semibold text-gray-500 mb-1 md:mb-2">{day.dayName}</div>
                            <div className="text-xs text-gray-400 mb-2 md:mb-3">{day.date}</div>
                            
                            <div className="mb-2 md:mb-3 flex justify-center">
                              <div className="scale-75 md:scale-90 lg:scale-100">
                                {getWeatherIcon(day.weatherCode)}
                              </div>
                            </div>
                            
                            <div className="mb-2 md:mb-3">
                              <div className="text-lg md:text-xl lg:text-2xl font-bold text-dark-gray">{day.temperature}°{temperatureUnit === 'celsius' ? 'C' : 'F'}</div>
                              <div className="text-xs md:text-sm text-gray-500">{day.tempRange}</div>
                            </div>
                            
                            <div className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2 line-clamp-2">{day.condition}</div>
                            
                            <div className="flex items-center justify-center text-xs text-gray-500">
                              <Droplets className="w-3 h-3 mr-1 text-blue-400" />
                              <span>{day.precipitation}%</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Booking CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-400 to-yellow-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h3 className="text-4xl font-bold mb-6">Ready to Book Your European Adventure?</h3>
            <p className="text-xl mb-8 opacity-90">
              Now that you know the weather, let our travel experts help you plan the perfect itinerary and find the best deals for your dream vacation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-orange-500 px-8 py-4 text-lg hover:bg-gray-100 shadow-lg"
                onClick={handleStartBooking}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Start Planning Trip
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white px-8 py-4 text-lg hover:bg-white hover:text-orange-500"
                onClick={handleContactAgent}
              >
                <Bus className="w-5 h-5 mr-2" />
                Speak to Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-dark-gray mb-4">Why Choose EuroTravel Pro?</h3>
              <p className="text-xl text-gray-600">Your trusted partner for unforgettable European experiences</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-travel-blue" />
                </div>
                <h4 className="text-xl font-semibold text-dark-gray mb-3">Travel Protection</h4>
                <p className="text-gray-600">Comprehensive travel insurance and 24/7 support for peace of mind during your journey.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Route className="w-8 h-8 text-sunset-orange" />
                </div>
                <h4 className="text-xl font-semibold text-dark-gray mb-3">Custom Itineraries</h4>
                <p className="text-gray-600">Personalized travel plans crafted by local experts who know Europe inside and out.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Euro className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-dark-gray mb-3">Best Price Guarantee</h4>
                <p className="text-gray-600">We'll match any competitor's price and provide exclusive deals you won't find elsewhere.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-dark-gray text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Plane className="text-travel-blue w-8 h-8" />
                <h4 className="text-xl font-bold">EuroTravel Pro</h4>
              </div>
              <p className="text-gray-300 mb-4">Your gateway to extraordinary European adventures. Expert planning, unbeatable prices, unforgettable memories.</p>
              <div className="flex space-x-4">
                <div className="w-6 h-6 cursor-pointer hover:text-travel-blue transition-colors">📘</div>
                <div className="w-6 h-6 cursor-pointer hover:text-travel-blue transition-colors">🐦</div>
                <div className="w-6 h-6 cursor-pointer hover:text-travel-blue transition-colors">📷</div>
                <div className="w-6 h-6 cursor-pointer hover:text-travel-blue transition-colors">📺</div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg mb-4">Destinations</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Western Europe</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Eastern Europe</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mediterranean</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Scandinavia</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg mb-4">Services</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Group Tours</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Flight Booking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hotel Reservations</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-300">
                <li>📞 +1 (555) 123-4567</li>
                <li>✉️ info@eurotravelpro.com</li>
                <li>📍 123 Travel Street, NY</li>
                <li className="text-sm">24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EuroTravel Pro. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
