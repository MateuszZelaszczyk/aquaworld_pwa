import React, { useState } from "react";
import Navi from "../MainPage/Navi";
import style from "./AddPost.module.css";
import Avatar from "../Assets/Avatar.png";
import { NavLink } from "react-router-dom";
const NewPost = () => {
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
      <Navi />
      <div className={style.NewPostContainer}>
        <h1 className={style.NewPostHeader}>Nowy post</h1>
        <form className={style.PostForm}>
          <label className={style.NewPostLabel} htmlFor="title">
            Tytuł
          </label>
          <input
            className={style.PostTitle}
            required
            name="title"
            type="text"
            placeholder="Podaj tytuł..."
          />
          <label className={style.NewPostLabel} htmlFor="describe">
            Opisz swój problem
          </label>
          <textarea
            className={style.PostDescribe}
            required
            name="describe"
            placeholder="Napisz o co chodzi"
          />
          <label className={style.NewPostLabel} htmlFor="foto">
            Załącz zdjęcie
          </label>
          <div>
            <input
              className={style.NewPostFile}
              onChange={(e) => update(e)}
              name="foto"
              type="file"
            ></input>
            <img className={style.Foto} src={avatarShow} alt=""></img>
          </div>
          <div className={style.NewPostType}>
            <legend className={style.Legend} htmlFor="isPublic">
              Widoczność postu
            </legend>
            <div className={style.RadioContainer}>
              <label className={style.NewPostLabel} htmlFor="isPublic">
                Publiczny
              </label>
              <input
                className={style.NewPostVisible}
                name="isPublic"
                type="radio"
                value="public"
              />
            </div>
            <div className={style.RadioContainer}>
              <label className={style.NewPostLabel} htmlFor="isPublic">
                Tylko znajomi
              </label>
              <input
                className={style.NewPostVisible}
                name="isPublic"
                type="radio"
                value="private"
              />
            </div>
          </div>
          <div className={style.BtnContainer}>
            <button type="submit" className={style.Save}>
              Utwórz
            </button>
            <button className={style.Back}>
              <NavLink to="/mainpage" className={style.Back}>
                Anuluj
              </NavLink>
            </button>
          </div>
        </form>
      </div>
      <div style={{height:"30px", margin:"30px"}}></div>
    </div>
  );
};

export default NewPost;
