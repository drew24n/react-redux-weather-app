import {getWeatherApi} from "../api/weatherAPI";

const SET_WEATHER = "SET_WEATHER"

const initialState = {
    time: 0,
    temp: 0,
    weather: '',
    wind: 0,
    city: '',
    country: ''
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEATHER:
            return {
                ...state,
                time: action.weather.dt,
                temp: action.weather.main.temp,
                weather: action.weather.weather[0].main,
                wind: action.weather.wind.speed,
                city: action.weather.name,
                country: action.weather.sys.country
            }
        default:
            return state
    }
}

const setWeather = (weather) => ({type: SET_WEATHER, weather})

export const getWeather = (city) => async (dispatch) => {
    try {
        const res = await getWeatherApi(city)
        dispatch(setWeather(res.data))
    } catch (e) {
        alert(e)
    }
}