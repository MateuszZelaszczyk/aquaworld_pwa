import React, {useEffect, useRef} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./UserMenu.module.css";
import { logout } from "../../Actions/auth.js"
import { connect } from "react-redux";
const UserMenu = ({logout, isAuthenticated, ...props}) => {
     const navigate = useNavigate();
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
     useEffect(() => {
      if (isAuthenticated===false) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);
     
  return (
    <div className={style.MenuContainer} ref={refOne}>
      <button onClick={()=>props.openEdit()}  className={style.MenuBtn}>Edytuj profil</button>
      <button onClick={()=>props.openModal()} className={style.MenuBtn}>Edytuj/dodaj zdjęcie</button>
      <NavLink to="/#!" className={style.MenuBtn}><button onClick={logout}>Wyloguj</button></NavLink>
    </div>
  );
};
const mapSatateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
 });
 
 export default connect(mapSatateToProps, { logout })(UserMenu);
