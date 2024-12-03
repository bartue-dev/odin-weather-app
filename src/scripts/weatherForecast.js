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
import { format, parse } from 'date-fns';


export const weatherForecast = (() => {

  const searchInputEl = document.querySelector('#search');
  const iconEl = document.querySelector('.icon-img-element');
  const weatherTempEl = document.querySelector('.weather-temp');
  const weatherConditionEl = document.querySelector('.weather-condition');
  const dateEl = document.querySelector('.date');
  const timeEl = document.querySelector('.time');
  const addressEl = document.querySelector('.address');
  const separator = document.querySelector('.separator')

  
  function searchLocation() {
    searchInputEl.addEventListener('keydown', (event)=> {
      let inputValue = searchInputEl.value;
      if (event.key === 'Enter') {
        getWeatherForecast(inputValue, searchInputEl);
        searchInputEl.blur();
      }
    });

    searchInputEl.addEventListener('click', () => {
      searchInputEl.value = ''
    });

    searchInputEl.addEventListener('input', () => {
      if (searchInputEl.validationMessage) {
        searchInputEl.setCustomValidity('');
        searchInputEl.value = ''; 
        return;
      }
    });
  }

  function renderCurrentCondition(data) {
    let dataDays = data.days

    let date = new Date();
    let currentDate = date.toJSON().slice(0,10)
    let currentTime = data.currentConditions.datetime;
    let formattedCurrDate = format(currentDate, 'yyyy-MMMM-dd')
    
    const currentDateIndex = dataDays.findIndex(day => {
      if (day.datetime === currentDate) {
        return true;
      }
    });

    const hourDataIndex = dataDays[currentDateIndex].hours.findIndex(hour => {
      if (hour.datetime.split(':')[0] === currentTime.split(':')[0]) {
        return true;
      }
    });

    let currentData = dataDays[currentDateIndex].hours[hourDataIndex];
    let weatherTemp = Math.floor(currentData.temp);
    let weatherCondition = currentData.conditions
    
    weatherTempEl.textContent = `${weatherTemp} °C`;
    weatherConditionEl.textContent = toCapitalize(weatherCondition)
    dateEl.textContent = formattedCurrDate;
    timeEl.textContent = format(parse(currentTime, 'HH:mm:ss', new Date()), 'h:mm a')
    addressEl.textContent = data.resolvedAddress;

    setIcon(currentData);

    if (weatherTempEl.textContent !== '') {
      separator.style.display = 'block'
    }


  }

  function setIcon(currentDateData) {

    switch(currentDateData.icon) {
      case 'snow':
        iconEl.src = snowIcon;
        break;
      case 'rain':
        iconEl.src = rainIcon
        break;
      case 'fog':
        iconEl.src = fogIcon
        break;
      case 'wind':
        iconEl.src = windIcon
        break;
      case 'cloudy':
        iconEl.src = cloudyIcon
        break;
      case 'partly-cloudy-day':
        iconEl.src = cloudyDayIcon
        break;
      case 'partly-cloudy-night':
        iconEl.src = cloudyNightIcon
        break;
      case 'clear-day':
        iconEl.src = clearDayIcon
        break;
      case 'clear-night':
        iconEl.src = clearNightIcon
        break;
    }

  }

  function toCapitalize(string) {
    let strArr = string.split(' ');

    const res = strArr.map(str => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    return res.join(' ');
  }


  

  return {
    searchLocation,
    renderCurrentCondition
  }

})();