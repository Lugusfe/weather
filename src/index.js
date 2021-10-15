// WEATHERAPI_KEY - Adicionar da Weather Api (https://www.weatherapi.com/)
const baseURL = 'https://api.weatherapi.com/v1/forecast.json?key=WEATHERAPI_KEY'

async function getWeather(lat,long) {
    const response = await fetch(baseURL+`&q=${lat},${long}&days=6&aqi=no&alerts=no&lang=pt`);
    const data = await response.json();

    return data
}

const DOM = { 
    forecast: document.querySelector('#weather'),

    weatherCompose(info){
        const section = document.createElement('section')
        section.innerHTML =  DOM.weatherModel(info)
        section.setAttribute('id','card')
        DOM.forecast.appendChild(section)
    },

    weatherModel(info){
        const temp = info.current.temp_c.toFixed(0)
        
        const html = `
          <div class="realTime">
                <h1>${temp}º</h1>
                <div>
                    <h3>${info.location.name}</h3>
                    <p>${info.current.condition.text}</p>
                </div>
            </div>
            <div class="forecast">
                <table class="forecastTable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Hoje</th>
                            <th>${Utils.dateFormat(info.forecast.forecastday[1].date)}</th>
                            <th>${Utils.dateFormat(info.forecast.forecastday[2].date)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>                        
                        <td>max</td>
                            <td>${Utils.tempFormat(info.forecast.forecastday[0].day.maxtemp_c)}º</td>
                            <td>${Utils.tempFormat(info.forecast.forecastday[1].day.maxtemp_c)}º</td>
                            <td>${Utils.tempFormat(info.forecast.forecastday[2].day.maxtemp_c)}º</td>
                        </tr>

                        <tr>                        
                            <td>min</td>
                            <td>${Utils.tempFormat(info.forecast.forecastday[0].day.mintemp_c)}º</td>
                            <td>${Utils.tempFormat(info.forecast.forecastday[1].day.mintemp_c)}º</td>
                            <td>${Utils.tempFormat(info.forecast.forecastday[2].day.mintemp_c)}º</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
        return html
    }
}

const Utils =  {

    getLocation(){
      // IPSTACK_KEY - Adicionar a Key da api ipstack (https://ipstack.com/)
      fetch('http://api.ipstack.com/check?access_key=IPSTACK_KEY')
      .then(location => location.json())
      .then(data => {
        const latitude = data.latitude
        const longitude = data.longitude
        
        getWeather(latitude, longitude).then( local=>{
          DOM.weatherCompose(local)
        })
      })
    },

    dateFormat(date){
        const splitDate = date.split('-')
        const newDate = `${splitDate[2]}/${splitDate[1]}`

        return newDate
    },

    tempFormat(temp){
        const format = temp.toFixed(0)

        return format
    }

}

Utils.getLocation()
