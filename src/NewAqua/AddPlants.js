import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import Plus from "../Assets/plus.svg";
import Delete from "../Assets/delete.svg";
import axios  from "axios";
import { useParams } from "react-router-dom";
import InfoWindow from "../InfoWindow/InfoWindow";
const AddPlants = () => {
  const [color, setColor] = useState("red");
  const [info, setInfo] = useState("");
  const [header, setHeader] = useState("");
  const token = localStorage.getItem("access");
  const aquarium = useParams().id;
  const [show, setShow] = useState(false);
  const [plants, setPLants] = useState([ { name: "", quantity: 0, aquarium: aquarium }]);
  const handleChange = (index, event, id) => {
    const values = [...plants];
    values[index][event.target.name] = event.target.value;
    setPLants(values);
  };
  const handleAdd = (id) => {
      setPLants([...plants, { name: "", quantity: 0, aquarium: aquarium } ]);
  };

  const handleRemove = (index, id) => {
      const values = [...plants];
      values.splice(index, 1);
      setPLants(values);
  };
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false)
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/plants/`,
        { plants },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setHeader("Udało się");
        setInfo("Dane zostały zapisane")
        setColor("green");
        setShow(true);
        setPLants([ { name: "", quantity: 0, aquarium: aquarium }]);
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
            setInfo("W tym akwarium są już rośliny z tego gatunku");
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
      <Navi show={'none'} />
      <div className={style.NewPlantsContainer}>
        <h1 className={style.NewAquaHeader}>Czas na nowe rośliny</h1>
        <form className={style.NewAquaForm} onSubmit={handleSubmit}>
          
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
                  value={plant.name}
                  onChange={(event) => handleChange(index, event, "p")}
                  required
                />
                <input
                 className={style.NumberInput}
                  type="number"
                  name="quantity"
                  min={0}
                  value={plant.quantity}
                  onChange={(event) => handleChange(index, event, "p")}
                  required
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
      {show &&<InfoWindow message={info} show={show} header= {header} color={color}/>}
    </div>
  );
};

export default AddPlants;
