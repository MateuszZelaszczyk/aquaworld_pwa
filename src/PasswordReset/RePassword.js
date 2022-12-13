import React from "react";
import style from "./RePassword.module.css";
import NaviBar from "../HomePage/NaviBarHome.js";
import { NavLink } from "react-router-dom";
class RePassword extends React.Component {
  render() {
    return (
      <div className={style.RePasswordWindow}>
        <NaviBar />
        <div className={style.RePasswordContainer}>
          <h1 className={style.RePasswordHeader}>Zmień hasło</h1>
          <form className={style.RePasswordForm}>
            <label
              className={style.RePasswordFormLabel}
              htmlFor="email"
            >Email</label>
            <input
              className={style.RePasswordFormInput}
              type="email"
              id="email"
              name="email"
              placeholder="Podaj email swojego konta..."
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
export default RePassword;
