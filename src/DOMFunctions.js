import * as dateFns from 'date-fns';

async function changeMainCityInfo(APIData) {
  const cityName = document.querySelector('.city-name');
  const cityDate = document.querySelector('.city-date');
  const cityTime = document.querySelector('.city-time');
  const cityCondition = document.querySelector('.city-condition');
  const cityConditionImage = document.querySelector('.city-condition-image');
  const cityTemp = document.querySelector('.city-temperature');
  const cityWeatherContainer = document.querySelector('.main-city-info');
  const weatherData = await APIData;
  console.log(weatherData.forecast.forecastday[0]);
  cityName.textContent = weatherData.location.name;
  cityDate.textContent = dateFns.format(
    new Date(weatherData.location.localtime),
    'EEEE dd-MM-yyyy'
  );
  cityTime.textContent = dateFns.format(
    new Date(weatherData.location.localtime),
    'HH:mm'
  );
  cityCondition.textContent = weatherData.current.condition.text;
  cityConditionImage.src = weatherData.current.condition.icon;
  cityTemp.textContent = `${weatherData.current.temp_c}ºC`;
  if (weatherData.current.condition.code === 1000) {
    cityWeatherContainer.style.backgroundColor = 'lightblue';
    cityWeatherContainer.style.color = 'black';
  } else {
    cityWeatherContainer.style.backgroundColor = 'gray';
    cityWeatherContainer.style.color = 'black';
  }
}

async function changeNextDaysForecast(APIData) {
  const forecastDays = document.querySelectorAll('.forecast');
  const weatherData = await APIData;

  for (let i = 0; i < forecastDays.length; i++) {
    const cityDate = forecastDays[i].querySelector('.forecast-day');
    const cityImg = forecastDays[i].querySelector('.forecast-image');
    const cityCondition = forecastDays[i].querySelector('.forecast-condition');
    const cityMaxTemp = forecastDays[i].querySelector('.forecast-max-temp');
    const cityMinTemp = forecastDays[i].querySelector('.forecast-min-temp');
    const cityPrec = forecastDays[i].querySelector('.forecast-prec');

    console.log(weatherData.forecast.forecastday[i]);
    cityDate.textContent = dateFns.format(
      new Date(weatherData.forecast.forecastday[i].date),
      'dd-MM'
    );
    cityImg.src = weatherData.forecast.forecastday[i].day.condition.icon;
    cityCondition.textContent =
      weatherData.forecast.forecastday[i].day.condition.text;
    cityMaxTemp.textContent = `${weatherData.forecast.forecastday[i].day.maxtemp_c}ºC`;
    cityMinTemp.textContent = `${weatherData.forecast.forecastday[i].day.mintemp_c}ºC`;
    cityPrec.textContent = `${weatherData.forecast.forecastday[i].day.daily_chance_of_rain}%`;
  }
}

export { changeMainCityInfo, changeNextDaysForecast };
