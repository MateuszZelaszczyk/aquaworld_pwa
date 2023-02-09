import React, {useEffect, useRef} from "react";
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
      <button className={style.MenuBtn}>Ustawienia konta</button>
      <button className={style.MenuBtn}>Edytuj/dodaj zdjęcie</button>
      <button className={style.MenuBtn}>Zmień hasło</button>
      <button className={style.MenuBtn}>Wyloguj</button>
    </div>
  );
};
export default UserMenu;