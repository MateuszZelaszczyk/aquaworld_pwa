import React, { useState } from 'react';
import Avatar from "../../Assets/Avatar.png";
import style from "./Modal.module.css"
const UserAvatar =(props)=> {
    const [avatarShow, setAvatarShow] = useState(null);
    const [avatarURL, setAvatarURL] = useState(Avatar);
    const update = (e) => {
      setAvatarURL(e.target.files[0]);
      var file = e.target.files[0];
      const objectURL = URL.createObjectURL(file);
      setAvatarShow(objectURL);
    };

  const submitHandler = event => {
    event.preventDefault();
    // Do something with the selectedFile
    // For example, upload it to a server or display it in the app
  };

  return (
    <form onSubmit={submitHandler}>
          <div className={style.File}>
              <label htmlFor="foto">Wybierz zdjęcie</label>
            <input
              className={style.NewAquaFoto}
              type="file"
              alt=""
              name="foto"
              id="foto"
              onChange={(e) => update(e)}
            ></input>
            <img className={style.Avatar} src={avatarShow} alt=""></img>
          </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default UserAvatar;