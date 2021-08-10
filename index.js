const url =
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature';
const bodyEl = document.body;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const links = data.urls.full;
    const authorName = data.user.name;
    bodyEl.style.backgroundImage = `url(${links})`;
    document.querySelector('.author').textContent = `By: ${authorName}`;
  });

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
  .then((res) => {
    if (!res.ok) {
      throw Error('Something went wrong');
    }
    return res.json();
  })
  .then((data) => {
    const name = data.name;
    const image = data.image.small;
    const currentPrice = data.market_data.current_price.usd;
    const highPrice = data.market_data.high_24h.usd;
    const lowPrice = data.market_data.low_24h.usd;
    document.querySelector('.crypto-top').innerHTML = `  
     <img src="${image}" alt="" />
    <span>${name}</span>
   `;
    document.querySelector('.crypto').innerHTML += `
    <p>🎯 $ ${currentPrice}</p>
    <p>👍 $ ${highPrice}</p>
    <p>👎 $ ${lowPrice}</p>`;
  })
  .catch((err) => console.error(err));

const date = new Date();
document.querySelector('.time').textContent = date.toLocaleTimeString('en-us', {
  timeStyle: 'short',
});

setInterval(() => {
  const date = new Date();
  document.querySelector('.time').textContent = date.toLocaleTimeString(
    'en-us',
    {
      timeStyle: 'short',
    }
  );
}, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=927296058e3b9fb24bb92f9b8d40cbdb`
  )
    .then((res) => res.json())
    .then((data) => {
      const icon = data.weather[0].icon;
      const temp = Math.floor(data.main.temp);
      const city = data.name;
      document.querySelector('.weather-top').innerHTML = `
      <img src='http://openweathermap.org/img/wn/${icon}@2x.png'/>
      <p>${temp}°</p>
      `;
      document.querySelector('.weather').innerHTML += `
      <p class='city'>${city}</p>`;
    })
    .catch((err) => console.log(err));
});
