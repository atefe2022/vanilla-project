function displayweather(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(CelsiusTemp);

  CelsiusTemp = response.data.main.temp;

  let citynameElement = document.querySelector("#cityname");
  citynameElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = FormatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function FormatDate(TimeStamp) {
  let date = new Date(TimeStamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hour}:${minute}`;
}

function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
}

function MainSearch(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayweather);
}

function Search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  MainSearch(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", Search);

MainSearch("New York");

function ShowfahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  CelsiusLink.classList.remove("active");

  let fahrenheitTemp = (CelsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function ShowCelTemp(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  CelsiusLink.classList.add("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(CelsiusTemp);
}

displayForecast();
let CelsiusTemp = null;

let fahrenheitLink = document.querySelector("#Far-link");
fahrenheitLink.addEventListener("click", ShowfahrenheitTemp);

let CelsiusLink = document.querySelector("#Cel-link");
CelsiusLink.addEventListener("click", ShowCelTemp);

//function formatDay(timestamp) {
// let date = new Date(timestamp * 1000);
// let day = date.getDay();
//let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// return days[day];
// }

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
