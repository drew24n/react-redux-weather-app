import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/"
})

export const getWeatherApi = async ({city, portions}) => {
    return await instance.get(
        `forecast?q=${city}&cnt=${portions}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
}