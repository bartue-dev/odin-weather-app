import { format, parse } from "date-fns";

export const weatherInfo = (() => {
  const windEl = document.querySelector('.wind-js');
  const humidityEl = document.querySelector('.humidity-js');
  const sensationEl = document.querySelector('.sensation-js');
  const pressureEl = document.querySelector('.pressure-js');
  const uvIndexEl = document.querySelector('.uv-index-js');
  const visibilityEl = document.querySelector('.visibility-js');
  const riseEl = document.querySelector('.rise-js');
  const setEl = document.querySelector('.set-js');
  const cloudCoverEl = document.querySelector('.cloud-cover-js');
  const moonPhaseEl = document.querySelector('.moon-phase-js');

  function renderWeatherInfo(data) {
    let dataDays = data.days

    let date = new Date();
    let currentDate = date.toJSON().slice(0,10);
    let currentTime = data.currentConditions.datetime;

    const currentDateIndex = dataDays.findIndex(day => {
      if (day.datetime === currentDate) {
        return true
      }
    });

    const hourDataIndex = dataDays[currentDateIndex].hours.findIndex(hour => {
      if (hour.datetime.split(':')[0] === currentTime.split(':')[0]) {
        return true;
      }
    });

    let currentData = dataDays[currentDateIndex].hours[hourDataIndex];

    let windSpeed =  currentData.windspeed;
    let humidity = currentData.humidity;
    let sensation = currentData.feelslike;
    let pressure = currentData.pressure;
    let uvIndex = currentData.uvindex;
    let visibility = currentData.visibility;
    let sunRise = data.currentConditions.sunrise;
    let sunSet = data.currentConditions.sunset;
    let cloudCover = currentData.cloudcover;
    let moonPhase = data.currentConditions.moonphase;

    windEl.textContent = `${windSpeed} km`;
    humidityEl.textContent = `${Math.floor(humidity)}%`;
    sensationEl.textContent = sensationText(sensation);
    pressureEl.textContent = pressureText(pressure);
    uvIndexEl.textContent = uvIndex;
    visibilityEl.textContent = visibilityText(visibility);
    riseEl.textContent = timeFormat12(sunRise);
    setEl.textContent = timeFormat12(sunSet);
    cloudCoverEl.textContent = `${Math.floor(cloudCover)}%`;
    moonPhaseEl.textContent = moonPhaseText(moonPhase);

    console.log(sunRise, sunSet);
    console.log('From weather info: ',currentData)

  }

  function sensationText(sensation) {

    if (sensation < 0)  return 'Extreme Cold'
    else if (sensation >= 0 && sensation <= 32) return 'Very Cold'
    else if (sensation >= 33 && sensation <= 50) return 'Chill'
    else if (sensation >= 51 && sensation <= 70) return 'Cool'
    else if (sensation >=71 && sensation <= 85) return 'Warm'
    else if (sensation >= 86 && sensation <= 100) return 'Hot'
    else if (sensation >= 100) return 'Very Hot'

    return 'none'
  }

  function pressureText(pressure) {

     if (pressure < 980)  return 'Very low pressure'
     else if (pressure >= 980 && pressure < 1000) return 'Low pressure'
     else if (pressure >= 1000 && pressure < 1015) return 'Moderate pressure'
     else if (pressure >= 1015 && pressure < 1030) return 'High pressure'
     else if (pressure >= 1030) return 'Very high pressure'

     return 'none'
  }

  function visibilityText(visibility) {

    if (visibility >= 0 && visibility < 1) return 'Very poor visibility'
    else if (visibility >= 1 && visibility < 4) return 'Poor visibility'
    else if (visibility >= 4 && visibility < 10) return 'Moderate visibility'
    else if (visibility >= 10) return 'Good visibility'

    return 'none'
  }

  function moonPhaseText(moonPhase) {

   if (moonPhase >= 0 && moonPhase < 0.1) return 'New Moon'
   else if (moonPhase >= 0.1 && moonPhase < 0.49) return 'Waxing Crescent'
   else if (moonPhase >= 0.49 && moonPhase < 0.51) return 'First Quarter'
   else if (moonPhase >= 0.51 && moonPhase < 0.99) return 'Waxing Gibbous'
   else if (moonPhase >= 0.99 && moonPhase < 1) return 'Full Moon'
   else if (moonPhase >= 0.99 && moonPhase > 0.51) return 'Waning Gibbous'
   else if (moonPhase >= 0.51 && moonPhase > 0.49) return 'Last Quarter';
   else if (moonPhase >= 0.49 && moonPhase > 0.1) return 'Waning Crescent';

   return 'none';
  }

  function timeFormat12(time) {
    if (!time) {
      return 'none'
    }

    const parsedTime = parse(time, 'HH:mm:ss', new Date());

    return format(parsedTime, 'h:mm a')
  }



  return {
    renderWeatherInfo,
  }

})();