import {getWeatherApi} from "../api/weatherAPI";
import {notification} from "antd";

const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_WEATHER = "SET_WEATHER"

const initialState = {
    isFetching: false,
    weather: {
        time: 0,
        temp: 0,
        weather: '',
        wind: 0,
        city: '',
        country: ''
    }
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_WEATHER:
            return {
                ...state, weather: {
                    time: action.weather.dt,
                    temp: action.weather.main.temp,
                    weather: action.weather.weather[0].main,
                    wind: action.weather.wind.speed,
                    city: action.weather.name,
                    country: action.weather.sys.country
                }
            }
        default:
            return state
    }
}

export const notificationError = (message) => notification.error({
    message: message.toString(), duration: 10, placement: 'bottomRight'
})

const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
const setWeather = (weather) => ({type: SET_WEATHER, weather})

export const getWeather = (city) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const res = await getWeatherApi(city)
        dispatch(setWeather(res.data))
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}