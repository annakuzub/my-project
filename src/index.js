//Date and time//
let current = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesdey",
  "Thursday",
  "Friday",
  "Saturday",
];
let Hours = current.getHours();
if (Hours < 10) {
  Hours = `0${Hours}`;
}
let Minutes = current.getMinutes();
if (Minutes < 10) {
  Minutes = `0${Minutes}`;
}
let day = days[current.getDay()];
let dayNow = document.querySelector("#day-now");
dayNow.innerHTML = `${day}, ${Hours}:${Minutes}`;

//city//
function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  getTemperature(cityInput.value);
}

//city//
function cityKyiv(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityKyiv");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput}`;

  getTemperature(cityInput);
}

let formSearch = document.querySelector("#form-search");
formSearch.addEventListener("submit", citySearch);

let hrefKyiv = document.querySelector("#cityKyiv");
hrefKyiv.addEventListener("click", cityKyiv);

// Temperature city input
function getTemperature(cityName) {
  let apiKey = "237d6b594df6d6326579fae6044c4fb7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
getTemperature("Kyiv");

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let cityTemperat = document.querySelector("#temperature");
  cityTemperat.innerHTML = ` ${temperature} `;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
//current city
function currentCityTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "237d6b594df6d6326579fae6044c4fb7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let citycurrentTemperature = Math.round(response.data.main.temp);
  console.log(response.data.name);
  let cityCur = response.data.name;
  let cityCurrentTemperat = document.querySelector("#temperature");
  cityCurrentTemperat.innerHTML = ` ${citycurrentTemperature} `;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityCur}`;
}

function cityCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCityTemperature);
}

let formCurrent = document.querySelector("#current-city");
formCurrent.addEventListener("click", cityCurrent);

// °C and °F//

function cityTemperatureF(event) {
  event.preventDefault();
  let cityTempF = document.querySelector(".temperature");
  cityTempF.innerHTML = `${Math.round((cityTempF.innerHTML * 9) / 5 + 32)}`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", cityTemperatureF);

let cityTempC = null;

function cityTemperatureC(event) {
  event.preventDefault();
  let cityTempC = document.querySelector(".temperature");
  cityTempC.innerHTML = `${Math.round(((cityTempC.innerHTML - 32) * 5) / 9)}`;
}

let celsiumLink = document.querySelector("#celsium-link");
celsiumLink.addEventListener("click", cityTemperatureC);
// forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/01d@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">18 °C</span>
        <span class="weather-forecast-temperature-min">12 °C</span>
      </div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
displayForecast();
