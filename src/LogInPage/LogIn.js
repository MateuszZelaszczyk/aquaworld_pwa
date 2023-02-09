import React from "react";
import style from "./LogIn.module.css";
import NaviBar from "../HomePage/NaviBarHome.js";
import { NavLink } from "react-router-dom";
class LogInPage extends React.Component {
  render() {
    return (
      <div className={style.LogInWindow}>
        <NaviBar />
        <div className={style.LogInContainer}>
          <h1 className={style.LogInHeader}>Zaloguj się</h1>
          <form className={style.LogInForm}>
            <label className={style.LogInFormLabel} htmlFor="email">
              Email
            </label>
            <input
              className={style.LogInFormInput}
              type="email"
              id="email"
              name="email"
              required
            />
            <label className={style.LogInFormLabel} htmlFor="password">
              Hasło
            </label>
            <input
              className={style.LogInFormInput}
              type="password"
              id="password"
              name="password"
              required
            />
            <div className={style.Link_btn_Container}>
              <NavLink className={style.LogInFormBtn} to="/mainpage">
                <button className={style.LogInFormBtn}>Zaloguj się</button>
              </NavLink>
              <NavLink className={style.LogInFormLink} to="/register">
                <p>Nie masz konta? Zarejestruj się</p>
              </NavLink>
              <NavLink className={style.LogInResetLink} to="/repassword">
                <p>Zapomniałem hasło?</p>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default LogInPage;
