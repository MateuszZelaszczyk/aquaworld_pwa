import React from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";

const AddBase = () => {

  return (
    <div>
      <Navi show={'none'}  />
      <div className={style.NewBaseContainer}>
        <h1 className={style.NewAquaHeader}>Jakie masz podłoże</h1>
        <form className={style.NewAquaForm}>
          <label className={style.NewAquaFormLabel} htmlFor="light">Substrat</label>
          <input className={style.NewAquaFormInput} placeholder="W przypadku braku zostaw pole puste" name="light" type="text" />
          <label className={style.NewAquaFormLabel} htmlFor="filtration">Wierzchnia warstwa</label>
          <input className={style.NewAquaFormInput} name="filtration" type="text" />
          <button className={style.Save}>Zapisz</button>
        </form>
        <NavLink className={style.BackBtn} to="/profile/myaqua">
          Powrót
        </NavLink>
      </div>
    </div>
  );
};

export default AddBase;
