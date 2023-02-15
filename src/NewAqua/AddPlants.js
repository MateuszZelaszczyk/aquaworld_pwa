import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import Plus from "../Assets/plus.svg";
import Delete from "../Assets/delete.svg";
const AddPlants = () => {
  const [plants, setPLants] = useState([{ plant: { name: "", quantity: 0 } }]);
  const handleChange = (index, event, id) => {
    const values = [...plants];
    values[index].plant[event.target.name] = event.target.value;
    setPLants(values);
  };
  const handleAdd = (id) => {
      setPLants([...plants, { plant: { name: "", quantity: 0 } }]);
  };

  const handleRemove = (index, id) => {
      const values = [...plants];
      values.splice(index, 1);
      setPLants(values);
  };
  return (
    <div>
      <Navi />
      <div className={style.NewPlantsContainer}>
        <h1 className={style.NewAquaHeader}>Czas na nowe rośliny</h1>
        <form className={style.NewAquaForm}>
          
          <div>
          <div className={style.LabelContainer}>
              <label htmlFor="name">Gatunek</label>
              <label htmlFor="quantity" className={style.QuantityLabel}>Ilość</label>
            </div>
            {plants.map((plant, index) => (
              <div key={index}>
                <input
                 className={style.NameInput}
                  type="text"
                  name="name"
                  value={plant.plant.name}
                  onChange={(event) => handleChange(index, event, "p")}
                />
                <input
                 className={style.NumberInput}
                  type="number"
                  name="quantity"
                  min={0}
                  value={plant.plant.quantity}
                  onChange={(event) => handleChange(index, event, "p")}
                />
                <button className={style.Deletebtn} type="button" onClick={() => handleRemove(index, "p")}>
                  <img src={Delete} alt="" />
                </button>
              </div>
              
            ))}
            <button className={style.PlusBtn} type="button" onClick={() => handleAdd("p")}>
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

export default AddPlants;
