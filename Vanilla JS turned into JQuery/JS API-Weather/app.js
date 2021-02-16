const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Novr", "Dec"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let today = new Date();
// let yesterdayUTCSeconds = Math.floor(today.getTime()/1000 - 24*3600);

// 1. Get city/town inputed
$('#searchForm').on('submit', async function (e) {
    e.preventDefault();
    const searchedPlace = $("input").val();

    //2. Get its coordinates
    const config = { params: { location: searchedPlace } }
    const resCoordinates = await axios.get('http://open.mapquestapi.com/geocoding/v1/address?key='+ keys.MQ , config);
    const coordinates = tellCoordinates(resCoordinates);
    $('input').val('');

    //3. Get the forecasts for those coordinates (for next 48h + for next 7 days)
    let configWeather = { params: { lat: coordinates.lat ,lon: coordinates.lng}}
    let { data } = await axios.get('https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,alerts,current&units=metric&appid='+ keys.OW, configWeather);
    const { hourly, daily } = data;
    console.dir(hourly);
    console.dir(daily);
    
    //4. Clear previous displays
    $('.forecastSlot').html('');
    
    //5. Display current forecasts
    display(hourly, true);
    display(daily, false);

    //6. Double-check the used coordinates' city/town, and print it
    //add to config appid
    let { data : dataPlace } = await axios.get('http://open.mapquestapi.com/nominatim/v1/reverse.php?format=json&key='+ mqKey, configWeather);
    console.dir(data);
    $('#foundPlace').text( `${(dataPlace.address.city||dataPlace.address.village||dataPlace.address.town)}, ${dataPlace.address.country}`);

    //7. Get the weather from day before incase they alert current wet floor
    // configWeather = { params: {appid: '', lat: coordinates.lat ,lon: coordinates.lng, dt: yesterdayUTCSeconds}}
    // resWeather = await axios.get('https://api.openweathermap.org/data/2.5/onecall/timemachine?exclude=minutely,hourly,alerts,current&units=metric', configWeather);
    // const yesterdayWeather = ;
})


/** DISPLAY-FORECAST FUNCTIONS **/
    const display = (array, isHourly) => {
        
        //let's separate the hours from the current day and the next (and ignore the day after that, for which we might not have all hours)
        if (isHourly) {
            const hoursDayAfterTomorrow = today.getHours();
            const arrayToday = array.slice(1 , 24 - hoursDayAfterTomorrow);
            const arrayTomorrow = array.slice( 24 - hoursDayAfterTomorrow, 48 - hoursDayAfterTomorrow);
            displayLoop(arrayToday, true, true);
            displayLoop(arrayTomorrow, true, false);

        //let's ignore the daily forecast of the 1st and 2nd days (for which we display the hourly forecasts)    
        } else {
            array = array.slice(2,6);
            displayLoop(array, false, false);
        }
    }

    //loop for each timestamp which we have a weather forecast for
    const displayLoop = (array, isHourly, isToday ) => {
            
            for (const weather of array) {

                let date = new Date(weather.dt*1000);
                let dateString = isHourly ? stringifyHour(date) : stringifyDay(date);
                let degrees = isHourly ? Math.round(weather.temp) : Math.round((weather.temp.min + weather.temp.max)/2);
                let temp = Math.round(weather.pop*10)*10; 
                let text = dateString + '<br>' + temp + '% chance of rain<br>' + degrees + '°C';
                let newSpan = $('<span>'+ text + '</span>'); 
        
                let newImg = $('<img>');
                newImg.attr('src',`./images/${weather.weather[0].icon}.png`);
                newSpan.append(newImg);
                
                let container = isHourly ? (isToday ? $('#today') : $('#tomorrow')) : $('#week');
                container.append(newSpan);
            }
    }
/**/

/** FORMAT-CONVERSIONS FUNCTIONS*/

    // Gets the coordinates from the GEOcoding API's response
    const tellCoordinates = (response) => {
        return response.data.results[0].locations[0].latLng;
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
/**/