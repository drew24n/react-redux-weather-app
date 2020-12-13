import {getWeatherApi} from "../api/weather";
import {getCityApi} from "../api/location";
import {localStorageService} from "../localStorageService";

const SET_WEATHER = "SET_WEATHER"
const SET_SEARCH_CITY = "SET_SEARCH_CITY"
const SET_PORTIONS_AMOUNT = "SET_PORTIONS_AMOUNT"
const SET_SAVED_CITIES = "SET_SAVED_CITIES"
const ADD_CITY = "ADD_CITY"
const REMOVE_CITY = "REMOVE_CITY"
const SET_IS_FETCHING = "SET_IS_FETCHING"

const initialState = {
    weatherData: {
        city: '',
        country: '',
        coordinates: {
            lat: 0,
            lon: 0
        },
        portions: [
            {
                date: '',
                time: 0,
                temp: 0,
                weather: '',
                wind: 0
            }
        ]
    },
    searchCity: '',
    searchPortions: 0,
    savedCities: [],
    isFetching: false
}

export const weather = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEATHER:
            return {
                ...state, weatherData: {
                    city: action.weather.city.name,
                    country: action.weather.city.country,
                    coordinates: {...action.weather.city.coord},
                    portions: [...action.weather.list.map(d => ({
                        date: d.dt_txt,
                        time: d.dt,
                        temp: d.main.temp,
                        weather: d.weather[0].main,
                        wind: d.wind.speed
                    }))]
                }
            }
        case SET_SEARCH_CITY:
            return {
                ...state, searchCity: action.searchCity
            }
        case SET_PORTIONS_AMOUNT:
            return {
                ...state, searchPortions: action.searchPortions
            }
        case SET_SAVED_CITIES:
            return {
                ...state, savedCities: action.savedCities
            }
        case ADD_CITY:
            return {
                ...state, savedCities: [...state.savedCities, action.city]
            }
        case REMOVE_CITY:
            return {
                ...state, savedCities: state.savedCities.filter(cities => cities !== action.city)
            }
        case SET_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state
    }
}

const setWeather = (weather) => ({type: SET_WEATHER, weather})
export const setPortionsAmount = (searchPortions) => ({type: SET_PORTIONS_AMOUNT, searchPortions})
export const setSearchCity = (searchCity) => ({type: SET_SEARCH_CITY, searchCity})
export const setSavedCities = (savedCities) => ({type: SET_SAVED_CITIES, savedCities})
const setAddCity = (city) => ({type: ADD_CITY, city})
const setRemoveCity = (city) => ({type: REMOVE_CITY, city})
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})

export const getWeather = (options) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const res = await getWeatherApi(options)
        if (res) {
            dispatch(setWeather(res.data))
        }
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const getCity = () => async (dispatch) => {
    try {
        const res = await getCityApi()
        if (res.data.city) {
            dispatch(setSearchCity(res.data.city))
        }
    } catch (e) {
        alert(e)
    }
}

export const saveCity = (city) => (dispatch, getState) => {
    if (getState().weather.savedCities.find(i => i === city) || !city) return
    dispatch(setAddCity(city))
    const {savedCities} = getState().weather
    localStorageService.setCities(JSON.stringify(savedCities))
}

export const removeCity = (city) => (dispatch, getState) => {
    dispatch(setRemoveCity(city))
    const {savedCities} = getState().weather
    localStorageService.setCities(JSON.stringify(savedCities))
}