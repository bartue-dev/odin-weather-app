import clearDayIcon from '../../assets/icons/clear-day.png';
import clearNightIcon from '../../assets/icons/clear-night.png';
import cloudyIcon from '../../assets/icons/cloudy.png';
import fogIcon from '../../assets/icons/fog.png';
import cloudyDayIcon from '../../assets/icons/partly-cloudy-day.png';
import cloudyNightIcon from '../../assets/icons/partly-cloudy-night.png';
import rainIcon from '../../assets/icons/rain.png';
import snowIcon from '../../assets/icons/snow.png';
import windIcon from '../../assets/icons/wind.png';
import { getWeatherForecast } from './weatherData';


export const weatherForecast = (() => {

  const searchInputEl = document.querySelector('#search');
  const weatherIconEl = document.querySelector('.weather-icon');
  const weatherTempEl = document.querySelector('.weather-temp');
  const weatherConditionEl = document.querySelector('.weather-condition');
  const dateEl = document.querySelector('.date');
  const timeEl = document.querySelector('.time');
  const addressEl = document.querySelector('.address');

  searchInputEl.addEventListener('input', () => {
    if (searchInputEl.validationMessage) {
      console.log('setCustomValidity exist!')
      searchInputEl.setCustomValidity('');
      searchInputEl.value = ''; 
      return;
    }
  });

  function searchLocation() {
    searchInputEl.addEventListener('keydown', (event)=> {
      let inputValue = searchInputEl.value;
      if (event.key === 'Enter') {
        getWeatherForecast(inputValue, searchInputEl);
        console.log(inputValue)
      }
    });
  }
  

  return {
    searchLocation
  }

})();