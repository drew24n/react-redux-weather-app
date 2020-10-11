import {getWeatherApi} from "../api/weatherAPI";
import {getCityAPI} from "../api/locationAPI";
import {localStorageService} from "../localStorageService";

const SET_TODAY_WEATHER = "SET_TODAY_WEATHER"
const SET_FORECAST = "SET_FORECAST"
const SET_SEARCH_CITY = "SET_SEARCH_CITY"
const SET_SEARCH_TYPE = "SET_SEARCH_TYPE"
const SET_DAYS_AMOUNT = "SET_DAYS_AMOUNT"
const SET_SAVED_CITIES = "SET_SAVED_CITIES"
const SAVE_CITY = "SAVE_CITY"
const REMOVE_CITY = "REMOVE_CITY"

const initialState = {
    weatherData: {
        city: '',
        country: '',
        coordinates: {
            lat: 0,
            lon: 0
        },
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
    searchCity: '',
    daysAmount: 0,
    savedCities: []
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODAY_WEATHER:
            return {
                ...state, weatherData: {
                    city: action.weather.name,
                    country: action.weather.sys.country,
                    coordinates: {...action.weather.coord},
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
                ...state, weatherData: {
                    city: action.forecast.city.name,
                    country: action.forecast.city.country,
                    coordinates: {...action.forecast.city.coord},
                    days: [...action.forecast.list.map(d => ({
                        time: d.dt,
                        temp: d.main.temp,
                        weather: d.weather[0].main,
                        wind: d.wind.speed
                    }))]
                }
            }
        case SET_SEARCH_TYPE:
            return {
                ...state, searchType: action.searchType
            }
        case SET_SEARCH_CITY:
            return {
                ...state, searchCity: action.searchCity
            }
        case SET_DAYS_AMOUNT:
            return {
                ...state, daysAmount: action.daysAmount
            }
        case SET_SAVED_CITIES:
            return {
                ...state, savedCities: action.savedCities
            }
        case SAVE_CITY:
            return {
                ...state, savedCities: [...state.savedCities, action.city]
            }
        case REMOVE_CITY:
            return {
                ...state, savedCities: state.savedCities.filter(cities => cities !== action.city)
            }
        default:
            return state
    }
}

const setTodayWeather = (weather) => ({type: SET_TODAY_WEATHER, weather})
const setForecast = (forecast) => ({type: SET_FORECAST, forecast})
export const setDaysAmount = (daysAmount) => ({type: SET_DAYS_AMOUNT, daysAmount})
export const setSearchCity = (searchCity) => ({type: SET_SEARCH_CITY, searchCity})
export const setSearchType = (searchType) => ({type: SET_SEARCH_TYPE, searchType})
export const setSavedCities = (savedCities) => ({type: SET_SAVED_CITIES, savedCities})
export const setSaveCity = (city) => ({type: SAVE_CITY, city})
export const setRemoveCity = (city) => ({type: REMOVE_CITY, city})

export const getWeather = (options) => async (dispatch) => {
    try {
        const res = await getWeatherApi(options)
        if (res && options.searchType === 'weather') {
            dispatch(setTodayWeather(res.data))
        } else if (res && options.searchType === 'forecast') {
            dispatch(setForecast(res.data))
        }
    } catch (e) {
        alert(e)
    }
}

export const getCity = ({lat, lon}) => async (dispatch) => {
    try {
        const res = await getCityAPI({lat, lon})
        if (res) {
            dispatch(setSearchCity(res.data.results[0].components.city))
        }
    } catch (e) {
        alert(e)
    }
}

export const saveCity = (city) => (dispatch, getState) => {
    if (getState().weather.savedCities.find(i => i === city) || !city) return
    dispatch(setSaveCity(city))
    const {savedCities} = getState().weather
    localStorageService.setCities(JSON.stringify(savedCities))
}

export const removeCity = (city) => (dispatch, getState) => {
    dispatch(setRemoveCity(city))
    const {savedCities} = getState().weather
    localStorageService.setCities(JSON.stringify(savedCities))
}