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
let date = current.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[current.getMonth()];
let dayNow = document.querySelector("#day-now");
dayNow.innerHTML = `${month} ${date},${day}, ${Hours}:${Minutes}`;
function formatDay(timestemp) {
  let date = new Date(timestemp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//city//
function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  getTemperature(cityInput.value);
}

let formSearch = document.querySelector("#form-search");
formSearch.addEventListener("submit", citySearch);

// Temperature city input
function getTemperature(cityName) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}`;
  let apiKey = "237d6b594df6d6326579fae6044c4fb7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
getTemperature("Kyiv");

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "237d6b594df6d6326579fae6044c4fb7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  getForecast(response.data.coord);
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
  getForecast(response.data.coord);
}

function cityCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCityTemperature);
}

let formCurrent = document.querySelector("#current-city");
formCurrent.addEventListener("click", cityCurrent);

// forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )} °</span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )} °</span>
      </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
