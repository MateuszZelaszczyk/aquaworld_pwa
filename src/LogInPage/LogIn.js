import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import style from "./LogIn.module.css";
import NaviBar from "../HomePage/NaviBarHome.js";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../Actions/auth";
import { useCookies } from 'react-cookie';
import { messaging } from "../firebase.js";
import { getToken } from "firebase/messaging";
import axios from "axios";
const LogInPage =({ login, isAuthenticated })=>{
  
  const navigate =useNavigate();
  const [Dtoken, setDToken] = useState("");
  const utoken = localStorage.getItem("access");
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:process.env.REACT_APP_VAPID_KEY,
      });
      setDToken(token);

    } else if (permission === "denied") {
      console.log("You denied for notification");
    }
    else{
      console.log(permission)
    }
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    requestPermission();
    if(utoken && Dtoken!==""){
      SendToken();
    }
    login(email, password);


  };
  const SendToken=()=>{
    axios.post(`${process.env.REACT_APP_API_URL}/api/notifytokens/`,{token:Dtoken}, {
      headers: {
        Authorization: `Bearer ${utoken}`,
      },
    })
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile/mainpage");
    }
  }, [isAuthenticated, navigate]);
    return (
      <div className={style.LogInWindow}>
        <NaviBar />
        <div className={style.LogInContainer}>
          <h1 className={style.LogInHeader}>Zaloguj się</h1>
          <form className={style.LogInForm} onSubmit={e => onSubmit(e)}>
            <label className={style.LogInFormLabel} htmlFor="email">
              Email
            </label>
            <input
              className={style.LogInFormInput}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
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
              value={password}
              onChange={e => onChange(e)}
              required
            />
            <div className={style.Link_btn_Container}>
                <button className={style.LogInFormBtn}>Zaloguj się</button>
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
  const mapStateToProps =state =>({
    isAuthenticated: state.auth.isAuthenticated
    
  });
export default connect(mapStateToProps, { login })(LogInPage);
