import React from "react";
import style from "./HomePage.module.css";
import NaviBar from "./NaviBarHome.js";
import Fish from "../Assets/Fish.jpg";
import Icon from "../Assets/TalkFish.png";
import { logout } from "../Actions/auth";
import { connect } from "react-redux";
const HomePage = ({logout, isAuthenticated}) => {
  return (
    <div className={style.MainWindow}>
      <NaviBar />
      <div className={style.MainContainer}>
        <div className={style.InfoContainer}>
          <div className={style.InfoText}>
            <p>
              Witaj w aplikacji poświęconej społeczności pasjonatów akwarystyki.
              Tutaj możesz dzielić się informacjami oraz zdjęciami własnego
              akwariu, poznawać akwarystów z okolicy i wymieniać sie z nimi
              wiedzą oraz doświadczeniami
            </p>
          </div>
          <div className={style.TalkFish}>
            <img className={style.TalkFishFoto} alt="talking fish" src={Icon}></img>
          </div>
        </div>
      </div>
      <img className={style.FishFoto} alt="fish" src={Fish}></img>
    </div>
  );
};
const mapSatateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapSatateToProps, { logout })(HomePage);

