import { format } from 'date-fns';
import { getWeatherForecast } from './weatherData';
import { helper } from './helper';

export const weatherPages = (() => {
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

  const weatherTempEl = document.querySelector('.weather-temp');
  const weatherConditionEl = document.querySelector('.weather-condition');
  const dateEl = document.querySelector('.date');
  const timeEl = document.querySelector('.time');
  const addressEl = document.querySelector('.address');

  const searchInputEl = document.querySelector('#search');
  const todayBtn = document.querySelector('.today');
  const tomorrowBtn = document.querySelector('.tomorrow');
  const loader = document.querySelector('.loader');

  todayBtn.addEventListener('click', (event) => {
    event.preventDefault();

    todayBtn.style.borderBottom = '2px solid #748cf1';
    tomorrowBtn.style.borderBottom = 'transparent';

    let inputValue = searchInputEl.value;
    inputValue === ''
      ? alert('search for a city or country')
      : getWeatherForecast(inputValue, searchInputEl);

    console.log('this is from today button');
  });

  tomorrowBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    todayBtn.style.borderBottom = 'transparent';
    tomorrowBtn.style.borderBottom = '2px solid #748cf1';
    
    let inputValue = searchInputEl.value;

    if (inputValue === '') {

      alert('search for a city or country');

    } else {

      const unitGroup = 'unitGroup=metric';
      const apiKey = 'EJYZJRLG2GL78ULSUWH2K4M8T';
      let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?key=${apiKey}&${unitGroup}`;

      try {

        loader.style.display = 'block'

        const response = await fetch(url);

        if (!response.ok) {
          errorMessage(response, searchInputEl);
          throw new Error(`Response Status: ${response.status}`);
        }

        let data = await response.json();

        renderTomWeather(data);
      } catch (error) {
        console.log('Fetch error: ', error);
      } finally {
        loader.style.display = 'none';
      }
    }
  });

  function renderTomWeather(data) {
    const dataDays = data.days;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDate = format(tomorrow, 'yyyy-MM-dd');

    const tomIndex = dataDays.findIndex((day) => {
      if (day.datetime === tomorrowDate) {
        return true;
      }
    });

    let currentData = dataDays[tomIndex];

    let weatherTemp = Math.floor(currentData.temp);
    let weatherCondition = currentData.conditions;
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

    weatherTempEl.textContent = `${weatherTemp} °C`;
    weatherConditionEl.textContent = helper.toCapitalize(weatherCondition);
    dateEl.textContent = format(tomorrow, 'yyyy-MMMM-dd');
    timeEl.textContent = '';
    addressEl.textContent = data.resolvedAddress;
    helper.setIcon(currentData);

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

    console.log('tomorrow date:', currentData);
  }

  return {

  };
})();
