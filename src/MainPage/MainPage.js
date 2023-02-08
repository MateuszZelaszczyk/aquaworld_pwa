import React, { useState } from "react";
import style from "./MainPage.module.css";
import foto from "../Assets/IconFish.png";
import UserMenu from "./UserMenu/UserMenu";
const MainPage = () => {
  const [ visible, setVisble ] = useState(false);
  function handleVisible() {
    setVisble(!visible);
  }

  function handleVisibleCl() {
    setVisble(false);
  }
  return (
    <div>
      <nav className={style.MainNaviContainer}>
        <div className={style.MainNaviMenu}>
          <div className={style.LogoContainer}>
            <p className={style.Logo}>AquaWorld</p>{" "}
            <img className={style.Foto} src={foto} alt="user" />
          </div>

          <input
            className={style.Search}
            type="text"
            placeholder="Wyszukaj..."
          />
          <ul className={style.ElementsList}>
            <li className={style.ListItem}>Moje akwaria</li>
            <li className={style.ListItem}>+Dodaj post</li>
            <li className={style.ListItem}>+Dodaj akwarium</li>
            <li className={style.ListItem}>
                <button className={style.ProfilContainer} onClick={handleVisible}>
              Profil <img className={style.Foto} src={foto} alt="user" />
              </button>
            </li>
          </ul>
        </div>
        {visible && <UserMenu visible={handleVisibleCl} />}
      </nav>

      <div className={style.MainContainer}></div>
    </div>
  );
};
export default MainPage;
