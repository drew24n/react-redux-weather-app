import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/"
})

const API_KEY = "ce940a051b3a2b04d361615d04d9ea69"

export const getWeatherApi = async ({city, portions, lat, lon}) => {
    return await instance.get(`forecast?q=${city}&cnt=${portions}&lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
}