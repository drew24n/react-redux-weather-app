import React, {useEffect} from 'react';
import style from './Week.module.scss';
import {AddCity} from "../AddCity/AddCity";
import {useDispatch} from "react-redux";
import {setDays, setSearchType} from "../../../redux/weatherReducer";

export function Week() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchType('forecast'))
        dispatch(setDays(7))
    }, [dispatch])

    return (
        <div className={style.container}>
            <AddCity/>
            <div>Week</div>
        </div>
    )
}