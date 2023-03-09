import React, {useState} from "react";
import style from "./RePassword.module.css";
import NaviBar from "../HomePage/NaviBarHome.js";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../Actions/auth";
const RePassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email} = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
   
  };
  if(requestSent){ 
    return <NavLink to="/"/> 
  }
    return (
      <div className={style.RePasswordWindow}>
        <NaviBar />
        <div className={style.RePasswordContainer}>
          <h1 className={style.RePasswordHeader}>Zmień hasło</h1>
          <form className={style.RePasswordForm} onSubmit={e=>onSubmit(e)}>
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
              value={email}
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
  export default connect(null, { reset_password })(RePassword);
