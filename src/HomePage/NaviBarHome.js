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
      <button className={style.LogIn}>Zaloguj się</button>
      <button className={style.Register}>Zarejestruj się</button>
    </div>
  );
};
export default NaviBar;
