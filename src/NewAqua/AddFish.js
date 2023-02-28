import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import Plus from "../Assets/plus.svg";
import Delete from "../Assets/delete.svg";
const AddFish = () => {
  const [fish, setFish] = useState([{ fish: { name: "", quantity: 0 } }]);
  const handleChange = (index, event) => {
    const values = [...fish];
    values[index].fish[event.target.name] = event.target.value;
    setFish(values);
  };
  const handleAdd = () => {
    setFish([...fish, { fish: { name: "", quantity: 0 } }]);
  };

  const handleRemove = (index) => {
    const values = [...fish];
    values.splice(index, 1);
    setFish(values);
  };
  return (
    <div>
      <Navi show={'none'} />
      <div className={style.NewFishContainer}>
        <h1 className={style.NewAquaHeader}>Czas na nowe ryby</h1>
        <form className={style.NewAquaForm}>
          <div>
            <div className={style.LabelContainer}>
              <label htmlFor="name">Gatunek</label>
              <label htmlFor="quantity" className={style.QuantityLabel}>Ilość</label>
            </div>

            {fish.map((fish, index) => (
              <div key={index}>
                <input
                  className={style.NameInput}
                  type="text"
                  name="name"
                  value={fish.fish.name}
                  onChange={(event) => handleChange(index, event)}
                />
                <input
                  className={style.NumberInput}
                  type="number"
                  name="quantity"
                  min={0}
                  value={fish.fish.quantity}
                  onChange={(event) => handleChange(index, event)}
                />
                <button className={style.Deletebtn} type="button" onClick={() => handleRemove(index)}>
                  <img src={Delete} alt="" />
                </button>
              </div>
            ))}
            <button className={style.PlusBtn} type="button" onClick={() => handleAdd()}>
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

export default AddFish;
