import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "./FormMenu.module.css";
const FormMenu = (props) => {
  const id = props.index;
  const refOne = useRef();
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);
  const handleClickOutside = (e) => {
    if (refOne.current !== null) {
      if (!refOne.current.contains(e.target)) {
        props.visible();
      } else {
        setTimeout(() => {
          props.visible();
        }, 100);
      }
    }
  };
  return (
    <div className={style.MenuContainer} ref={refOne}>
      <NavLink to={`/profile/myaqua/add_fish/${id}`} className={style.MenuBtn}>
        Dodaj ryby
      </NavLink>
      <NavLink
        to={`/profile/myaqua/add_plants/${id}`}
        className={style.MenuBtn}
      >
        Dodaj rośliny
      </NavLink>
      <NavLink
        to={`/profile/myaqua/add_equipment/${id}`}
        className={style.MenuBtn}
      >
        Dodaj wyposażenie
      </NavLink>
      <NavLink to={`/profile/myaqua/add_base/${id}`} className={style.MenuBtn}>
        Dodaj podłoże
      </NavLink>
      <NavLink
        to={`/profile/myaqua/add_fertilizer/${id}`}
        className={style.MenuBtn}
      >
        Dodaj nawożenie
      </NavLink>
    </div>
  );
};
export default FormMenu;
