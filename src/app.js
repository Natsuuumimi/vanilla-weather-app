
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

//current city&temp
function displayWeather(response) {
	let cityElement = document.querySelector("#city");
	let temp = document.querySelector("#temp");
	let temperature = Math.round(response.data.main.temp);
	let description = document.querySelector("#status");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
	let currentCity = response.data.name;

	temp.innerHTML = `${temperature}`;
	cityElement.innerHTML = `${currentCity}`;
	description.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org.img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
//display the city & locationTemp
function searchCity(city) {
	let apiKey = "023ad625bfdcd400727da5f0c2fed554";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeather);
}
function search(event) {
	event.preventDefault();
	let city = document.querySelector("#city-input").value;
	searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

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

let button = document.querySelector("#b1");
button.addEventListener("click", getCurrentPosition);
