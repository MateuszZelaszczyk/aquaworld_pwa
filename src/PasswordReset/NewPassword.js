import React from "react";
import style from "./RePassword.module.css";
import NaviBar from "../HomePage/NaviBarHome.js";
import { NavLink } from "react-router-dom";
class NewPassword extends React.Component {
  render() {
    return (
      <div className={style.RePasswordWindow}>
        <NaviBar />
        <div className={style.NewPasswordContainer}>
          <h1 className={style.RePasswordHeader}>Utwórz hasło</h1>
          <form className={style.RePasswordForm}>
            <label className={style.RePasswordFormLabel} htmlFor="password">
              Nowe hasło
            </label>
            <input
              className={style.RePasswordFormInput}
              type="password"
              id="password"
              name="password"
              placeholder="Podaj nowe hasło..."
              required
            />
            <label className={style.RePasswordFormLabel} htmlFor="password">
              Powtórz hasło
            </label>
            <input
              className={style.RePasswordFormInput}
              type="repassword"
              id="repassword"
              name="repassword"
              placeholder="Powtórz nowe hasło..."
              required
            />
            <div className={style.BtnContainer}>
              <button className={style.RePasswordFormBtn}>Zmień hasło</button>
              <NavLink className={style.RePasswordExitLink} to="/">
                Anuluj
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default NewPassword;
