import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import Plus from "../Assets/plus.svg";
import Delete from "../Assets/delete.svg";
import { useParams } from "react-router-dom";
import InfoWindow from "../InfoWindow/InfoWindow";
import axios from "axios";
const AddFertilizer = () => {
  const [color, setColor] = useState("red");
  const [info, setInfo] = useState("");
  const [header, setHeader] = useState("");
  const token = localStorage.getItem("access");
  const aquarium = useParams().id;
  const [show, setShow] = useState(false);
  const [fertilizer, setFertilizer] = useState([ { name: "", dose: 0, aquarium: aquarium }]);
  const handleChange = (index, event, id) => {
      const values = [...fertilizer];
      values[index][event.target.name] = event.target.value;
      setFertilizer(values);
  };
  const handleAdd = () => {

      setFertilizer([...fertilizer,  { name: "", dose: 0, aquarium: aquarium }]);

  };

  const handleRemove = (index, id) => {
      const values = [...fertilizer];
      values.splice(index, 1);
      setFertilizer(values);
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
        `${process.env.REACT_APP_API_URL}/api/fertilization/`,
        { fertilizer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setHeader("Udało się");
        setInfo("Dane zostały zapisane");
        setColor("green");
        setShow(true);
        setFertilizer([ { name: "", dose: 0, aquarium: aquarium }]);
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
            setInfo("W tym akwarium jest już stosowany taki nawóz");
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
      <Navi show={'none'}  />
      <div className={style.NewFertContainer}>
        <h1 className={style.NewAquaHeader}>Dodaj nawóz</h1>
        <form className={style.NewAquaForm} onSubmit={handleSubmit}>
          <div>
          <div className={style.LabelContainer}>
              <label htmlFor="name">Nazwa</label>
              <label htmlFor="dose" className={style.QuantityLabel}>Dawka {"("}ml/tyg{")"}</label>
            </div>
            {fertilizer.map((fertilizer, index) => (
              <div key={index}>
                <input className={style.NameInput}
                  type="text"
                  name="name"
                  value={fertilizer.name}
                  onChange={(event) => handleChange(index, event, "f")}
                  required
                />
                <input className={style.NumberInput}
                  type="number"
                  name="dose"
                  min={0}
                  value={fertilizer.dose}
                  onChange={(event) => handleChange(index, event, "f")}
                  required
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
          <button type="submit" className={style.Save}>Zapisz</button>
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

export default AddFertilizer;
