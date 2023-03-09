import React, {useState, useEffect} from "react";
import style from "./RegisterPage.module.css";
import NaviBar from "../HomePage/NaviBarHome.js";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {register} from "../Actions/auth";
const RegisterPage =({register, isAuthenticated})=> {
  const navigate = useNavigate();
  const[ accountCr, setAccountCr]= useState(false)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { firstname, lastname, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      register(firstname, lastname, email, password, re_password);
      setAccountCr(true);

    }

      if (isAuthenticated) {
        navigate("/profile/mainpage");
      
    }
    if(accountCr){
      alert("Aby aktywować konto kliknij w link aktywacyjny przesłany na podany adres email");
      return <NavLink to="/login" />
    };
  };
    return (
      <div className={style.RegisterWindow}>
        <NaviBar />
        <div className={style.RegisterContainer}>
          <h1 className={style.RegisterHeader}>Zarejestruj się</h1>
          <form className={style.RegisterForm} onSubmit={e=>onSubmit(e)}>
            <label className={style.RegisterFormLabel} htmlFor="email">
              Email
            </label>
            <input
              className={style.RegisterFormInput}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
            <label className={style.RegisterFormLabel} htmlFor="name">
              Imię
            </label>
            <input
              className={style.RegisterFormInput}
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={e => onChange(e)}
              required
            />
            <label className={style.RegisterFormLabel} htmlFor="lastname">
              Nazwisko
            </label>
            <input
              className={style.RegisterFormInput}
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={e => onChange(e)}
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
              value={password}
              onChange={e=>onChange(e)}
              required
            />
            <label className={style.RegisterFormLabel} htmlFor="re_password">
              Powtórz hasło
            </label>
            <input
              className={style.RegisterFormInput}
              type="password"
              id="re_password"
              name="re_password"
              value={re_password}
              onChange={e=>onChange(e)}
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
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  export default connect(mapStateToProps, { register })(RegisterPage);