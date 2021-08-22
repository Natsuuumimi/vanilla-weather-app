let now = new Date();

let currentDate = document.querySelector("#date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
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
let day = days[now.getDay()];

currentDate.innerHTML = `${day} ${hours}:${minutes}`;

//current city&temp
function displayWeather(response) {
	let cityElement = document.querySelector("#city");
	let temp = document.querySelector("#temp");
	let temperature = Math.round(response.data.main.temp);
	let description = document.querySelector("#status");
	let currentCity = response.data.name;
	temp.innerHTML = `${temperature}`;
	cityElement.innerHTML = `${currentCity}`;
	description.innerHTML = response.data.weather[0].main;
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
