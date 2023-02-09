import React, { useState } from "react";
import style from "./MainPage.module.css";
import foto from "../Assets/IconFish.png";
import UserMenu from "./UserMenu/UserMenu";
import { NavLink } from "react-router-dom";
const Navi = () => {
  const [visible, setVisible] = useState(false);

  function handleVisibleCl() {
    setVisible(!visible);
  }
  return (
    <nav className={style.MainNaviContainer}>
      <div className={style.MainNaviMenu}>
        <NavLink to="/mainpage" className={style.LogoContainer}>
          <p className={style.Logo}>AquaWorld</p>{" "}
          <img className={style.Foto} src={foto} alt="user" />
        </NavLink>

        <input className={style.Search} type="text" placeholder="Wyszukaj..." />
        <ul className={style.ElementsList}>
          <li className={style.ListItem}>
            <NavLink className={style.Link} to="/myaqua">
              Moje akwaria
            </NavLink>
          </li>
          <li className={style.ListItem}>+Dodaj post</li>
          <li className={style.ListItem}>
            <NavLink className={style.Link} to="/newaqua">
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
      {visible && <UserMenu visible={handleVisibleCl} actual={visible} />}
    </nav>
  );
};

export default Navi;
