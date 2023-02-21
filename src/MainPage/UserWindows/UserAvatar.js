import React, { useState } from "react";
import Avatar from "../../Assets/Avatar.png";
import style from "./Modal.module.css";
import Close from "../../Assets/close.svg";
const UserAvatar = (props) => {
  const [avatarShow, setAvatarShow] = useState(null);
  const [avatarURL, setAvatarURL] = useState(Avatar);
  const update = (e) => {
    setAvatarURL(e.target.files[0]);
    var file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setAvatarShow(objectURL);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // Do something with the selectedFile
    // For example, upload it to a server or display it in the app
  };

  return (
    <div className={style.MainContainer}>
      <div className={style.HeaderContainer}>
        <h3>Dodaj/Edytuj zdjęcie</h3>
        <button className={style.CloseBtn} onClick={props.closeModal}>
          <img alt="" src={Close} />
        </button>
      </div>
      <form onSubmit={submitHandler} className={style.Form}>
        <div className={style.File}>
          <label htmlFor="foto" className={style.Describe}>
            Wybierz zdjęcie
          </label>
          <input
            className={style.NewAvatarFoto}
            type="file"
            alt=""
            name="foto"
            id="foto"
            onChange={(e) => update(e)}
          ></input>
          <img
            className={avatarShow ? style.Avatar : style.Empty}
            src={avatarShow}
            alt=""
          ></img>
        </div>
        <button className={style.Send} type="submit">
          Zapisz
        </button>
      </form>
    </div>
  );
};

export default UserAvatar;
