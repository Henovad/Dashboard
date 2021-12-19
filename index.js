const defaultBackground = 'https://images.unsplash.com/photo-1528184039930-bd03972bd974?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzAxMTMzMjU&ixlib=rb-1.2.1&q=85'
const timeEl = document.querySelector('.time')
const weatherEl = document.getElementById('weather')

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById('author').textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(${defaultBackground})`
        document.getElementById('author').textContent = `By: Simon Wilkes`
    })

fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then(res => res.json())
    .then(data => {
        document.getElementById('crypto-top').innerHTML = `<img src=${data.image.small}/>  <span>${data.name}</span>`
        document.getElementById('crypto').innerHTML +=
            `<p>💰: $${data.market_data.current_price.usd} </p>
        <p>👆: $${data.market_data.high_24h.usd} </p>
        <p>👇: $${data.market_data.low_24h.usd} </p>
        `
    })
    .catch(err => console.log(err))

function getCurrentTime() {
    let currentdate = new Date();
    timeEl.textContent = currentdate.toLocaleTimeString("en-us", { timeStyle: 'short' })
}



function success(pos) {
    const crd = pos.coords;

    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

            weatherEl.innerHTML = `
            <img src=${weatherIconUrl} />
            <p class="temp">${Math.round(data.main.temp)}°C</p>
            <p class="city">${data.name}</p>
            `
        })
        .catch(err => console.log(err))
}

navigator.geolocation.getCurrentPosition(success);
setInterval(getCurrentTime, 1000)
