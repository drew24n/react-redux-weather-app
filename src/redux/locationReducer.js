import {getCurrentLocationAPI} from "../api/locationAPI";

const SET_CURRENT_CITY = "SET_CURRENT_CITY"

const initialState = {
    city: ''
}

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_CITY:
            return {...state, city: action.city}
        default:
            return state
    }
}

const setCurrentCity = (city) => ({type: SET_CURRENT_CITY, city})

export const getCurrentCity = (lat, lng) => async (dispatch) => {
    try {
        const res = await getCurrentLocationAPI(lat, lng)
        dispatch(setCurrentCity(res.data.results[0].components.city))
    } catch (e) {
        alert(e)
    }
}