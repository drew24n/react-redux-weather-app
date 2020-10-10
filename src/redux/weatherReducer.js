import {getWeatherApi} from "../api/weatherAPI";

const SET_WEATHER = "SET_WEATHER"
const SET_FORECAST = "SET_FORECAST"
const SET_COORDINATES = "SET_COORDINATES"
const SET_CITY = "SET_CITY"
const SET_SEARCH_TYPE = "SET_SEARCH_TYPE"
const SET_DAYS = "SET_DAYS"

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
    searchType: '',
    city: '',
    days: '',
    coordinates: {
        lat: '',
        lon: ''
    },
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
        case SET_COORDINATES:
            return {
                ...state, coordinates: {
                    lat: action.coordinates.lat,
                    lon: action.coordinates.lon
                }
            }
        case SET_SEARCH_TYPE:
            return {
                ...state, searchType: action.searchType
            }
        case SET_CITY:
            return {
                ...state, city: action.city
            }
        case SET_DAYS:
            return {
                ...state, days: action.days
            }
        default:
            return state
    }
}

const setWeather = (weather) => ({type: SET_WEATHER, weather})
const setForecast = (forecast) => ({type: SET_FORECAST, forecast})
export const setDays = (days) => ({type: SET_DAYS, days})
export const setCity = (city) => ({type: SET_CITY, city})
export const setSearchType = (searchType) => ({type: SET_SEARCH_TYPE, searchType})
export const setCoordinates = (coordinates) => ({type: SET_COORDINATES, coordinates})

export const getWeather = (options) => async (dispatch) => {
    try {
        const res = await getWeatherApi(options)
        if (options.searchType === 'weather') {
            dispatch(setWeather(res.data))
        } else if (options.searchType === 'forecast') {
            dispatch(setForecast(res.data))
        }
    } catch (e) {
        alert(e)
    }
}

