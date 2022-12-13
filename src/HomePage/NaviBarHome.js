import React from "react";
import style from "./HomePage.module.css";
import Icon from "../Assets/IconFish.png";
import { NavLink } from "react-router-dom";
const NaviBar = () => {
  return (
    <div className={style.NavBar}>
      <NavLink className={style.NavHome} to="/">
        <img className={style.Icon} alt="Icon" src={Icon} />
      </NavLink>
      <NavLink to="/login"><button className={style.LogIn}>Zaloguj się</button></NavLink>
      <NavLink to="/register"><button className={style.Register}>Zarejestruj się</button></NavLink>
    </div>
  );
};
export default NaviBar;
