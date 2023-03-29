import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import axios from "axios";
import InfoWindow from "../InfoWindow/InfoWindow";
import { useParams } from "react-router-dom";


const AddBase = () => {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("red");
  const [info, setInfo] = useState("");
  const [header, setHeader] = useState("");
  const token = localStorage.getItem("access");
  const [base, setBase] = useState("");
  const [substrate, setSubstrate] = useState("");
  const aquarium = useParams().id;
  const id = useParams().id;
  const [isGround, setIsGround] = useState(false);
  const [baseId, setBaseId] = useState(null);

  const checkGround = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/groundInfo/${id}/`
    );
    setIsGround(response.data["isGround"]);
    if (response.data["isGround"] === true) {
      setBase(response.data["ground"][0]["base"]);
      setSubstrate(response.data["ground"][0]["substrate"]);
      setBaseId(response.data["ground"][0]["id"]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGround === true) {
      axios
        .put(
          `http://localhost:8000/api/ground/${baseId}/`,
          {
            aquarium: aquarium,
            substrate: substrate,
            base: base,
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
          setSubstrate("");
          setBase("");
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
    } else {
      axios
        .post(
          "http://localhost:8000/api/ground/",
          {
            aquarium: aquarium,
            substrate: substrate,
            base: base,
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
          setSubstrate("");
          setBase("");
        })
        .catch((err) => {
          if (err.response) {
            setHeader("Błąd!");
            setInfo(err.response.data + err.response.status);
            setColor("red");
            setShow(true);
          }else {
            setHeader("Błąd!");
            setInfo("Error" + err.message);
            setColor("red");
            setShow(true);
          }
        });
    }
  };
  useEffect(() => {
    checkGround();
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
      <div className={style.NewBaseContainer}>
        <h1 className={style.NewAquaHeader}>Jakie masz podłoże</h1>
        <form className={style.NewAquaForm} onSubmit={handleSubmit}>
          <label className={style.NewAquaFormLabel} htmlFor="substrate">
            Substrat
          </label>
          <input
            className={style.NewAquaFormInput}
            placeholder="W przypadku braku zostaw pole puste"
            name="substrate"
            type="text"
            value={substrate}
            onChange={(e) => setSubstrate(e.target.value)}
          />
          <label className={style.NewAquaFormLabel} htmlFor="base">
            Wierzchnia warstwa
          </label>
          <input
            className={style.NewAquaFormInput}
            name="base"
            type="text"
            value={base}
            onChange={(e) => setBase(e.target.value)}
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

export default AddBase;
