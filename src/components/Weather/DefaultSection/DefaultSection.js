import React from 'react';
import style from './DefaultSection.module.scss';
import {AddCitySection} from "../AddCitySection/AddCitySection";

export function DefaultSection() {
    return (
        <div className={style.container}>
            <AddCitySection/>
            <div>Default</div>
        </div>
    )
}