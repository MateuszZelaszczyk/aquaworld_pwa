import React, {useState} from "react";
import style from "./RePassword.module.css";
import NaviBar from "../HomePage/NaviBarHome.js";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../Actions/auth";
const NewPassword = ({match, reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password:"",
  });
  const { new_password, re_new_password} = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    const uid =match.params.uid;
    const token = match.params.token;

    reset_password_confirm(uid,token, new_password, re_new_password);
    setRequestSent(true);
   
  };
  if(requestSent){ 
    return <NavLink to="/"/> 
  }
    return (
      <div className={style.RePasswordWindow}>
        <NaviBar />
        <div className={style.NewPasswordContainer}>
          <h1 className={style.RePasswordHeader}>Utwórz hasło</h1>
          <form className={style.RePasswordForm} onSubmit={e => onSubmit(e)}>
            <label className={style.RePasswordFormLabel} htmlFor="password">
              Nowe hasło
            </label>
            <input
              className={style.RePasswordFormInput}
              type="password"
              id="password"
              name="password"
              placeholder="Podaj nowe hasło..."
              value={new_password}
              onChange={e => onChange(e)}
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
              value={re_new_password}
              onChange={e => onChange(e)}
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

  export default connect(null, { reset_password_confirm })(NewPassword);
