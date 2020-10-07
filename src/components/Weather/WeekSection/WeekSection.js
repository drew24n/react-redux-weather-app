import React from 'react';
import style from './WeekSection.module.scss';
import {AddCitySection} from "../AddCitySection/AddCitySection";

export function WeekSection() {
    return (
        <div className={style.container}>
            <AddCitySection/>
            <div>Week</div>
        </div>
    )
}