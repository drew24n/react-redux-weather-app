import React, {useEffect} from 'react';
import style from './Today.module.scss';
import {AddCity} from "../AddCity/AddCity";
import {useDispatch} from "react-redux";
import {setDays, setSearchType} from "../../../redux/weatherReducer";

export function Today() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchType('weather'))
        dispatch(setDays(''))
    }, [dispatch])

    return (
        <div className={style.container}>
            <AddCity/>
            <div>Today</div>
        </div>
    )
}