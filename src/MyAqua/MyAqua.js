import React, { useState, useEffect } from "react";
import Navi from "../MainPage/Navi";
import style from "./MyAqua.module.css";
import Foto from "../Assets/IconFish.png";
import { NavLink } from "react-router-dom";
import FormMenu from "./FormMenu/FormMenu.js";
import axios from "axios";
const MyAqua = () => {
  const token = localStorage.getItem("access");
  
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get("http://localhost:8000/api/aquariums/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setData(response.data);
    console.log(response.data);
  };
  const deleteAqua = async (id) => {
    await axios.delete(
      `http://localhost:8000/api/aquariums/${id}/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    getData();
  };
  function handleVisibleCl(index) {
    setVisible(!visible);
    setId(index);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={style.MainContainer}>
      <Navi show={"none"} />
      <div className={style.AquaContainer}>
        <div className={style.HeadContainer}>
          <p className={style.Head1}></p>
          <p className={style.Head2}>Nazwa</p>
          <p className={style.Head3}>Pojmeność (l)</p>
          <p className={style.Head4}>Wymiary (cm)</p>
          <p className={style.Head5}>Data założenia</p>
          <p className={style.Head6}>Rodzaj</p>
          <p className={style.Head7}></p>
        </div>
        {data.map((aquarium, index) => (
          <div key={index} className={style.ItemContainer}>
            <p className={style.Head}></p>
            <img className={style.AquaFoto} alt="" src={aquarium.image} />
            <p className={style.Head}>Nazwa:</p>
            <p className={style.Para1}>{aquarium.name}</p>
            <p className={style.Head}>Pojmeność (l):</p>
            <p className={style.Para2}>{aquarium.capacity}</p>
            <p className={style.Head}>Wymiary (cm):</p>
            <div className={style.SizeContainer}>
              <div className={style.Size}>
                <p className={style.SizeParagraph}>Sz: {aquarium.length}</p>
                <p className={style.SizeParagraph}>Wy: {aquarium.height}</p>
                <p className={style.SizeParagraph}>Gł: {aquarium.depth}</p>
              </div>
            </div>
            <p className={style.Head}>Data założenia:</p>
            <p className={style.Para3}>{aquarium.startDate}</p>
            <p className={style.Head}>Rodzaj:</p>
            <p className={style.Para4}>{aquarium.type}</p>
            <div className={style.BtnContainer}>
              <button className={style.MoreInfoBtn}>
                <NavLink
                  className={style.Link}
                  to={`/profile/myaqua/moreinformations/${aquarium.id}`}
                >
                  Szczegóły
                </NavLink>
              </button>
              <button
                className={style.MoreBtn}
                onClick={() => handleVisibleCl(aquarium.id)}
              >
                + Informacje
              </button>
              <button className={style.EditBtn}>Edytuj</button>
              <button
                onClick={() => deleteAqua(aquarium.id)}
                className={style.DeleteBtn}
              >
                Usuń
              </button>
            </div>
            {id === aquarium.id && visible && (
              <FormMenu visible={handleVisibleCl} index={id} actual={visible} />
            )}
          </div>
        ))}
      </div>
      <button className={style.BackBtn}>
        <NavLink
          to="/profile/mainpage"
          style={{ color: "black", textDecoration: "none" }}
        >
          Strona główna
        </NavLink>
      </button>
    </div>
  );
};

export default MyAqua;
