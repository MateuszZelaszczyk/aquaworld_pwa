import React, { useState } from "react";
import Navi from "../MainPage/Navi";
import style from "./MyAqua.module.css";
import Foto from "../Assets/IconFish.png";

const data = [
  {
    name: "ogólne",
    pojemnosc: 375,
    wymiary: [{ szerokosc: 150, wysokosc: 50, glebokosc: 50 }],
    zalozono: "10-11-2022",
    rodzaj: "słodkowodne",
    zdjecie: { Foto },
  },
  {
    name: "gupikarium",
    pojemnosc: 54,
    wymiary: [{ szerokosc: 50, wysokosc: 35, glebokosc: 25 }],
    zalozono: "10-11-2012",
    rodzaj: "słodkowodne",
    zdjecie: { Foto },
  },
];
const MyAqua = () => {
  return (
    <div className={style.MainContainer}>
      <Navi />
      <div className={style.AquaContainer}>
        {data.map((fish, index) => (
          <div key={index}>
            <p>Nazwa: {fish.name}</p>
            <p>Pojmeność zbiornika: {fish.pojemnosc}</p>
            <div>
              Wymiary:{" "}
              {fish.wymiary.map((size, ind) => (
                <div key={ind}>
                  <p>Szerokość: {size.szerokosc}</p>
                  <p>Wysokość: {size.wysokosc}</p>
                  <p>Głębokość: {size.glebokosc}</p>
                </div>
              ))}
            </div>
            <p>Data założenia: {fish.zalozono}</p>
            <p>Rodzaj akwarium: {fish.rodzaj}</p>
            <button>Dodaj więcej informacji</button>
            <button>Edytuj</button>
            <button>Usuń</button>
          </div>
        ))}
        <button>Strona główna</button>
      </div>
    </div>
  );
};

export default MyAqua;
