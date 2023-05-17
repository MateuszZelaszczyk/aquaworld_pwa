import React, { useState, useEffect } from "react";
import Avatar from "../../Assets/Avatar.png";
import style from "./Modal.module.css";
import Close from "../../Assets/close.svg";
import axios from "axios";
const UserAvatar = (props) => {
  const [avatarShow, setAvatarShow] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const[load, setLoad] = useState(false)
  const [id, setId] = useState("");
  const update = (e) => {
    setAvatarURL(e.target.files[0]);
    var file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setAvatarShow(objectURL);
    console.log(e)
  };
  const token = localStorage.getItem("access");
  const getData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/userInfo/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    setAvatarURL(data["user"][0]["image"])
    setId(response.data["id"]);
   setAvatarShow(`${process.env.REACT_APP_API_URL}/media/`+data["user"][0]["image"])
    setLoad(true)
  };
  const updateAvatar = (e) => {
    e.preventDefault();
    console.log(avatarURL)
    const response = axios.put(
      `${process.env.REACT_APP_API_URL}/api/updateAvatar/${id}/`,
      {
        image: avatarURL,
      },
      {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      }
    ).then((response)=>{ props.getInfo(); props.getData()})
  };
  useEffect(() => {
    getData();
  }, []);

  return load?(
    <div className={style.MainContainer}>
      <div className={style.HeaderContainer}>
        <h3>Dodaj/Edytuj zdjęcie</h3>
        <button className={style.CloseBtn} onClick={props.closeModal}>
          <img alt="" src={Close} />
        </button>
      </div>
      <form onSubmit={updateAvatar} className={style.Form}>
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
            accept="image/*"
            capture="environment"
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
  ):(<div>Czekaj...</div>);
};

export default UserAvatar;
