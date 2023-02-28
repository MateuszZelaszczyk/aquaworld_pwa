import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import Plus from "../Assets/plus.svg";
import Delete from "../Assets/delete.svg";
const AddFertilizer = () => {
  const [fertilizer, setFertilizer] = useState([{ fertilizer: { name: "", quantity: 0 } }]);
  const handleChange = (index, event, id) => {
      const values = [...fertilizer];
      values[index].fertilizer[event.target.name] = event.target.value;
      setFertilizer(values);
  };
  const handleAdd = (id) => {

      setFertilizer([...fertilizer, { fertilizer: { name: "", quantity: 0 } }]);

  };

  const handleRemove = (index, id) => {
      const values = [...fertilizer];
      values.splice(index, 1);
      setFertilizer(values);
  };
  return (
    <div>
      <Navi show={'none'}  />
      <div className={style.NewFertContainer}>
        <h1 className={style.NewAquaHeader}>Dodaj nawóz</h1>
        <form className={style.NewAquaForm}>
          <div>
          <div className={style.LabelContainer}>
              <label htmlFor="name">Nazwa</label>
              <label htmlFor="quantity" className={style.QuantityLabel}>Dawka {"("}ml/tyg{")"}</label>
            </div>
            {fertilizer.map((fertilizer, index) => (
              <div key={index}>
                <input className={style.NameInput}
                  type="text"
                  name="name"
                  value={fertilizer.fertilizer.name}
                  onChange={(event) => handleChange(index, event, "f")}
                />
                <input className={style.NumberInput}
                  type="number"
                  name="quantity"
                  min={0}
                  value={fertilizer.fertilizer.quantity}
                  onChange={(event) => handleChange(index, event, "f")}
                />
                <button className={style.Deletebtn} type="button" onClick={() => handleRemove(index, "f")}>
                  <img src={Delete} alt="" />
                </button>
              </div>
            ))}
            <button className={style.PlusBtn} type="button" onClick={() => handleAdd("f")}>
              <img src={Plus} alt="" />
            </button>
          </div>
          <button className={style.Save}>Zapisz</button>
        </form>
        <NavLink className={style.BackBtn} to="/profile/myaqua">
          Powrót
        </NavLink>
      </div>
    </div>
  );
};

export default AddFertilizer;
