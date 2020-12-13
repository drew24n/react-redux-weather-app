import React from 'react';
import style from '../styles/Header.module.scss';
import {NavLink} from "react-router-dom";
import Search from "./Search";

function Header({city, history}) {
    return (
        <header className={style.container}>
            <section className={style.leftSection}>
                <NavLink activeClassName={style.active} exact to={`/`}>Home</NavLink>
                <NavLink activeClassName={style.active} to={`/today?city=${city}`}>Today</NavLink>
                <NavLink activeClassName={style.active} to={`/tomorrow?city=${city}`}>Tomorrow</NavLink>
                <NavLink activeClassName={style.active} to={`/week?city=${city}`}>Week</NavLink>
            </section>
            <section className={style.rightSection}>
                <Search history={history}/>
            </section>
        </header>
    )
}

export default Header