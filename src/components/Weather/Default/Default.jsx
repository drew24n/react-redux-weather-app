import React, {useEffect} from 'react';
import style from './Default.module.scss';
import {AddCity} from "../AddCity/AddCity";
import {useDispatch} from "react-redux";
import {setSearchType} from "../../../redux/weatherReducer";

export function Default() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchType('weather'))
    }, [dispatch])

    return (
        <div className={style.container}>
            <AddCity/>
            <div>Today</div>
        </div>
    )
}