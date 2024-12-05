import './styles/general.css';
import './styles/leftContainer.css';
import './styles/rightContainer.css';
import { weatherForecast } from './scripts/weatherForecast';
import { weatherPages } from './scripts/weatherPages';

const loader = document.querySelector('.loader');
const body = document.querySelector('body');

document.onreadystatechange = () => {
  if (document.readyState !== 'complete') {
    body.style.visibility = 'hidden';
    loader.style.visibility = 'visible';
  }else {
    loader.style.display = 'none';
    body.style.visibility = 'visible';
  }

  console.log(document.readyState);
  
}
