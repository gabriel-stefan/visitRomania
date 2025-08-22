document.addEventListener('DOMContentLoaded', function() {
    const locatie = document.getElementById('location-search');
    const oras = document.getElementById('location');
    const temperatura = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind-speed');
    const erorr = document.getElementById('error-message'); 

    const getData = (location) => {
        const apiKey = '4da1f5047eb2f8acba41557d2360987d';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "404") {
                    //console.log('Location not found.');
                    erorr.textContent = 'Location not found.';
                    erorr.style.display = 'block'; 
                } else if (data.sys.country !== 'RO') {
                    //console.log('Location is not in Romania');
                    erorr.textContent = 'Location is not in Romania.';
                    erorr.style.display = 'block'; 
                } else {
                    setWeather(data);
                    erorr.style.display = 'none'; 
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    };

   
    const setWeather = (data) => {
        oras.textContent = data.name.toUpperCase();
        temperatura.innerHTML = `<strong>${Math.round(data.main.temp - 273.15)}</strong><sup>°C</sup>`;
        conditions.textContent = data.weather[0].description;
        humidity.textContent = "Humidity: " + `${data.main.humidity}%`; 
        wind.textContent = "Wind: " + `${data.wind.speed} m/s`; 
        setWeatherIcon(data.weather[0].main, data.sys.sunrise, data.sys.sunset);
    };

    
    const setWeatherIcon = (weatherCondition, sunrise, sunset) => {
        const weatherImg = document.getElementById("weather-img");
        const currentTime = Math.floor(Date.now() / 1000); 
        const getTime = currentTime >= sunrise && currentTime <= sunset;

        
        switch (weatherCondition) {
            case 'Clouds':
                weatherImg.src = getTime ? "vreme/clouds.png" : "vreme/moon_clouds.png";
                break;
            case 'Clear':
                weatherImg.src = getTime ? "vreme/sunny.png" : "vreme/moon.png";
                break;
            case 'Rain':
                weatherImg.src = getTime ? "vreme/rainy.png" : "vreme/rainy_night.png";
                break;
            case 'Mist':
                weatherImg.src = getTime ? "vreme/mist.png" : "vreme/mist_night.png";
                break;
            case 'Snow':
                weatherImg.src = "vreme/snow.png";
                break;
            case 'Haze':
                weatherImg.src = getTime ? "vreme/haze.png" : "vreme/haze_night.png";
                break;
            default:
                weatherImg.src = getTime ? "vreme/clouds.png" : "vreme/moon_clouds.png";
        }
    };

    
    getData('Bucharest');

    locatie.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const location = locatie.value;
            getData(location);
        }
    });
});
