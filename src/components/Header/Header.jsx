import React from 'react';
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Search} from "./Search/Search";

export function Header({city}) {
    return (
        <header className={style.container}>
            <section className={style.leftSection}>
                <NavLink activeClassName={style.active} exact to={`/?city=${city}`}>Home</NavLink>
                <NavLink activeClassName={style.active} to={`/today?city=${city}`}>Today</NavLink>
                <NavLink activeClassName={style.active} to={`/tomorrow?city=${city}`}>Tomorrow</NavLink>
                <NavLink activeClassName={style.active} to={`/week?city=${city}`}>Week</NavLink>
            </section>
            <section className={style.rightSection}>
                <Search/>
            </section>
        </header>
    )
}