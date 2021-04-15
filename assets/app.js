var searchInput;
var apiKey = 'f1a95fc68a0873c27d61c20f9a6dd653';
var lat;
var lon;
var date = moment().format("MM/DD/YYYY");


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
                
                var iconImg = document.createElement('img');
                iconImg.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.daily[0].weather[0].icon + '@2x.png');
                iconImg.width = '45';
                iconImg.height = '45';

                // current.appendChild(iconImg);
                currentHeader.textContent = searchInput + ' (' + date + ')';
                currentTemp.innerHTML = 'Temp: ' + data.daily[0].temp.day;
                currentHumid.textContent = 'Humidity: ' + data.daily[0].humidity + '%';
                currentWind.textContent = 'Wind: ' + data.daily[0].wind_speed + ' MPH';
                currentUvi.textContent = 'UV Index: ' + data.daily[0].uvi;
                
                current.appendChild(currentHeader);
                current.appendChild(currentTemp);
                current.appendChild(currentHumid);
                current.appendChild(currentWind);
                current.appendChild(currentUvi);
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
                }
}

// search input and button
$('#search-btn').on('click', function(event){
    event.preventDefault();
    searchInput = $('#city').val();

    createQuickSearch(searchInput);
    findCity(searchInput);

});

var idCounter = 0;
function createQuickSearch(searchInput){

    var quickSearch = document.getElementById('quick-search');
    var addCity = document.createElement('button');
    if (addCity){
        idCounter++;
        addCity.setAttribute('id', idCounter)
    }

    addCity.textContent = searchInput;
    quickSearch.appendChild(addCity);
    localStorage.setItem('city', addCity)
    var getIdCounter = document.getElementById(idCounter);
    getIdCounter.addEventListener('click', function(event){
        event.preventDefault();
        searchInput = this.textContent;
        findCity(searchInput);
    })
        
}

