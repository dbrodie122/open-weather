const form = document.getElementById('search-form');

// Radio Button State
let placeNameRadio = true;
let zipcodeRadio = false;
// ========================

function updateMapCoords({ lat, lon }) {
  mymap.setView([lat, lon], 12);
}

function setUrl(query) {
  if (placeNameRadio) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&APPID=${openWeatherApiKey}`;
  }
  if (zipcodeRadio) {
    return `http://api.openweathermap.org/data/2.5/weather?zip=${query},us&units=imperial&APPID=${openWeatherApiKey}`;
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
