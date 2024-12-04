import { helper } from './helper';

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
    let dataDays = data.days;

    let date = new Date();
    let currentDate = date.toJSON().slice(0, 10);
    let currentTime = data.currentConditions.datetime;

    const currentDateIndex = dataDays.findIndex((day) => {
      if (day.datetime === currentDate) {
        return true;
      }
    });

    const hourDataIndex = dataDays[currentDateIndex].hours.findIndex((hour) => {
      if (hour.datetime.split(':')[0] === currentTime.split(':')[0]) {
        return true;
      }
    });

    let currentData = dataDays[currentDateIndex].hours[hourDataIndex];

    let windSpeed = currentData.windspeed;
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
    sensationEl.textContent = helper.sensationText(sensation);
    pressureEl.textContent = helper.pressureText(pressure);
    uvIndexEl.textContent = uvIndex;
    visibilityEl.textContent = helper.visibilityText(visibility);
    riseEl.textContent = helper.timeFormat12(sunRise);
    setEl.textContent = helper.timeFormat12(sunSet);
    cloudCoverEl.textContent = `${Math.floor(cloudCover)}%`;
    moonPhaseEl.textContent = helper.moonPhaseText(moonPhase);

    console.log(sunRise, sunSet);
    console.log('From weather info: ', currentData);
  }

  return {
    renderWeatherInfo,
  };
})();
