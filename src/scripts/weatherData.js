import { weatherForecast } from "./weatherForecast";
import { weatherInfo } from "./weatherInfo";

export async function getWeatherForecast(location, inputEl) {
  const unitGroup = 'unitGroup=metric'
  const apiKey = 'EJYZJRLG2GL78ULSUWH2K4M8T';
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&${unitGroup}`

  try {
    const response = await fetch(url);
    
    if (!response.ok) {

      errorMessage(response, inputEl)
      throw new Error(`Response Status: ${response.status}`);
    }

    let data = await response.json();

    weatherForecast.renderCurrentCondition(data)
    weatherInfo.renderWeatherInfo(data);

    console.log(data)
  } catch (error) {
    console.log('Fetch error: ', error);
    throw error;
  }
}

function errorMessage(response, inputEl) {
  let message = `${inputEl.value} not found`

  if (response.status === 400) {
    console.log(message)
    inputEl.setCustomValidity(message);
    inputEl.reportValidity();
  }
}

