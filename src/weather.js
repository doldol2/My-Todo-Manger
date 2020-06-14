const coords = "COORDS",
  API_KEY = "719d1c056be00881eca6c6fd7fd38bad",
  weather = document.querySelector(".weather");

function getWeather(lat, lon) {
  const obj = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      //   console.log(json);
      const temp = json.main.temp,
        myPlace = json.name;
      // myWeather = json.weather[0].main;
      weather.innerText = `${temp}°C  At ${myPlace}`;
    });
}

function geoFail() {
  alert("Can't acces your location");
}

function saveCoords(obj) {
  localStorage.setItem(coords, JSON.stringify(obj));
}

function geoSucces(position) {
  const latitude = position.coords.latitude,
    longitude = position.coords.longitude,
    obj = {
      latitude,
      longitude,
    };
  saveCoords(obj);
  getWeather(latitude, longitude);
}

function getCoords() {
  navigator.geolocation.getCurrentPosition(geoSucces, geoFail);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(coords);
  if (loadedCoords == null) {
    getCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
