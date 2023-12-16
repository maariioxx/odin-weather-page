function CORSSolve() {
  const xhttp = new XMLHttpRequest();
  xhttp.open(
    'GET',
    'https://api.weatherapi.com/v1/current.json?key=f761d4a415a94079961121143231412&q=murcia',
    true
  );
  xhttp.send();
}

async function getAPIData(city) {
  CORSSolve();
  const promise = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f761d4a415a94079961121143231412&q=${city}&days=3&aqi=yes&alerts=no`,
    {
      mode: 'cors',
    }
  ).catch((error) => {
    throw new Error('Error', { cause: error });
  });
  if (!promise.ok)
    throw new Error(
      `Responsed with ${promise.status} error: ${await promise.text()} `
    );
  else {
    const weatherData = await promise.json();
    return weatherData;
  }
}

async function setLocalStorage() {
  let city = [];
  if (localStorage.getItem('city') === null) {
    city = await getAPIData('madrid');
    localStorage.setItem('city', JSON.stringify(city));
  } else {
    city = JSON.parse(localStorage.getItem('city'));
  }
}

async function updateCity(city) {
  const weatherData = await getAPIData(city);
  localStorage.setItem('city', JSON.stringify(weatherData));
}

export { setLocalStorage, updateCity };
