import React, {useEffect} from 'react';
import style from './Default.module.scss';
import {AddCity} from "../AddCity/AddCity";
import {useDispatch, useSelector} from "react-redux";
import {removeCity, setSearchCity, setSearchType} from "../../../redux/weatherReducer";

export function Default({location}) {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    useEffect(() => {
        dispatch(setSearchType('weather'))
    }, [dispatch])

    return (
        <div className={style.container}>
            <AddCity location={location}/>
            <h3>Saved cities</h3>
            <div className={style.citiesContainer}>
                {weatherState.savedCities.map((city, index) => {
                    return <div className={style.cityItem} key={index}>
                        <div className={style.closeBtn} onClick={() => dispatch(removeCity(city))}>✕</div>
                        <p onClick={() => dispatch(setSearchCity(city))}>{city}</p>
                    </div>
                })}
            </div>
        </div>
    )
}