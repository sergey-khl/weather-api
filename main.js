//QUERY selector
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");

// app data
const weather = {};

weather.temperature = {
}

//kelvin converter value
const KELVIN = 273;
//Product key from API
const key = "5e56deef12d1454ff584dbb6e5f32d54";

//if supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p><img src='icons/sad.png'/> IT WONT WORK!!!!!</p>"
}

//set user positiion
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
    console.log(position);
}

//show error when block
function showError(){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p><img src='icons/sad.png'/> IT WONT WORK!!!</p>"
}

//get api data
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.icon = data.weather[0].icon;
    }).then(() => {
        displayWeather();
    })
} 


//display weather to UI
function displayWeather(){
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    iconElement.innerHTML = `<img src="icons/${weather.icon}.png"/>`
}

//reload on click
window.addEventListener("click", (e) => {
    location.reload();
})