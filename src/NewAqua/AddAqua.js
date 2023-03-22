import React, { useState } from "react";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import styleField from "../AddPost/AddPost.module.css";
import Avatar from "../Assets/Avatar.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
const NewAqua = () => {
  const token = localStorage.getItem('access')

  const [avatarShow, setAvatarShow] = useState(null);
  const [image, setImage] = useState(Avatar);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [depth, setDepth] = useState(0);
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      capacity,
      height,
      length,
      depth,
      type,
      startDate,
      image: image,
    };
    axios
      .post("http://localhost:8000/api/aquariums/", data, {
        headers: { "Content-Type": "multipart/form-data",Authorization:`Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setName("");
        setCapacity(0);
        setHeight(0);
        setLength(0);
        setDepth(0);
        setStartDate("");
        setType("");
      });
  };
  const update = (e) => {
    setImage(e.target.files[0]);
    var file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setAvatarShow(objectURL);
  };
  return (
    <div>
      <Navi show={"none"} />
      <div className={style.NewAquaContainer}>
        <h1 className={style.NewAquaHeader}>Dodaj akwarium</h1>
        <form className={style.NewAquaForm} onSubmit={handleSubmit}>
          <label className={style.NewAquaFormLabel} htmlFor="name">
            Nazwa
          </label>
          <input
            className={style.NewAquaFormInput}
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className={style.NewAquaFormLabel} htmlFor="capacity">
            Pojemność
          </label>
          <input
            className={style.NewAquaFormInput}
            type="number"
            id="capacity"
            name="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
          <div className={style.SizeContainer}>
            <legend className={style.SizeLegend}>Wymiary</legend>
            <div>
              <label className={style.NewAquaFormLabel} htmlFor="width">
                Szerokość
              </label>
              <input
                className={style.NewAquaSize}
                type="number"
                id="width"
                name="width"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={style.NewAquaFormLabel} htmlFor="height">
                Wysokość
              </label>
              <input
                className={style.NewAquaSize}
                type="number"
                id="height"
                name="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={style.NewAquaFormLabel} htmlFor="depth">
                Głębokość
              </label>
              <input
                className={style.NewAquaSize}
                type="number"
                id="depth"
                name="depth"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                required
              />
            </div>
          </div>
          <label className={style.NewAquaFormLabel} htmlFor="start">
            Data założenia
          </label>
          <input
            className={style.NewAquaFormInput}
            type="date"
            id="start"
            name="start"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <select
            className={style.AquaTypeContainer}
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option></option>
            <option className={style.NewAquaType} value="słodkowodne">
              Słodkowodne
            </option>

            <option className={style.NewAquaType} value="słonowodne">
              Słonowodne
            </option>
          </select>

          <div className={styleField.File}>
            <label htmlFor="foto">Wybierz zdjęcie</label>
            <input
              className={styleField.NewAquaFoto}
              type="file"
              alt=""
              name="foto"
              id="foto"
              onChange={(e) => update(e)}
            ></input>
            <img className={style.Avatar} src={avatarShow} alt=""></img>
          </div>
          <div className={style.BtnContainer}>
            <button className={style.Back}>
              <NavLink to="/profile/mainpage" className={style.BackLink}>
                Anuluj
              </NavLink>
            </button>
            <button type="submit" className={style.Save}>
              Zapisz
            </button>
          </div>
        </form>
      </div>
      <div style={{ height: "30px", margin: "30px" }}></div>
    </div>
  );
};

export default NewAqua;
