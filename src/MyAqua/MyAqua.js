import React, { useState } from "react";
import Navi from "../MainPage/Navi";
import style from "./MyAqua.module.css";
import Foto from "../Assets/IconFish.png";
import { NavLink } from "react-router-dom";
import FormMenu from "./FormMenu/FormMenu.js";

const data = [
  {
    name: "ogólne",
    pojemnosc: 375,
    wymiary: [{ szerokosc: 150, wysokosc: 50, glebokosc: 50 }],
    zalozono: "10-11-2022",
    rodzaj: "słodkowodne",
    zdjecie: Foto,
  },
  {
    name: "gupikarium",
    pojemnosc: 54,
    wymiary: [{ szerokosc: 50, wysokosc: 35, glebokosc: 25 }],
    zalozono: "10-11-2012",
    rodzaj: "słodkowodne",
    zdjecie: Foto,
  },
];
const MyAqua = () => {
  const [visible, setVisible] = useState(false);
  const [id, setId] =useState()

  function handleVisibleCl( index) {
    setVisible(!visible);
    setId(index);
  }
  return ( 
    <div className={style.MainContainer}>
      <Navi />
      <div className={style.AquaContainer}>
        <div className={style.HeadContainer}>
          <p className={style.Head1}>Zdjęcie</p>
          <p className={style.Head2}>Nazwa</p>
          <p className={style.Head3}>Pojmeność (l)</p>
          <p className={style.Head4}>Wymiary (cm)</p>
          <p className={style.Head5}>Data założenia</p>
          <p className={style.Head6}>Rodzaj</p>
          <p className={style.Head7}></p>
        </div>
        {data.map((fish, index) => (
          <div key={index} className={style.ItemContainer}>
            <img className={style.AquaFoto} alt="" src={fish.zdjecie} />
            <p className={style.Para1}>{fish.name}</p>
            <p className={style.Para2}>{fish.pojemnosc}</p>
            <div className={style.SizeContainer}>
              {fish.wymiary.map((size, ind) => (
                <div className={style.Size} key={ind}>
                  <p className={style.SizeParagraph}>Sz: {size.szerokosc}</p>
                  <p className={style.SizeParagraph}>Wy: {size.wysokosc}</p>
                  <p className={style.SizeParagraph}>Gł: {size.glebokosc}</p>
                </div>
              ))}
            </div>
            <p className={style.Para3}>{fish.zalozono}</p>
            <p className={style.Para4}>{fish.rodzaj}</p>
            <div className={style.BtnContainer}>
              <button className={style.MoreInfoBtn}>Szczegóły</button>
              <button className={style.MoreBtn} onClick={() => handleVisibleCl(index)}>
                  + Informacje
              </button>
              <button className={style.EditBtn}>Edytuj</button>
              <button className={style.DeleteBtn}>Usuń</button>
            </div>
            {id===index &&visible && <FormMenu visible={handleVisibleCl} index={id} actual={visible} />}
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
