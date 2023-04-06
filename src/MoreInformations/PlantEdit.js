import React, { useState } from "react";
import style from "./MoreInformation.module.css";
import Edit from "../Assets/edit.svg";
import Check from "../Assets/check.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
const PlantRow =(props)=> {
  const plant = props.plant;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(plant.name);
  const [quantity, setQuantity] = useState(plant.quantity);
  const token = localStorage.getItem("access");
  const id = useParams().id;
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/plants/${plant.id}/`,
        {
          aquarium: id,
          name: name,
          quantity: quantity,
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
    <div className={style.Plant} key={props.plant.id}>
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      ) : (
        <p>{plant.name}: </p>
      )}
      {isEditing ? (
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      ) : (
        <p>{plant.quantity}szt</p>
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
export default PlantRow;
