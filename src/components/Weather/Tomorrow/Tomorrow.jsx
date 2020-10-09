import React, {useEffect} from 'react';
import style from './Tomorrow.module.scss';
import {AddCity} from "../AddCity/AddCity";
import {useDispatch, useSelector} from "react-redux";
import {setOptions} from "../../../redux/weatherReducer";

export function Tomorrow() {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    useEffect(() => {
        dispatch(setOptions({
            forecast: 'forecast',
            city: weatherState.options.city,
            lat: weatherState.options.lat,
            lon: weatherState.options.lon,
            days: 1
        }))
    }, [dispatch, weatherState.options.city, weatherState.options.lat, weatherState.options.lon])

    return (
        <div className={style.container}>
            <AddCity/>
            <div>Tomorrow</div>
        </div>
    )
}