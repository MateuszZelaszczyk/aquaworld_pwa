import React, { useState } from "react";
import style from "./MainPage.module.css";
import foto from "../Assets/IconFish.png";
import UserMenu from "./UserMenu/UserMenu";
import { NavLink } from "react-router-dom";
import ModalWindow from "./UserWindows/Modal";
import UserAvatar from "./UserWindows/UserAvatar";
const Navi = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const OpenModal = () => {
    setOpen(!open);
  };
  const CloseModal = () => {
    setOpen(false);
  };
  function handleVisibleCl() {
    setVisible(!visible);
  }
  return (
    <nav className={style.MainNaviContainer}>
      <div className={style.MainNaviMenu}>
        <NavLink to="/profile/mainpage" className={style.LogoContainer}>
          <p className={style.Logo}>AquaWorld</p>{" "}
          <img className={style.Foto} src={foto} alt="user" />
        </NavLink>

        <input className={style.Search} type="text" placeholder="Wyszukaj..." />
        <ul className={style.ElementsList}>
          <li className={style.ListItem}>
            <NavLink className={style.Link} to="/profile/myaqua">
              Moje akwaria
            </NavLink>
          </li>
          <li className={style.ListItem}>
            <NavLink className={style.Link} to="/profile/newpost">
              +Dodaj post
            </NavLink>
          </li>
          <li className={style.ListItem}>
            <NavLink className={style.Link} to="/profile/newaqua">
              +Dodaj akwarium
            </NavLink>
          </li>
          <li className={style.ListItem}>
            <button
              className={style.ProfilContainer}
              onClick={() => setVisible(!visible)}
            >
              Profil <img className={style.Foto} src={foto} alt="user" />
            </button>
          </li>
        </ul>
      </div>
      {visible && <UserMenu visible={handleVisibleCl} openModal={OpenModal} actual={visible} />}
      <ModalWindow openModal={open} closeModal={!open}>
        <UserAvatar closeModal={CloseModal} />
      </ModalWindow>
    </nav>
  );
};

export default Navi;
