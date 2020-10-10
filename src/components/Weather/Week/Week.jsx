import React, {useEffect} from 'react';
import style from './Week.module.scss';
import {AddCity} from "../AddCity/AddCity";
import {useDispatch} from "react-redux";
import {setDaysAmount, setSearchType} from "../../../redux/weatherReducer";

export function Week() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchType('forecast'))
        dispatch(setDaysAmount(7))
    }, [dispatch])

    return (
        <div className={style.container}>
            <AddCity/>
        </div>
    )
}