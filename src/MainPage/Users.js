import React, { useState, useEffect } from "react";
import style from "./MainPage.module.css";
import Friend from "../Assets/AddFriend.svg";
import DFriend from "../Assets/DeleteFriend.svg";
import axios from "axios";

const Users = () => {
  const [visibleFriends, setVisibleFreinds] = useState(true);
  const [visibleOthers, setVisibleOthers] = useState(false);
  const [color1, setColor1] = useState("#b2ffff");
  const [color2, setColor2] = useState("white");
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const token = localStorage.getItem("access");
  function Sections(id) {
    if (id === "friends") {
      setVisibleFreinds(true);
      setVisibleOthers(false);
      setColor1("#b2ffff");
      setColor2("white");
    } else if (id === "others") {
      setVisibleFreinds(false);
      setVisibleOthers(true);
      setColor2("#b2ffff");
      setColor1("white");
    }
  }
  const getUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      setUsers(response.data);
      localStorage.setItem("users", JSON.stringify(response.data));
    } catch {
      localStorage.getItem("users");
    }
  };
  const getFriends = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/getfriends/`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      setFriends(response.data);
      localStorage.setItem("friends", JSON.stringify(response.data));
    } catch {
      setFriends(localStorage.getItem("friends"));
    }
  };
  const Send_Request = (id) => {
    axios.post(
      `${process.env.REACT_APP_API_URL}/api/sendrequest/${id}/`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  const DeleteFriend = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/removefriend/${id}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        getFriends();
      });
  };
  useEffect(() => {
    getUsers();
    getFriends();
  }, []);
  return (
    <div className={style.UsersContainer}>
      <div className={style.UsersType}>
        <button
          onClick={() => [Sections("others"), getUsers()]}
          style={{ backgroundColor: color2 }}
          className={style.Header1Btn}
        >
          Użytkownicy
        </button>
        <button
          onClick={() => [Sections("friends"), getFriends()]}
          style={{ backgroundColor: color1 }}
          className={style.Header2Btn}
        >
          Znajomi
        </button>
      </div>
      {visibleOthers && (
        <div>
          {users.map((user, index) => (
            <div key={index} className={style.User}>
              <img
                className={style.UserAvatar}
                src={`${process.env.REACT_APP_API_URL}/media/` + user.image}
                alt="avatar"
              />
              <div className={style.UserSection}>
                <div className={style.NameSection}>
                  <p className={style.UserName}>{user.firstname}</p>
                  <p className={style.UserName}>{user.lastname} </p>
                </div>
                <div className={style.LocationSection}>
                  <p className={style.UserLocation}> {user.location}</p>
                  <p className={style.UserLocation}>{user.province}</p>
                </div>
                <button
                  className={style.AddFriend}
                  onClick={() => Send_Request(user.id)}
                >
                  <img alt="" src={Friend} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {visibleFriends && (
        <div>
          {friends.map((user, index) => (
            <div key={index} className={style.User}>
              <img
                className={style.UserAvatar}
                src={`${process.env.REACT_APP_API_URL}` + user.image}
                alt="avatar"
              />
              <div className={style.UserSection}>
                <div className={style.NameSection}>
                  <p className={style.UserName}>{user.firstname}</p>
                  <p className={style.UserName}>{user.lastname} </p>
                </div>
                <div className={style.LocationSection}>
                  <p className={style.UserLocation}> {user.location}</p>
                  <p className={style.UserLocation}>{user.region}</p>
                </div>
                <button
                  className={style.AddFriend}
                  onClick={() => DeleteFriend(user.id)}
                >
                  <img alt="" src={DFriend} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
