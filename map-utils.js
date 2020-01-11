const mapBoxApiKey =
  'pk.eyJ1IjoiYnJvZGllMTIyIiwiYSI6ImNrNTAxNXc5ejBoYXIza3AzNXg5dDZnenIifQ.sLBoYFj2mNxDByM4RDeaYg';
const openWeatherApiKey = '25e3c53af63257212b0c8d1309205daa';

var mymap = L.map('mapid').setView([30.33, -81.66], 13);

L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxApiKey}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token'
  }
).addTo(mymap);

const Temperature = L.tileLayer(
  `http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${openWeatherApiKey}`,
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://owm.io">VANE</a>',
    id: 'temp'
  }
);
const Precipitation = L.tileLayer(
  `http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${openWeatherApiKey}`,
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://owm.io">VANE</a>'
  }
);
const Wind = L.tileLayer(
  `http://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${openWeatherApiKey}`,
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://owm.io">VANE</a>'
  }
);
const Pressure = L.tileLayer(
  `http://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${openWeatherApiKey}`,
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://owm.io">VANE</a>'
  }
);
const Clouds = L.tileLayer(
  `http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${openWeatherApiKey}`,
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://owm.io">VANE</a>'
  }
);

var overlays = {
  Temperature,
  Precipitation,
  Clouds,
  Pressure,
  Wind
};
L.control.layers(overlays, null, { collapsed: false }).addTo(mymap);
