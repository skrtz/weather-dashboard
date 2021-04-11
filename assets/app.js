var searchInput;
var city = $('#city');
var apiKey = 'f1a95fc68a0873c27d61c20f9a6dd653';
var url = 'api.openweathermap.org/data/2.5/weather?q=' + searchInput + '&appid=' + apiKey;




// Search button 
$('#search-btn').on('click', function(event){
    event.preventDefault();
    searchInput = $('#city').val();
    console.log(searchInput);
    getWeather()
});