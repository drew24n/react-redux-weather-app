import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/"
})

const API_KEY = "ce940a051b3a2b04d361615d04d9ea69"

export const getWeatherApi = async ({forecast, city, lat, lon, days}) => {debugger
    return await instance.get(`${forecast}?q=${city}&&lat=${lat}&lon=${lon}&cnt=${days}&appid=${API_KEY}&units=metric`)
}