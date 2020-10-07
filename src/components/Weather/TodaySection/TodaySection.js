import React from 'react';
import style from './TodaySection.module.scss';
import {AddCitySection} from "../AddCitySection/AddCitySection";

export function TodaySection() {
    return (
        <div className={style.container}>
            <AddCitySection/>
            <div>Today</div>
        </div>
    )
}