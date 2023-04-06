import React, { useState, useEffect } from "react";
import style from "./MainPage.module.css";
import foto from "../Assets/IconFish.png";
import UserMenu from "./UserMenu/UserMenu";
import Requests from "./UserMenu/Requests";
import { NavLink, useNavigate } from "react-router-dom";
import ModalWindow from "./UserWindows/Modal";
import UserAvatar from "./UserWindows/UserAvatar";
import EditUser from "./UserWindows/EditProfil";
import menu from "../Assets/menu.svg";
import search from "../Assets/search.svg";
import users from "../Assets/users.svg";
import { logout } from "../Actions/auth.js";
import { connect } from "react-redux";
import axios from "axios";
import post from "../Assets/post.svg";
import aqua from "../Assets/aquarium.svg";
import ring from "../Assets/ring.svg";

const Navi = ({ isAuthenticated, logout, ...props }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const token = localStorage.getItem("access");
  const [visible, setVisible] = useState(false);
  const [visibleReq, setVisibleReq] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [notificationCount, setNotificationCount] = useState();
  const getInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/userInfo/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data["user"][0]);
      console.log(response.data["user"][0]);
      localStorage.setItem("user", JSON.stringify(response.data["user"][0]));
      setIsLoad(true);
    } catch {
      setIsLoad(true);
      setData(localStorage.getItem("user"));
    }
  };
  const getRequests = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/getfriendsrequest/`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      setRequests(response.data);
      setNotificationCount(response.data.length);
    } catch {}
  };

  useEffect(() => {
    getInfo();
    getRequests();
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
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
  function handleVisibleClRq() {
    setVisible(!visible);
  }

  const [ismobile, setIsMobile] = useState(false);
  const openNavi = () => {
    setIsMobile(!ismobile);
  };
  const [mobileSearch, setMobileSearch] = useState(false);
  const openSearch = () => {
    setMobileSearch(!mobileSearch);
  };

  return isLoad ? (
    <nav className={style.MainNaviContainer}>
      <div className={style.MainNaviMenu}>
        <NavLink to="/profile/mainpage" className={style.LogoContainer}>
          <p className={style.Logo}>AquaWorld</p>{" "}
          <img className={style.Foto} src={foto} alt="user" />
        </NavLink>
        <button className={style.SearchBtn} onClick={openSearch}>
          <img alt="" src={search} />
        </button>
        <input
          className={mobileSearch ? style.MobileSearch : style.Search}
          type="text"
          placeholder="Wyszukaj..."
        />
        <button
          style={{ display: props.show }}
          className={style.SideBtn}
          onClick={props.Colap}
        >
          <img alt="" src={users} />
        </button>
        <button className={style.HamMenu} onClick={openNavi}>
          <img alt="" src={menu} />
        </button>

        <ul className={ismobile ? style.MobileNavi : style.ElementsList}>
          <li className={style.ListItem}>
            <button
              className={style.ProfilContainer}
              onClick={() => [setVisibleReq(!visibleReq), setIsMobile()]}
            >
              <img alt="" src={ring} />
              {notificationCount > 0 && (
                <span className={style.NotificationCount}>
                  {notificationCount}
                </span>
              )}
            </button>
          </li>

          <li className={style.ListItem}>
            <NavLink className={style.Link} to="/profile/myaqua">
              Moje akwaria
            </NavLink>
          </li>
          <li className={style.ListItem}>
            <NavLink className={style.Link} to="/profile/newpost">
              <img alt="" src={post} />
            </NavLink>
          </li>
          <li className={style.ListItem}>
            <NavLink className={style.Link} to="/profile/newaqua">
              +<img alt="" src={aqua} />
            </NavLink>
          </li>
          <li className={style.ListItem}>
            <button
              className={style.ProfilContainer}
              onClick={() => [setVisible(!visible), setIsMobile()]}
            >
              Profil{" "}
              <img
                className={style.Foto}
                src={`${process.env.REACT_APP_API_URL}/media/` + data.image}
                alt="user"
              />
            </button>
          </li>
        </ul>
      </div>
      {visible && (
        <UserMenu
          visible={handleVisibleClRq}
          openModal={OpenModal}
          openEdit={OpenModalEdit}
          actual={visible}
        />
      )}

      <ModalWindow openModal={open} closeModal={CloseModal}>
        <UserAvatar
          closeModal={CloseModal}
          getData={props.getData}
          getInfo={getInfo}
        />
      </ModalWindow>
      <ModalWindow openModal={openEdit} closeModal={CloseModalEdit}>
        <EditUser
          closeModal={CloseModalEdit}
          getData={props.getData}
          getInfo={getInfo}
        />
      </ModalWindow>
      {visibleReq && (
        <Requests
          visible={handleVisibleCl}
          actual={visibleReq}
          data={requests}
          getRequests={getRequests}
        />
      )}
    </nav>
  ) : (
    <div>Czekaj...</div>
  );
};

const mapSatateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapSatateToProps, { logout })(Navi);
