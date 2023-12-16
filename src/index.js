import './styles.css';
import { setLocalStorage, updateCity } from './apidata';
import { changeMainCityInfo, changeNextDaysForecast } from './DOMFunctions';

const changeCityInput = document.querySelector('#change-city-input');
const changeCityButton = document.querySelector('.search-btn');

document.addEventListener('DOMContentLoaded', () => {
  setLocalStorage();
  changeMainCityInfo(JSON.parse(localStorage.getItem('city')));
  changeNextDaysForecast(JSON.parse(localStorage.getItem('city')));
});

changeCityButton.addEventListener('click', async () => {
  if (changeCityInput.value.length > 0) {
    await updateCity(changeCityInput.value);
    changeMainCityInfo(JSON.parse(localStorage.getItem('city')));
    changeNextDaysForecast(JSON.parse(localStorage.getItem('city')));
  }
});
