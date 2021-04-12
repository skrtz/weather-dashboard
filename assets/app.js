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
            console.log(data)
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

