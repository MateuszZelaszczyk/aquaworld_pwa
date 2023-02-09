import React from "react";
import style from "./MainPage.module.css";
import Navi from "./Navi";
const MainPage = () => {
  return (
    <div>
      <Navi/>
      <div className={style.MainContainer}></div>
    </div>
  );
};
export default MainPage;
