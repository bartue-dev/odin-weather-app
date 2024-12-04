import { getWeatherForecast } from './weatherData';
import { format, longFormatters } from 'date-fns';
import { helper } from './helper';

export const weatherForecast = (() => {
  const searchInputEl = document.querySelector('#search');
  const weatherTempEl = document.querySelector('.weather-temp');
  const weatherConditionEl = document.querySelector('.weather-condition');
  const dateEl = document.querySelector('.date');
  const timeEl = document.querySelector('.time');
  const addressEl = document.querySelector('.address');
  const separator = document.querySelector('.separator');
  const todayBtn = document.querySelector('.today');
  const tomorrowBtn = document.querySelector('.tomorrow');

  function searchLocation() {

    searchInputEl.addEventListener('keydown', (event) => {
      let inputValue = searchInputEl.value;
      if (event.key === 'Enter') {

        todayBtn.style.borderBottom = '2px solid #748cf1';
        tomorrowBtn.style.borderBottom = 'transparent';
        
        getWeatherForecast(inputValue, searchInputEl);
        searchInputEl.blur();
      }
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
    let dataDays = data.days;

    let date = new Date();
    let currentDate = date.toJSON().slice(0, 10);
    let currentTime = data.currentConditions.datetime;
    let formattedCurrDate = format(currentDate, 'yyyy-MMMM-dd');

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

    const hoursData = dataDays[currentDateIndex].hours[hourDataIndex];

    if (!hoursData) {
      const dateData = dataDays[currentDateIndex];
      
      displayData(data, dateData, formattedCurrDate, currentTime);
      console.log('Displays current date data due to unavailability of hours data');
      
    }

    //display hours data
    displayData(data, hoursData, formattedCurrDate, currentTime)

  }

  function displayData(data, secondData, date, time) {
    let weatherTemp = Math.floor(secondData.temp);
    let weatherCondition = secondData.conditions;

    weatherTempEl.textContent = `${weatherTemp} °C`;
    weatherConditionEl.textContent = helper.toCapitalize(weatherCondition);
    dateEl.textContent = date;
    timeEl.textContent = helper.timeFormat12(time);
    addressEl.textContent = data.resolvedAddress;

    helper.setIcon(secondData);

    if (weatherTempEl.textContent !== '') {
      separator.style.display = 'block';
    }
  }

  return {
    searchLocation,
    renderCurrentCondition,
  };
})();
