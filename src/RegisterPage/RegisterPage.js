import React from "react";
import style from "./RegisterPage.module.css";
import NaviBar from "../HomePage/NaviBarHome.js";
import { NavLink } from "react-router-dom";
class RegisterPage extends React.Component {
  render() {
    return (
      <div className={style.RegisterWindow}>
        <NaviBar />
        <div className={style.RegisterContainer}>
          <h1 className={style.RegisterHeader}>Zarejestruj się</h1>
          <form className={style.RegisterForm}>
            <label className={style.RegisterFormLabel} htmlFor="email">
              Email
            </label>
            <input
              className={style.RegisterFormInput}
              type="email"
              id="email"
              name="email"
              required
            />
            <label className={style.RegisterFormLabel} htmlFor="login">
              Login
            </label>
            <input
              className={style.RegisterFormInput}
              type="text"
              id="login"
              name="login"
              required
            />
            <label className={style.RegisterFormLabel} htmlFor="password">
              Hasło
            </label>
            <input
              className={style.RegisterFormInput}
              type="password"
              id="password"
              name="password"
              required
            />
            <label className={style.RegisterFormLabel} htmlFor="repassword">
              Powtórz hasło
            </label>
            <input
              className={style.RegisterFormInput}
              type="password"
              id="repassword"
              name="repassword"
              required
            />
            <div className={style.Link_btn_Container}>
              <button className={style.RegisterFormBtn}>Utwórz konto</button>
              <NavLink className={style.RegisterFormLink} to="/login">
                <p>Masz już konto? Zaloguj się</p>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default RegisterPage;
