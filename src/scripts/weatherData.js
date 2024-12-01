export async function getWeatherForecast(location, inputEl) {
  const apiKey = 'EJYZJRLG2GL78ULSUWH2K4M8T';
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`

  try {
    const response = await fetch(url);
    
    if (!response.ok) {

      errorMessage(response, inputEl)

      throw new Error(`Response Status: ${response.status}`);
    }

    let data = await response.json();

    console.log(data)
  } catch (error) {
    console.log(error.message);
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

