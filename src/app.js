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
  iconElement.setAttribute =
    ("src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute = ("alt", response.data.weather[0].description);
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

//let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
//let cityname = "Tehran";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;

//console.log(apiUrl);
//axios.get(apiUrl).then(displayweather);

function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
}

//let form = document.querySelector("#search-form");
//form.addEventListener("submit", search);

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

//function formatDay(timestamp) {
// let date = new Date(timestamp * 1000);
// let day = date.getDay();
//let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// return days[day];
// }
