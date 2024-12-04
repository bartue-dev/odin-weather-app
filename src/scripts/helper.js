import clearDayIcon from '../../assets/icons/clear-day.png';
import clearNightIcon from '../../assets/icons/clear-night.png';
import cloudyIcon from '../../assets/icons/cloudy.png';
import fogIcon from '../../assets/icons/fog.png';
import cloudyDayIcon from '../../assets/icons/partly-cloudy-day.png';
import cloudyNightIcon from '../../assets/icons/partly-cloudy-night.png';
import rainIcon from '../../assets/icons/rain.png';
import snowIcon from '../../assets/icons/snow.png';
import windIcon from '../../assets/icons/wind.png';
import { format, parse } from 'date-fns';

export const helper = (() => {
  const iconEl = document.querySelector('.icon-img-element');

  function setIcon(currentDateData) {
    switch (currentDateData.icon) {
      case 'snow':
        iconEl.src = snowIcon;
        break;
      case 'rain':
        iconEl.src = rainIcon;
        break;
      case 'fog':
        iconEl.src = fogIcon;
        break;
      case 'wind':
        iconEl.src = windIcon;
        break;
      case 'cloudy':
        iconEl.src = cloudyIcon;
        break;
      case 'partly-cloudy-day':
        iconEl.src = cloudyDayIcon;
        break;
      case 'partly-cloudy-night':
        iconEl.src = cloudyNightIcon;
        break;
      case 'clear-day':
        iconEl.src = clearDayIcon;
        break;
      case 'clear-night':
        iconEl.src = clearNightIcon;
        break;
    }
  }

  function sensationText(sensation) {
    if (sensation < 0) return 'Extreme Cold';
    else if (sensation >= 0 && sensation <= 32) return 'Very Cold';
    else if (sensation >= 33 && sensation <= 50) return 'Chill';
    else if (sensation >= 51 && sensation <= 70) return 'Cool';
    else if (sensation >= 71 && sensation <= 85) return 'Warm';
    else if (sensation >= 86 && sensation <= 100) return 'Hot';
    else if (sensation >= 100) return 'Very Hot';

    return 'none';
  }

  function pressureText(pressure) {
    if (pressure < 980) return 'Very low pressure';
    else if (pressure >= 980 && pressure < 1000) return 'Low pressure';
    else if (pressure >= 1000 && pressure < 1015) return 'Moderate pressure';
    else if (pressure >= 1015 && pressure < 1030) return 'High pressure';
    else if (pressure >= 1030) return 'Very high pressure';

    return 'none';
  }

  function visibilityText(visibility) {
    if (visibility >= 0 && visibility < 1) return 'Very poor visibility';
    else if (visibility >= 1 && visibility < 4) return 'Poor visibility';
    else if (visibility >= 4 && visibility < 10) return 'Moderate visibility';
    else if (visibility >= 10) return 'Good visibility';

    return 'none';
  }

  function moonPhaseText(moonPhase) {
    if (moonPhase >= 0 && moonPhase < 0.1) return 'New Moon';
    else if (moonPhase >= 0.1 && moonPhase < 0.49) return 'Waxing Crescent';
    else if (moonPhase >= 0.49 && moonPhase < 0.51) return 'First Quarter';
    else if (moonPhase >= 0.51 && moonPhase < 0.99) return 'Waxing Gibbous';
    else if (moonPhase >= 0.99 && moonPhase < 1) return 'Full Moon';
    else if (moonPhase >= 0.99 && moonPhase > 0.51) return 'Waning Gibbous';
    else if (moonPhase >= 0.51 && moonPhase > 0.49) return 'Last Quarter';
    else if (moonPhase >= 0.49 && moonPhase > 0.1) return 'Waning Crescent';

    return 'none';
  }

  function timeFormat12(time) {
    if (!time) {
      return 'none';
    }

    const parsedTime = parse(time, 'HH:mm:ss', new Date());

    return format(parsedTime, 'h:mm a');
  }

  function toCapitalize(string) {
    let strArr = string.split(' ');

    const res = strArr.map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    return res.join(' ');
  }

  return {
    setIcon,
    sensationText,
    pressureText,
    visibilityText,
    moonPhaseText,
    timeFormat12,
    toCapitalize,
  };
})();
