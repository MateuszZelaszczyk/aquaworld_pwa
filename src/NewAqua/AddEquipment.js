import React from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
const AddEquipment = () => {

  return (
    <div>
      <Navi show={'none'}  />
      <div className={style.NewEquipContainer}>
        <h1 className={style.NewAquaHeader}>Uzupełnij wyposażenie</h1>
        <form className={style.NewAquaForm}>
          <label className={style.NewAquaFormLabel} htmlFor="light">Oświetlenie</label>
          <input className={style.NewAquaFormInput} name="light" type="text" />
          <label className={style.NewAquaFormLabel} htmlFor="filtration">Filtracja</label>
          <input className={style.NewAquaFormInput} name="filtration" type="text" />
          <label className={style.NewAquaFormLabel} htmlFor="TempControl">Ogrzewanie</label>
          <input className={style.NewAquaFormInput} name="TempControl" type="text" />
          <label className={style.NewAquaFormLabel} htmlFor="CO2">CO2</label>
          <input className={style.NewAquaFormInput} name="CO2" type="text" />
          <label className={style.NewAquaFormLabel} htmlFor="Control">Sterowanie</label>
          <input className={style.NewAquaFormInput} name="Control" type="text" />
          <label className={style.NewAquaFormLabel} htmlFor="Others">Inne</label>
          <textarea className={style.NewAquaFormInput} name="Others" />
          <button className={style.Save}>Zapisz</button>
        </form>
        <NavLink className={style.BackBtn} to="/profile/myaqua">
          Powrót
        </NavLink>
      </div>
    </div>
  );
};

export default AddEquipment;
