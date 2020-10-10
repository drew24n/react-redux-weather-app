import React, {useEffect} from 'react';
import style from './Tomorrow.module.scss';
import {AddCity} from "../AddCity/AddCity";
import {useDispatch} from "react-redux";
import {setDays, setSearchType} from "../../../redux/weatherReducer";

export function Tomorrow() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchType('forecast'))
        dispatch(setDays(1))
    }, [dispatch])

    return (
        <div className={style.container}>
            <AddCity/>
            <div>Tomorrow</div>
        </div>
    )
}