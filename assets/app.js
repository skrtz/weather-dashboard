var searchInput;
var apiKey = 'f1a95fc68a0873c27d61c20f9a6dd653';
var lat;
var lon;


function getWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            var current = document.getElementById('current');
            console.log(data)
            for(let i = 0; i < data.daily.length; i++){

                // forcast
                var createDiv = document.createElement('div');
                var createTemp = document.createElement('p');
                var createHumid = document.createElement('p');
                var createUvi = document.createElement('p')

                // var toFareheit = 9/5(data.daily[i].temp.day - 237);
                createTemp.textContent = 'Temp: ' + data.daily[i].temp.day;
                createHumid.textContent = 'Humidity: ' + data.daily[i].humidity + '%';
                createUvi.textContent = 'UV Index: ' + data.daily[i].uvi;

                current.appendChild(createDiv);
                createDiv.appendChild(createTemp);
                createDiv.appendChild(createHumid);
                createDiv.appendChild(createUvi);

            }

        })
}


$('#search-btn').on('click', function(event){
    event.preventDefault();
    searchInput = $('#city').val();
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&appid=' + apiKey;
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        lat = data[0].lat;
        lon = data[0].lon;
        getWeather(lat,lon);
    })
});

