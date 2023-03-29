import React, { useState } from "react";
import style from "./MoreInformation.module.css";
import Edit from "../Assets/edit.svg";
import Check from "../Assets/check.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
const FishRow =(props)=> {
  const fish = props.fish;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(fish.name);
  const [quantity, setQuantity] = useState(fish.quantity);
  const token = localStorage.getItem("access");
  const id = useParams().id;
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    axios
      .put(
        `http://localhost:8000/api/fish/${fish.id}/`,
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
    <div className={style.Fish} key={props.fish.id}>
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      ) : (
        <p>{fish.name}: </p>
      )}
      {isEditing ? (
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      ) : (
        <p>{fish.quantity}szt</p>
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
export default FishRow;
