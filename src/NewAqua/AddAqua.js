import React, { useState } from "react";
import Navi from "../MainPage/Navi";
import style from "./AddAqua.module.css";
import styleField from "../AddPost/AddPost.module.css"
import Avatar from "../Assets/Avatar.png";
import { NavLink } from "react-router-dom";

const NewAqua = () => {
  //const avatarUrl = UserAvatar;
  const [avatarShow, setAvatarShow] = useState(null);
  const [avatarURL, setAvatarURL] = useState(Avatar);
  const update = (e) => {
    setAvatarURL(e.target.files[0]);
    var file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setAvatarShow(objectURL);
  };

  return (
    <div>
      <Navi show={'none'}  />
      <div className={style.NewAquaContainer}>
        <h1 className={style.NewAquaHeader}>Dodaj akwarium</h1>
        <form className={style.NewAquaForm}>
          <label className={style.NewAquaFormLabel} htmlFor="name">
            Nazwa
          </label>
          <input
            className={style.NewAquaFormInput}
            type="text"
            id="name"
            name="name"
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
            required
          />
          <div className={style.AquaTypeContainer}>
            <legend className={style.TypeLegend}>Rodzaj</legend>
            <div className={style.RadioContainer}>
              <label className={style.NewAquaFormLabel} htmlFor="sweet">
                Słodkowodne
              </label>
              <input
                className={style.NewAquaType}
                type="radio"
                id="sweet"
                name="type"
                value="sweet"
              />
            </div>
            <div className={style.RadioContainer}>
              <label className={style.NewAquaFormLabel} htmlFor="salt">
                Słonowodne
              </label>
              <input
                className={style.NewAquaType}
                type="radio"
                id="salt"
                name="type"
                value="salt"
              />
            </div>
          </div>

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
            <button className={style.Back}><NavLink to="/profile/mainpage" className={style.BackLink}>Anuluj</NavLink></button>
            <button type="submit" className={style.Save}>Zapisz</button>
          </div>
        </form>
      </div>
      <div style={{ height: "30px", margin: "30px" }}></div>
    </div>
  );
};

export default NewAqua;
