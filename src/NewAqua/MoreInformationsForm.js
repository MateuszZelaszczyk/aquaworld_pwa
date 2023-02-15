import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import Plus from "../Assets/plus.svg";
import Delete from "../Assets/delete.svg"
const MoreInformation = () => {
  const [fish, setFish] = useState([{ fish: { name: "", quantity: 0 } }]);
  const [plants, setPLants] = useState([{ plant: { name: "", quantity: 0 } }]);
  const handleChange = (index, event, id) => {
    if (id === "f") {
      const values = [...fish];
      values[index].fish[event.target.name] = event.target.value;
      setFish(values);
    } else if (id === "p") {
      const values = [...plants];
      values[index].plant[event.target.name] = event.target.value;
      setPLants(values);
    }
  };
  const handleAdd = (id) => {
    if (id === "f") {
      setFish([...fish, { fish: { name: "", quantity: 0 } }]);
    } else if (id === "p") {
      setPLants([...plants, { plant: { name: "", quantity: 0 } }]);
    }
  };

  const handleRemove = (index, id) => {
    if (id === "f") {
      const values = [...fish];
      values.splice(index, 1);
      setFish(values);
    } else if (id === "p") {
      const values = [...plants];
      values.splice(index, 1);
      setPLants(values);
    }
  };
  return (
    <div>
      <Navi />
      <div className={style.NewAquaContainer}>
        <h1 className={style.NewAquaHeader}>Dodaj akwarium</h1>
        <form className={style.NewAquaForm}>
          <div>
            <legend>Ryby</legend>
            {fish.map((fish, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  value={fish.fish.name}
                  onChange={(event) => handleChange(index, event, "f")}
                />
                <input
                  type="number"
                  name="quantity"
                  value={fish.fish.quantity}
                  onChange={(event) => handleChange(index, event, "f")}
                />
                <button type="button" onClick={() => handleRemove(index, "f")}>
                <img src={Delete} alt=""/>
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAdd("f")}>
            <img src={Plus} alt=""/>
            </button>
          </div>

          <div>
            <legend>Rośliny</legend>
            {plants.map((plant, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  value={plant.plant.name}
                  onChange={(event) => handleChange(index, event, "p")}
                />
                <input
                  type="number"
                  name="quantity"
                  value={plant.plant.quantity}
                  onChange={(event) => handleChange(index, event, "p")}
                />
                <button type="button" onClick={() => handleRemove(index, "p")}>
                <img src={Delete} alt=""/>
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAdd("p")}>
              <img src={Plus} alt=""/>
            </button>
          </div>
        </form>
        <NavLink className={style.BackBtn} to="/profile/myaqua">
          Powrót
        </NavLink>
      </div>
    </div>
  );
};

export default MoreInformation;
