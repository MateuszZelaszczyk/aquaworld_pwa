import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import Plus from "../Assets/plus.svg";
import Delete from "../Assets/delete.svg";
import axios from "axios";

import InfoWindow from "../InfoWindow/InfoWindow";
const AddFish = () => {
  const [color, setColor] = useState("red");
  const [info, setInfo] = useState("");
  const [header, setHeader] = useState("");
  const token = localStorage.getItem("access");
  const aquarium = useParams().id;
  const [show, setShow] = useState(false);
  const [fish, setFish] = useState([
    { name: "", quantity: 0, aquarium: aquarium },
  ]);
  const handleChange = (index, event) => {
    const values = [...fish];
    values[index][event.target.name] = event.target.value;
    setFish(values);
  };
  const handleAdd = () => {
    setFish([...fish, { name: "", quantity: 0, aquarium: aquarium }]);
  };

  const handleRemove = (index) => {
    const values = [...fish];
    values.splice(index, 1);
    setFish(values);
  };
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/fish/",
        { fish },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setHeader("Udało się");
        setInfo("Dane zostały zapisane");
        setColor("green");
        setShow(true);
        setFish([]);
      })
      .catch((err) => {
        if (err.response) {
          if (
            err.response.data[0]["non_field_errors"] &&
            err.response.data[0]["non_field_errors"].includes(
              "The fields aquarium, name must make a unique set."
            )
          ) {
            setHeader("Błąd!");
            setInfo("W tym akwarium są już ryby z tego gatunku");
            setColor("red");
            setShow(true);
          } else {
            setHeader("Błąd!");
            setInfo(err.response.data + err.response.status);
            setColor("red");
            setShow(true);
          }
        }
        else if(err.request){
          setHeader("Błąd!");
          setInfo(err.request);
          setColor("red");
          setShow(true);
        }
        else{
          setHeader("Błąd!");
          setInfo("Error" + err.message);
          setColor("red");
          setShow(true);
        }
      });
  };
  return (
    <div>
      <Navi show={"none"} />
      <div className={style.NewFishContainer}>
        <h1 className={style.NewAquaHeader}>Czas na nowe ryby</h1>
        <form className={style.NewAquaForm} onSubmit={handleSubmit}>
          <div>
            <div className={style.LabelContainer}>
              <label htmlFor="name">Gatunek</label>
              <label htmlFor="quantity" className={style.QuantityLabel}>
                Ilość
              </label>
            </div>

            {fish.map((fish, index) => (
              <div key={index}>
                <input
                  className={style.NameInput}
                  type="text"
                  name="name"
                  value={fish.name}
                  onChange={(event) => handleChange(index, event)}
                  required
                />
                <input
                  className={style.NumberInput}
                  type="number"
                  name="quantity"
                  min={1}
                  value={fish.quantity}
                  onChange={(event) => handleChange(index, event)}
                  required
                />
                <button
                  className={style.Deletebtn}
                  type="button"
                  onClick={() => handleRemove(index)}
                >
                  <img src={Delete} alt="" />
                </button>
              </div>
            ))}
            <button
              className={style.PlusBtn}
              type="button"
              onClick={() => handleAdd()}
            >
              <img src={Plus} alt="" />
            </button>
          </div>
          <button type="submit" className={style.Save}>
            Zapisz
          </button>
        </form>
        <NavLink className={style.BackBtn} to="/profile/myaqua">
          Powrót
        </NavLink>
      </div>
      {show && (
        <InfoWindow message={info} show={show} header={header} color={color} />
      )}
    </div>
  );
};

export default AddFish;
