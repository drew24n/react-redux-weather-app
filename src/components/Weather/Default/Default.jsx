import React, {useEffect} from 'react';
import style from './Default.module.scss';
import {AddCity} from "../common/AddCity/AddCity";
import {useDispatch, useSelector} from "react-redux";
import {removeCity, setSearchCity, setSearchType} from "../../../redux/weatherReducer";

export function Default({history}) {
    const dispatch = useDispatch()
    const weatherState = useSelector(state => state.weather)

    useEffect(() => {
        dispatch(setSearchType('weather'))
    }, [dispatch])

    return (
        <div className={style.container}>
            <AddCity location={history.location}/>
            <h3>Saved cities</h3>
            {!weatherState.savedCities.length && <p className={style.msg}>Save cities for easier navigation!</p>}
            <div className={style.citiesContainer}>
                {weatherState.savedCities.map((city, index) => {
                    return (
                        <div className={style.cityItem} key={index} onClick={() => {
                            dispatch(setSearchCity(city))
                            history.push('/today')
                        }}>
                            <div className={style.closeBtn} onClick={e => {
                                e.stopPropagation()
                                dispatch(removeCity(city))
                            }}>✕
                            </div>
                            <p>{city}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}