import {getWeatherApi} from "../api/weatherAPI";
import {localStorageService} from "../localStorageService";

const SET_WEATHER = "SET_WEATHER"
const SET_SEARCH_CITY = "SET_SEARCH_CITY"
const SET_PORTIONS_AMOUNT = "SET_PORTIONS_AMOUNT"
const SET_SAVED_CITIES = "SET_SAVED_CITIES"
const SET_SEARCH_BY_COORDINATES = "SET_SEARCH_BY_COORDINATES"
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
    searchByCoordinates: {
        lat: 0,
        lon: 0
    },
    savedCities: []
}

export const weatherReducer = (state = initialState, action) => {
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
        case SET_SEARCH_BY_COORDINATES:
            return {
                ...state, searchByCoordinates: {...action.searchByCoordinates}
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

const setWeather = (weather) => ({type: SET_WEATHER, weather})
export const setPortionsAmount = (searchPortions) => ({type: SET_PORTIONS_AMOUNT, searchPortions})
export const setSearchCity = (searchCity) => ({type: SET_SEARCH_CITY, searchCity})
export const setSavedCities = (savedCities) => ({type: SET_SAVED_CITIES, savedCities})
export const setSaveCity = (city) => ({type: SAVE_CITY, city})
export const setRemoveCity = (city) => ({type: REMOVE_CITY, city})
export const setSearchByCoordinates = (searchByCoordinates) => ({type: SET_SEARCH_BY_COORDINATES, searchByCoordinates})

export const getWeather = (options) => async (dispatch) => {
    try {
        const res = await getWeatherApi(options)
        if (res) {
            dispatch(setWeather(res.data))
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