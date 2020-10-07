import React from 'react';
import style from './TomorrowSection.module.scss';
import {AddCitySection} from "../AddCitySection/AddCitySection";

export function TomorrowSection() {
    return (
        <div className={style.container}>
            <AddCitySection/>
            <div>Tomorrow</div>
        </div>
    )
}