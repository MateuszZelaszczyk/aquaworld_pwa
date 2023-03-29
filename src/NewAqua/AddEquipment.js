import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoWindow from "../InfoWindow/InfoWindow";
const AddEquipment = () => {
  const [color, setColor] = useState("red");
  const [info, setInfo] = useState("");
  const [header, setHeader] = useState("");
  const token = localStorage.getItem("access");
  const [light, setLight] = useState("");
  const [filter, setFilter] = useState("");
  const [heat, setHeat] = useState("");
  const [CO2, setCO2] = useState("");
  const [control, setControl] = useState("");
  const [other, setOther] = useState("");
  const aquarium = useParams().id;
  const [show, setShow] = useState(false);
  const id = useParams().id;
  const [isEquipment, setIsEquipment] = useState(false);
  const [EquipmentId, setEquipmentId] = useState(null);

  const checkEquipments = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/equipmentInfo/${id}/`
    );
    setIsEquipment(response.data["isEquipments"]);
    if (response.data["isEquipments"] === true) {
      setLight(response.data["equipments"][0]["lighting"]);
      setFilter(response.data["equipments"][0]["filtering"]);
      setHeat(response.data["equipments"][0]["heating"]);
      setCO2(response.data["equipments"][0]["CO2"]);
      setControl(response.data["equipments"][0]["control"]);
      setOther(response.data["equipments"][0]["other"]);
      setEquipmentId(response.data["equipments"][0]["id"]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isEquipment===true){
    axios
      .put(
        `http://localhost:8000/api/equipments/${EquipmentId}/`,
        {
          aquarium: aquarium,
          lighting: light,
          filtering: filter,
          heating: heat,
          CO2: CO2,
          control: control,
          other: other,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setHeader("Udało się");
        setInfo("Dane zostały zapisane");
        setColor("green");
        setShow(true);
      })
      .catch((err) => {
        if (err.response) {
          setHeader("Błąd!");
          setInfo(err.response.data + err.response.status);
          setColor("red");
          setShow(true);
        } else {
          setHeader("Błąd!");
          setInfo("Error" + err.message);
          setColor("red");
          setShow(true);
        }
      });
    }
    else{
      axios
      .post(
        `http://localhost:8000/api/equipments/`,
        {
          aquarium: aquarium,
          lighting: light,
          filtering: filter,
          heating: heat,
          CO2: CO2,
          control: control,
          other: other,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setHeader("Udało się");
        setInfo("Dane zostały zapisane");
        setColor("green");
        setShow(true);
      })
      .catch((err) => {
        if (err.response) {
          setHeader("Błąd!");
          setInfo(err.response.data + err.response.status);
          setColor("red");
          setShow(true);
        } else {
          setHeader("Błąd!");
          setInfo("Error" + err.message);
          setColor("red");
          setShow(true);
        }
      });
    }
  };
  useEffect(() => {
    checkEquipments();
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);
  return (
    <div>
      <Navi show={"none"} />
      <div className={style.NewEquipContainer}>
        <h1 className={style.NewAquaHeader}>Uzupełnij wyposażenie</h1>
        <form className={style.NewAquaForm} onSubmit={handleSubmit}>
          <label className={style.NewAquaFormLabel} htmlFor="light">
            Oświetlenie
          </label>
          <input
            className={style.NewAquaFormInput}
            name="light"
            type="text"
            value={light}
            onChange={(e) => setLight(e.target.value)}
          />
          <label className={style.NewAquaFormLabel} htmlFor="filtration">
            Filtracja
          </label>
          <input
            className={style.NewAquaFormInput}
            name="filtration"
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label className={style.NewAquaFormLabel} htmlFor="TempControl">
            Ogrzewanie
          </label>
          <input
            className={style.NewAquaFormInput}
            name="TempControl"
            type="text"
            value={heat}
            onChange={(e) => setHeat(e.target.value)}
          />
          <label className={style.NewAquaFormLabel} htmlFor="CO2">
            CO2
          </label>
          <input
            className={style.NewAquaFormInput}
            name="CO2"
            type="text"
            value={CO2}
            onChange={(e) => setCO2(e.target.value)}
          />
          <label className={style.NewAquaFormLabel} htmlFor="Control">
            Sterowanie
          </label>
          <input
            className={style.NewAquaFormInput}
            name="Control"
            type="text"
            value={control}
            onChange={(e) => setControl(e.target.value)}
          />
          <label className={style.NewAquaFormLabel} htmlFor="Others">
            Inne
          </label>
          <textarea
            className={style.NewAquaFormInput}
            name="Others"
            value={other}
            onChange={(e) => setOther(e.target.value)}
          />
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

export default AddEquipment;
