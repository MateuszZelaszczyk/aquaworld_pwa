import React, {useEffect, useRef} from "react";
import { NavLink } from "react-router-dom";
import style from "./UserMenu.module.css";
const UserMenu = (props) => {
  
     const refOne = useRef();
     useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
     }, []);
     const handleClickOutside = (e) => {
        if (refOne.current !== null) {
           if (!refOne.current.contains(e.target)) {
              props.visible();
           }
           else{
              setTimeout(()=>{
                 props.visible()
              },100)
              
           }
        }
     };
  return (
    <div className={style.MenuContainer} ref={refOne}>
      <button onClick={()=>props.openEdit()}  className={style.MenuBtn}>Edytuj profil</button>
      <button onClick={()=>props.openModal()} className={style.MenuBtn}>Edytuj/dodaj zdjęcie</button>
      <NavLink to="/" className={style.MenuBtn}>Wyloguj</NavLink>
    </div>
  );
};
export default UserMenu;
