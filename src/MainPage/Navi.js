import React, { useState, useEffect, useRef } from "react";
import style from "./MainPage.module.css";
import foto from "../Assets/IconFish.png";
import UserMenu from "./UserMenu/UserMenu";
import { NavLink } from "react-router-dom";
import ModalWindow from "./UserWindows/Modal";
import UserAvatar from "./UserWindows/UserAvatar";
import EditUser from "./UserWindows/EditProfil";
import menu from "../Assets/menu.svg";
import search from "../Assets/search.svg"
import users from "../Assets/users.svg"
const Navi = (props) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const OpenModal = () => {
    setOpen(!open);
  };
  const CloseModal = () => {
    setOpen(false);
  };

  const OpenModalEdit = () => {
    setOpenEdit(!openEdit);
  };
  const CloseModalEdit = () => {
    setOpenEdit(false);
  };
  function handleVisibleCl() {
    setVisible(!visible);
  }

  const [ismobile, setIsMobile]=useState(false);
  const openNavi =()=>{
    setIsMobile(!ismobile);
  }
  const [mobileSearch, setMobileSearch] = useState(false)
  const openSearch = ()=>{
    setMobileSearch(!mobileSearch);
  }
  

  const refOne = useRef();
  useEffect(() => {
     document.addEventListener('click', handleClickOutside, true);
  }, []);
  const handleClickOutside = (e) => {
     if (refOne.current !== null) {
        if (refOne.current &&!refOne.current.contains(e.target)) {
          setIsMobile(false)
        }
        else{
           setTimeout(()=>{
            setIsMobile(!ismobile)
           },100)
           
        }
     }
  };
  return (
    <nav className={style.MainNaviContainer}>
      <div className={style.MainNaviMenu}>
        <NavLink to="/profile/mainpage" className={style.LogoContainer}>

          <p className={style.Logo}>AquaWorld</p>{" "}
          <img className={style.Foto} src={foto} alt="user" />
        </NavLink>
        <button className={style.SearchBtn} onClick={openSearch}>
          <img alt="" src={search} />
        </button>
        <input className={ mobileSearch?style.MobileSearch: style.Search} type="text" placeholder="Wyszukaj..." />
        <button style={{display:props.show}} className={style.SideBtn} onClick={props.Colap}><img alt="" src={users} /></button>
        <button className={style.HamMenu} onClick={openNavi}>
          <img alt="" src={menu} />
        </button>

        <ul ref={ismobile? refOne:null} className={ismobile? style.MobileNavi: style.ElementsList}>
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
      {visible && (
        <UserMenu
          visible={handleVisibleCl}
          openModal={OpenModal}
          openEdit={OpenModalEdit}
          actual={visible}
        />
      )}
      <ModalWindow openModal={open} closeModal={CloseModal}>
        <UserAvatar closeModal={CloseModal} />
      </ModalWindow>
      <ModalWindow openModal={openEdit} closeModal={CloseModalEdit}>
        <EditUser closeModal={CloseModalEdit} />
      </ModalWindow>
    </nav>
  );
};

export default Navi;
