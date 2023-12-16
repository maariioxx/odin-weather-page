import * as dateFns from 'date-fns';

const cityName = document.querySelector('.city-name');
const cityDate = document.querySelector('.city-date');
const cityTime = document.querySelector('.city-time');
const cityCondition = document.querySelector('.city-condition');
const cityConditionImage = document.querySelector('.city-condition-image');
const cityTemp = document.querySelector('.city-temperature');

async function changeMainCityInfo(APIData) {
  const weatherData = await APIData;
  console.log(weatherData);
  cityName.textContent = weatherData.location.name;
  cityDate.textContent = dateFns.format(
    new Date(weatherData.location.localtime),
    'EEEE dd-MM-yyyy'
  );
  cityTime.textContent = dateFns.format(
    new Date(weatherData.location.localtime),
    'k:m'
  );
  cityCondition.textContent = weatherData.current.condition.text;
  cityConditionImage.src = weatherData.current.condition.icon;
  cityTemp.textContent = `${weatherData.current.temp_c}ºC`;
}

export { changeMainCityInfo };
