//format time
function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	hours = ("0" + hours).slice(-2);
	let minutes = date.getMinutes();
	minutes = ("0" + minutes).slice(-2);
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
 let date = new Date(timestamp * 1000);
 let day = date.getDay();
 let days = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];

 return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index > 0 && index < 6) {
			forecastHTML =
				forecastHTML +
				`
      <div class="col">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
					forecastDay.weather[0].icon
				}@2x.png" alt="" width="44px">
         <div class="temperature2">
            <span class="forecast-max">${Math.round(
							forecastDay.temp.max
						)}°</span>
            <span class="forecast-min">${Math.round(
							forecastDay.temp.min
						)}°</span>
         </div>
      </div>
  `;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

//5days forecast display
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "023ad625bfdcd400727da5f0c2fed554";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//current city&temp
function displayWeather(response) {
	let cityElement = document.querySelector("#city");
	let temp = document.querySelector("#temp");
	let description = document.querySelector("#status");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let dateElement = document.querySelector("#date");
	let iconElement = document.querySelector("#icon");
	let currentCity = response.data.name;

	celsiusTemperature = response.data.main.temp;

	temp.innerHTML = Math.round(celsiusTemperature);
	cityElement.innerHTML = response.data.name;
	description.innerHTML = response.data.weather[0].main;
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

//display the city & locationTemp
function search(city) {
	let apiKey = "023ad625bfdcd400727da5f0c2fed554";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	search(cityInputElement.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Tokyo");

function searchPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = "023ad625bfdcd400727da5f0c2fed554";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchPosition);
}

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temp = document.querySelector("#temp");
	//remove the active class from the celsius link
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheirTemperature = (celsiusTemperature * 9) / 5 + 32;
	temp.innerHTML = Math.round(fahrenheirTemperature);
}

function displayCelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temp = document.querySelector("#temp");
	temp.innerHTML = Math.round(celsiusTemperature);
}

let button = document.querySelector("#b1");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;
