var cities = [];
var searchInput;
var idCounter = 0;
var apiKey = 'f1a95fc68a0873c27d61c20f9a6dd653';
// var apiKey = 'add5dcf52ad731b8b727d48e825d9251';
var lat;
var lon;
var date = moment().format("MM/DD/YYYY");
var savedCities = JSON.parse(localStorage.getItem('cities'));

function init(){



// get city coordinates
function findCity(searchInput){
        var url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&appid=' + apiKey;
        fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            lat = data[0].lat;
            lon = data[0].lon;
            getWeather(lat,lon,searchInput);
        })
}

// plot coordinates
function getWeather(lat, lon, searchInput) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            displayWeather(data, searchInput);
            console.log(data)
        })
}

// display data html 
function displayWeather(data, searchInput){
                // create current weather section
                var current = document.getElementById('current');
                current.innerHTML = '';

                var currentHeader = document.createElement('h2');
                var currentTemp = document.createElement('p');
                var currentHumid = document.createElement('p');
                var currentWind = document.createElement('p');
                var currentUvi = document.createElement('p');
                var currentUvIndex = document.createElement('p');
                var currentUviBox = document.createElement('div');
                
                var iconImg = document.createElement('img');
                iconImg.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.daily[0].weather[0].icon + '@2x.png');
                iconImg.width = '45';
                iconImg.height = '45';

                // current.appendChild(iconImg);
                currentHeader.textContent = searchInput + ' (' + date + ')';
                currentTemp.innerHTML = 'Temp: ' + data.daily[0].temp.day;
                currentHumid.textContent = 'Humidity: ' + data.daily[0].humidity + '%';
                currentWind.textContent = 'Wind: ' + data.daily[0].wind_speed + ' MPH';
                currentUvi.textContent = 'UV Index: ';
                currentUvIndex.textContent = data.daily[0].uvi;

                if (currentUvIndex.textContent < 3){
                    currentUvIndex.style.color = 'white';
                    currentUviBox.style.display = 'inline-block';
                    currentUviBox.style.backgroundColor = 'green';
                    currentUviBox.style.borderRadius = '10px';
                    currentUvIndex.style.marginBottom = '0%';
                    currentUvIndex.style.marginRight = '10px';

                } else if (currentUvIndex.textContent < 6){
                    currentUviBox.style.display = 'inline-block';
                    currentUviBox.style.backgroundColor = 'yellow';
                    currentUviBox.style.borderRadius = '10px';
                    currentUvIndex.style.marginBottom = '0%';
                    currentUvIndex.style.marginRight = '10px';
                } else {
                    currentUviBox.style.display = 'inline-block';
                    currentUviBox.style.backgroundColor = 'red';
                    currentUviBox.style.borderRadius = '10px';
                    currentUvIndex.style.marginBottom = '0%';
                    currentUvIndex.style.marginRight = '10px';
                }

                current.appendChild(currentHeader);
                current.appendChild(currentTemp);
                current.appendChild(currentHumid);
                current.appendChild(currentWind);
                current.appendChild(currentUvi);
                currentUvi.appendChild(currentUviBox);
                currentUviBox.appendChild(currentUvIndex);
                currentHeader.appendChild(iconImg);

                var forecast = document.getElementById('forecast');
                forecast.innerHTML = '';
                for(let i = 1; i < data.daily.length - 2; i++){
                    
                    // create forcast html 
                    var forecastDiv = document.createElement('div');
                    var forecastTemp = document.createElement('p');
                    var forecastHumid = document.createElement('p');
                    var forecastWind = document.createElement('p');
                    var forecastUvi = document.createElement('p');
                    var forecastDate = document.createElement('h4'); 
    
                    // create forcast data    
                    forecastTemp.textContent = 'Temp: ' + data.daily[i].temp.day;
                    forecastHumid.textContent = 'Humidity: ' + data.daily[i].humidity + '%';
                    forecastWind.textContent = 'Wind: ' + data.daily[i].wind_speed + ' MPH';
                    forecastUvi.textContent = 'UV Index: ' + data.daily[i].uvi;
                    forecastDate.textContent = moment(data.daily[i].dt,'X').format('MM/DD/YYYY');

                    var forecastIcon = document.createElement('img');
                    forecastIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png');
                    forecastIcon.width = '40';
                    forecastIcon.height = '40';

                    // append data 
                    forecast.appendChild(forecastDiv);
                    forecastDiv.appendChild(forecastDate);
                    forecastDiv.appendChild(forecastIcon);
                    forecastDiv.appendChild(forecastTemp);
                    forecastDiv.appendChild(forecastHumid);
                    forecastDiv.appendChild(forecastWind);
                    forecastDiv.appendChild(forecastUvi);

                    forecastDiv.setAttribute('class', 'col');
                }
}

function render(){
    for (let i = 0; i < savedCities.length; i++){
        city = savedCities[i];
        createQuickSearch(city);
        // findCity(city);
    }
}

// for (let i = 0; i < savedCities.length; i++){
//     city = savedCities[i];
//     createQuickSearch(city);
//     // findCity(city);
// }

// search input and button
$('#search-btn').on('click', function(event){
    event.preventDefault();
    searchInput = $('#city').val();
    document.getElementById('weather').style.display = 'block';
    createQuickSearch(searchInput);
    findCity(searchInput);

});

// quick search buttons
function createQuickSearch(searchInput){
    for(let i = 0; i < cities.length; i++){
        if (searchInput === cities[i]){
            findCity(searchInput);
            return;
        }
    }
    var quickSearch = document.getElementById('quick-search');
    var addCity = document.createElement('button');
    addCity.textContent = searchInput;
    quickSearch.appendChild(addCity);
    if (addCity){
        idCounter++;
        addCity.setAttribute('id', idCounter);
        cities.push(addCity.textContent);
        localStorage.setItem('cities', JSON.stringify(cities));
    }
    var getIdCounter = document.getElementById(idCounter);
    getIdCounter.addEventListener('click', function(event){
        event.preventDefault();
        searchInput = this.textContent;
        findCity(searchInput);
    })      
}
render();
}
init();
