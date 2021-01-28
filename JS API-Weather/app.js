const form = document.querySelector('#searchForm');
const div = document.querySelector('#forecastsDiv');
const p = document.querySelector('#place');
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Novr", "Dec"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let today = new Date();
let yesterdayUTCSeconds = Math.floor(today.getTime()/1000 - 24*3600);

// 1. Get city/town inputed
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.city.value;

    //2. Get its coordinates
    const config = { params: { key:'', location: searchTerm } }
    const resCoordinates = await axios.get(`http://open.mapquestapi.com/geocoding/v1/address?`, config);
    const coordinates = tellCoordinates(resCoordinates);
    form.elements.city.value = '';

    //3. Get the forecasts for those coordinates (for next 48h + for next 7 days)
    let configWeather = { params: {appid: '', lat: coordinates.lat ,lon: coordinates.lng}}
    let resWeather = await axios.get('https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,alerts,current&units=metric', configWeather);
    const hourlyWeather = resWeather.data.hourly;
    const dailyWeather = resWeather.data.daily;
    console.dir(hourlyWeather);
    console.dir(dailyWeather);
    
    //4. Clear previous displays
    div.innerHTML="";
    
    //5. Display current forecasts
    display(hourlyWeather, true);
    display(dailyWeather, false);

    //6. Double-check the used coordinates' city/town, and print it
    //add to config appid
    const resPlace = await axios.get('http://open.mapquestapi.com/nominatim/v1/reverse.php?format=json', configWeather);
    p.innerHTML = `${(resPlace.data.address.city||resPlace.data.address.village||resPlace.data.address.town)}, ${resPlace.data.address.country}`;

    //7. Get the weather from day before incase they alert current wet floor
    // configWeather = { params: {appid: '', lat: coordinates.lat ,lon: coordinates.lng, dt: yesterdayUTCSeconds}}
    // resWeather = await axios.get('https://api.openweathermap.org/data/2.5/onecall/timemachine?exclude=minutely,hourly,alerts,current&units=metric', configWeather);
    // const yesterdayWeather = ;
})


const tellCoordinates = (response) => {
    return response.data.results[0].locations[0].latLng;
}

/** DISPLAY-FORECAST FUNCTIONS **/
const display = (array, isHourly) => {
    
    //let's ignore the hourly forecast ot the 3rd day (for which we might not have all the hours) 
    if (isHourly) {
        const hoursDayAfterTomorrow = today.getHours();
        array = array.slice(1 , 48 - hoursDayAfterTomorrow);  

    //let's ignore the daily forecast of the 1st and 2nd days (for which we display the hourly forecasts)    
    } else {
        array = array.slice(2,6);
    }
    //loop for each timestamp which we have a weather forecast for
    for (const weather of array) {
        let newSpan = document.createElement('span');
        let d = new Date(weather.dt*1000);
        let timeStamp;
        let degrees;
        timeStamp = isHourly ? stringifyHour(d) : stringifyDay(d);
        degrees = isHourly ? Math.round(weather.temp) : Math.round((weather.temp.min + weather.temp.max)/2);
        newSpan.innerHTML = timeStamp + '<br>' + Math.round(weather.pop*10)*10 + '% chance of rain<br>' + degrees + '°C';

        let newImg = document.createElement('IMG');
        newImg.src = `./images/${weather.weather[0].icon}.png`;
        newSpan.append(newImg);
        div.append(newSpan);

        console.log(JSON.stringify({time: timeStamp, icon: weather.weather[0].icon}));
    }
}

const stringifyHour = (d) => {
    
    if (d.getDate() === today.getDate()) {
        return `Today<br>`+d.getHours()+'h';
    } else if (d.getDate() === (today.getDate() + 1)) {
        return `Tomorrow<br>`+d.getHours()+'h'; 
    } //else {
    //     return `${weekDays[d.getDay()]}<br> (${d.getDate()} ${monthNames[d.getMonth()]})<br>`+d.getHours()+':'+d.getMinutes(); 
    // }
    
}

const stringifyDay = (d) => `${weekDays[d.getDay()]}<br>${d.getDate()} ${monthNames[d.getMonth()]}`;
/** END OF DISPLAY-FORECAST FUNCTIONS **/