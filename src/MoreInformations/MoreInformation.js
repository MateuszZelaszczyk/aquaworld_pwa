import React, { useState } from "react";
import style from "./MoreInformation.module.css";
import Navi from "../MainPage/Navi";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Edit from "../Assets/edit.svg";
import Check from "../Assets/check.svg";
import FishRow from "./FishEdit";
import PlantRow from "./PlantEdit";
import FertRow from "./Fert";
const MoreInformation = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [aquarium, setAquarium] = useState([" "]);
  const [fish, setFish] = useState([" "]);
  const [plants, setPlants] = useState([" "]);
  const [equipments, setEquipments] = useState([" "]);
  const [ground, setGround] = useState([" "]);
  const [fertilize, setfertilize] = useState([" "]);
  const token = localStorage.getItem("access");
  const id = useParams().id;
  const getInfo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/aquaInfo/` + id + "/",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    setAquarium(data["aquarium"]);
    setFish(data["fish"]);
    setPlants(data["plants"]);
    if(data["equipments"][0]){
    setEquipments(data["equipments"]);
    }
    setfertilize(data["fertilizers"]);
    if (data["base"][0]) {
      setGround(data["base"]);
    }
    setIsLoad(true);
  };
  useEffect(() => {
    getInfo();
  }, []);

  return isLoad ? (
    <div className={style.MainContainer}>
      <Navi show={"none"} />
      <div className={style.InfoContainer}>
        <div className={style.ItemContainer}>
          <div className={style.BaseInformation}>
            <img
              className={style.Foto}
              alt=""
              src={`${process.env.REACT_APP_API_URL}/media/` + aquarium[0].image}
            />
            <p className={style.Name}>
              <span>Akwarium</span> {aquarium[0].name}, {aquarium[0].type}{" "}
              <span>Pojemność </span>
              {aquarium[0].capacity} litrów {"("}
              {aquarium[0].length} x {aquarium[0].height} x {aquarium[0].depth}
              {")"}
            </p>
            <p className={style.Date}>
              <span>Założono:</span> {aquarium[0].startDate}
            </p>
            <NavLink className={style.Link} to="/profile/myaqua">
              Wróć
            </NavLink>
          </div>
          <div className={style.EquipmentContainer}>
            <h3 className={style.EquipmentHeader}>Wyposażenie</h3>
            <p className={style.Light}>
              <span>Oświetlenie:</span> {equipments[0].lighting}
            </p>
            <p className={style.Filtering}>
              <span>Filtracja:</span> {equipments[0].filtering}
            </p>
            <p className={style.Warm}>
              <span> Ogrzewanie: </span>
              {equipments[0].heating}
            </p>
            <p className={style.Co2}>
              <span>CO2:</span> {equipments[0].CO2}
            </p>
            <p className={style.Control}>
              <span>Sterowanie:</span> {equipments[0].control}
            </p>
            <p className={style.Other}>
              <span>Inne:</span> {equipments[0].other}
            </p>

            <p className={style.SubBase}>
              <span>Substrat:</span> {ground[0].substrate}
            </p>
            <p className={style.Base}>
              <span>Podłoże główne: </span>
              {ground[0].base}
            </p>
          </div>
          <div className={style.Container}>
            <div className={style.FishContainer}>
              <h4 className={style.FishHeader}>Ryby:</h4>
              {fish.map((fish) => (
                <FishRow key={fish.id} fish={fish} getInfo={getInfo}/>
              ))}
            </div>
            <div className={style.PlantsContainer}>
              <h4 className={style.PlantsHeader}>Rośliny:</h4>
              {plants.map((plant, id) => (
                 <PlantRow key={plant.id} plant={plant} getInfo={getInfo}/>
              ))}
            </div>
            <div className={style.FertilizerContainer}>
              <h4 className={style.FertilizerHeader}>Nawożenie:</h4>
              {fertilize.map((fert, id) => (
                <FertRow key={fert.id} fert={fert} getInfo={getInfo}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Czekaj...</div>
  );
};

export default MoreInformation;
