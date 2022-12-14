function displayweather(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

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
}

function MainSearch(city) {
  let apiKey = "cbccedc1bb4c0ccce0b1a3f844a6a2fb";
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

MainSearch("Tokyo");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "cbccedc1bb4c0ccce0b1a3f844a6a2fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forcast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forcast.forEach(function (Fday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(Fday.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${Fday.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            Fday.temp.max
          )}??</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            Fday.temp.min
          )}??</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
