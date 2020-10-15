import React from 'react';
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Search} from "./Search/Search";

export function Header() {
    return (
        <header className={style.container}>
            <section className={style.leftSection}>
                <NavLink activeClassName={style.active} exact to={'/'}>Home</NavLink>
                <NavLink activeClassName={style.active} exact to={'/today'}>Today</NavLink>
                <NavLink activeClassName={style.active} exact to={'/tomorrow'}>Tomorrow</NavLink>
                <NavLink activeClassName={style.active} exact to={'/week'}>Week</NavLink>
            </section>
            <section className={style.rightSection}>
                <Search/>
            </section>
        </header>
    )
}