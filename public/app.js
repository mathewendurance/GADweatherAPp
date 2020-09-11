const api = {
  key: "3a7de2fdc2c66b06d512a3bbff2da135",
  base: "https://api.openweathermap.org/data/2.5/",
}
let appId = '3a7de2fdc2c66b06d512a3bbff2da135';
let units = 'imperial'; // other option is metric
let searchMethod; // q means searching as a string.



function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
      .then((result) => {
          return result.json();
      }).then((res) => {
          init(res);
  });
}


function init(resultFromServer) {
switch (resultFromServer.weather[0].main) {
    case 'Clear':
        document.body.style.backgroundImage = "url('icon/image/blue_sky.jpg')";
        break;
    
    case 'Clouds':
        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        break;

    case 'Rain':
    case 'Drizzle':
    case 'Mist':
        document.body.style.backgroundImage = "url('icon/images/cloud.jpg')";
        break;
    
    case 'Thunderstorm':
        document.body.style.backgroundImage = "url('icon/image/card.jpg')";
        break;
    
    case 'Snow':
        document.body.style.backgroundImage = "url('icon/image/road.jpg')";
        break;

    default:
        break;
}   
let weatherIcon = document.getElementById('documentIconImg');
weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

let resultDescription = resultFromServer.weather[0].description;
weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
windSpeedElement.innerHTML = 'Winds at  ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
cityHeader.innerHTML = resultFromServer.name;
humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity +  '%';

setPositionForWeatherInfo();
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;


}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
