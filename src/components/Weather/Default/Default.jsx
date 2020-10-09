import React from 'react';
import style from './Default.module.scss';
import {AddCity} from "../AddCity/AddCity";

export function Default() {
    return (
        <div className={style.container}>
            <AddCity/>
            <div>Today</div>
        </div>
    )
}