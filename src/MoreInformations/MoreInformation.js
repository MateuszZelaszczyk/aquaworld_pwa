import React from "react";
import style from "./MoreInformation.module.css";
import Foto from "../Assets/Avatar.png";
import Navi from "../MainPage/Navi";
import { NavLink } from "react-router-dom";
const data = [
  {
    name: "ogólne",
    pojemnosc: 375,
    wymiary: { szerokosc: 150, wysokosc: 50, glebokosc: 50 },
    zalozono: "10-11-2022",
    rodzaj: "słodkowodne",
    zdjecie: Foto,
    ryby: [
      { nazwa: "Skalar", ilosc: 8 },
      { nazwa: "Gurami mozikowe", ilosc: 4 },
      { nazwa: "Neon czerwony", ilosc: 5 },
      { nazwa: "Zwinik czerwonousty", ilosc: 30 },
      { nazwa: "Barwniak czerwonobrzuchy", ilosc: 4 },
      { nazwa: "Zbrojnik niebieski", ilosc: 5 },
      { nazwa: "Bocja wspaniała", ilosc: 2 },
      { nazwa: "Bocja siatkowa", ilosc: 4 },
      { nazwa: "Węgorek ciernisty", ilosc: 2 },
      { nazwa: "Molinezja księżycowa", ilosc: 2 },
      { nazwa: "Gupik Endlera", ilosc: 5 },
    ],
    rosliny: [
      { nazwa: "Orzech wodny", ilosc: 3 },
      { nazwa: "lotos tygrysi", ilosc: 2 },
      { nazwa: "kryptokoryna wendty green", ilosc: 8 },
    ],
    podloze: "Czarny żwirek bazaltowy 1-3mm + piasek ceramiczny 0.3-1mm",
    substrat: "brak",
    wyposazenie: {
      oswietlenie: "Pokrywa z zamontowanymi 2 belkami powerLed po 33w każda",
      filtracja: "Ikola 450 + Aquael turbo 1000",
      ogrzewanie: "HapPet 200w",
      CO2: "brak",
      sterowanie: "Arduino sterujące zapalaniem i gaszeniem oświetlenia",
      inne: "brak",
    },

    nawozenie: [
      { nazwa: "Potas", dawka: 145 },
      { nazwa: "Carbo", dawka: 60 },
      { nazwa: "Fosfor", dawka: 34 },
      { nazwa: "Azot", dawka: 24 },
    ],
  },
];
const MoreInformation = () => {
  return (
    <div className={style.MainContainer}>
      <Navi />
      <div className={style.InfoContainer}>
        {data.map((item, index) => (
          <div key={index} className={style.ItemContainer}>
            <div className={style.BaseInformation}>
              <img className={style.Foto} alt="" src={item.zdjecie} />
              <p className={style.Name}>
                <span>Akwarium</span> {item.name}, {item.rodzaj}{" "}
                <span>Pojemność </span>
                {item.pojemnosc} litrów {"("}
                {item.wymiary.szerokosc} x {item.wymiary.wysokosc} x{" "}
                {item.wymiary.glebokosc}
                {")"}
              </p>
              <p className={style.Date}>
                {" "}
                <span>Założono:</span> {item.zalozono}
              </p>
              <NavLink className={style.Link} to ="/profile/myaqua">Wróć</NavLink>
            </div>
            <div className={style.EquipmentContainer}>
              <h4 className={style.EquipmentHeader}>Wyposażenie:</h4>
              <p className={style.Light}>
                <span>Oświetlenie:</span> {item.wyposazenie.oswietlenie}
              </p>
              <p className={style.Filtering}>
                <span>Filtracja:</span> {item.wyposazenie.filtracja}
              </p>
              <p className={style.Warm}>
                <span> Ogrzewanie: </span>
                {item.wyposazenie.ogrzewanie}
              </p>
              <p className={style.Co2}>
                <span>CO2:</span> {item.wyposazenie.CO2}
              </p>
              <p className={style.Control}>
                <span>Sterowanie:</span> {item.wyposazenie.sterowanie}
              </p>
              <p className={style.Other}>
                <span>Inne:</span> {item.wyposazenie.inne}
              </p>

             
              <p className={style.SubBase}><span>Substrat:</span> {item.substrat}</p>
              <p className={style.Base}><span>Podłoże główne: </span>{item.podloze}</p>
            </div>
            <div className={style.Container}>
              <div className={style.FishContainer}>
                <h4 className={style.FishHeader}>Ryby:</h4>
                {item.ryby.map((ryba, id) => (
                  <div key={id} className={style.Fish}>
                    <p>{ryba.nazwa}: </p>
                    <p>{ryba.ilosc}szt</p>
                  </div>
                ))}
              </div>
              <div className={style.PlantsContainer}>
                <h4 className={style.PlantsHeader}>Rośliny:</h4>
                {item.rosliny.map((roslina, id) => (
                  <div key={id} className={style.Plant}>
                    <p>{roslina.nazwa}:</p>
                    <p>{roslina.ilosc}szt</p>
                  </div>
                ))}
              </div>
              <div className={style.FertilizerContainer}>
                <h4 className={style.FertilizerHeader}>Nawożenie:</h4>
                {item.nawozenie.map((nazwoz, id) => (
                  <div key={id} className={style.Fertilizer}>
                    <p>{nazwoz.nazwa}:</p>
                    <p> {nazwoz.dawka}ml/tyg</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreInformation;
