import {getWeatherApi} from "../api/weatherAPI";

const SET_WEATHER = "SET_WEATHER"
const SET_FORECAST = "SET_FORECAST"
const SET_OPTIONS = "SET_OPTIONS"

const initialState = {
    weather: {
        city: '',
        country: '',
        days: [
            {
                time: 0,
                temp: 0,
                weather: '',
                wind: 0
            }
        ]
    },
    options: {
        forecast: '',
        city: '',
        lat: '',
        lon: '',
        days: ''
    }
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEATHER:
            return {
                ...state, weather: {
                    city: action.weather.name,
                    country: action.weather.sys.country,
                    days: [{
                        time: action.weather.dt,
                        temp: action.weather.main.temp,
                        weather: action.weather.weather[0].main,
                        wind: action.weather.wind.speed
                    }]
                }
            }
        case SET_FORECAST:
            return {
                ...state, weather: {
                    city: action.forecast.city.name,
                    country: action.forecast.city.country,
                    days: [...action.forecast.list.map(d => ({
                        time: d.dt,
                        temp: d.main.temp,
                        weather: d.weather[0].main,
                        wind: d.wind.speed
                    }))]
                }
            }
        case SET_OPTIONS:
            return {
                ...state, options: {
                    forecast: action.options.forecast,
                    city: action.options.city,
                    lat: action.options.lat,
                    lon: action.options.lon,
                    days: action.options.days
                }
            }
        default:
            return state
    }
}

const setWeather = (weather) => ({type: SET_WEATHER, weather})
const setForecast = (forecast) => ({type: SET_FORECAST, forecast})
export const setOptions = (options) => ({type: SET_OPTIONS, options})

export const getWeather = (options) => async (dispatch) => {
    try {
        const res = await getWeatherApi(options)
        if (options.forecast === 'weather') {
            dispatch(setWeather(res.data))
        } else if (options.forecast === 'forecast') {
            dispatch(setForecast(res.data))
        }
    } catch (e) {
        alert(e)
    }
}

