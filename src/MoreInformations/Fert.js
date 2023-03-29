import React, { useState } from "react";
import style from "./MoreInformation.module.css";
import Edit from "../Assets/edit.svg";
import Check from "../Assets/check.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
const FertRow =(props)=> {
  const fert = props.fert;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(fert.name);
  const [dose, setQuantity] = useState(fert.dose);
  const token = localStorage.getItem("access");
  const id = useParams().id;
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    axios
      .put(
        `http://localhost:8000/api/fertilization/${fert.id}/`,
        {
          aquarium: id,
          name: name,
          dose: dose,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        props.getInfo();
        setIsEditing(false);
      });
  };

  return (
    <div className={style.Fertilizer} key={props.fert.id}>
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      ) : (
        <p>{fert.name}: </p>
      )}
      {isEditing ? (
        <input
          type="number"
          value={dose}
          onChange={(event) => setQuantity(event.target.value)}
        />
      ) : (
        <p>{fert.dose}mg/l</p>
      )}
      {isEditing ? (
        <button className={style.EditBtn} onClick={handleSaveClick}>
          <img alt="" src={Check} />
        </button>
      ) : (
        <button className={style.EditBtn} onClick={handleEditClick}>
          <img alt="" src={Edit} />
        </button>
      )}
    </div>
  );
}
export default FertRow;
