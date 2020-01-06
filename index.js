const apiKey = '25e3c53af63257212b0c8d1309205daa';
const mapBoxApiKey =
  'pk.eyJ1IjoiYnJvZGllMTIyIiwiYSI6ImNrNTAxNXc5ejBoYXIza3AzNXg5dDZnenIifQ.sLBoYFj2mNxDByM4RDeaYg';
const form = document.getElementById('search-form');

// ======================== MAP STUFF ========================
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
  `http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://owm.io">VANE</a>',
    id: 'temp'
  }
);
const Precipitation = L.tileLayer(
  `http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://owm.io">VANE</a>'
  }
);
const Wind = L.tileLayer(
  `http://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`,
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://owm.io">VANE</a>'
  }
);
const Pressure = L.tileLayer(
  `http://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${apiKey}`,
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://owm.io">VANE</a>'
  }
);
const Clouds = L.tileLayer(
  `http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
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

// ======================== ^^ MAP STUFF ^^ ========================

// Radio Button State
let placeNameRadio = true;
let zipcodeRadio = false;
// ========================

function updateMapCoords({ lat, lon }) {
  mymap.setView([lat, lon], 12);
}

function setUrl(query) {
  if (placeNameRadio) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&APPID=${apiKey}`;
  }
  if (zipcodeRadio) {
    return `http://api.openweathermap.org/data/2.5/weather?zip=${query},us&units=imperial&APPID=${apiKey}`;
  }
}

async function getWeatherData(query) {
  let url = setUrl(query);

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  renderWeatherData(data);
  updateMapCoords(data.coord);
}

function handleFormSubmit(e) {
  e.preventDefault();
  let searchValue = e.target['search-box'].value;
  placeNameRadio = e.target.placename.checked;
  zipcodeRadio = e.target.zipcode.checked;
  getWeatherData(searchValue);
  searchValue = '';
}

form.addEventListener('submit', handleFormSubmit);
getWeatherData('jacksonville');
