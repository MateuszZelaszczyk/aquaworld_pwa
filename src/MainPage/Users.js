import React, {useState} from "react";
import style from "./MainPage.module.css";
import Friend from "../Assets/AddFriend.svg";
import DFriend from "../Assets/DeleteFriend.svg";
import Avatar from "../Assets/Avatar.png";

const users = [
    {
      name: "Jan",
      lastname: "Wójcik",
      avatar: Avatar,
      location: "Kielce",
      region: "świętokrzyskie",
    },
    {
      name: "Mateusz",
      lastname: "Kowalski",
      avatar: Avatar,
      location: "Kielce",
      region: "świętokrzyskie",
    },
    {
      name: "Mariusz",
      lastname: "Nowakowski",
      avatar: Avatar,
    },
    {
      name: "Kuba",
      lastname: "Piasek",
      avatar: Avatar,
      location: "Kielce",
      region: "świętokrzyskie",
    },
    {
      name: "Tomek",
      lastname: "Rzeczka",
      avatar: Avatar,
      location: "Kielce",
      region: "świętokrzyskie",
    },
    {
      name: "Damian",
      lastname: "Tokarski",
      avatar: Avatar,
      location: "Kielce",
      region: "świętokrzyskie",
    },
    {
      name: "Stasiek",
      lastname: "Sitarski",
      avatar: Avatar,
      location: "Kielce",
      region: "świętokrzyskie",
    },
  ];
  
  const friends = [
    {
      name: "Marek",
      lastname: "Wójcik",
      avatar: Avatar,
      location: "Waśniów",
      region: "świętokrzyskie",
    },
    {
      name: "Jarek",
      lastname: "Kowalski",
      avatar: Avatar,
      location: "Pawłów",
      region: "świętokrzyskie",
    },
    {
      name: "Arek",
      lastname: "Nowakowski",
      avatar: Avatar,
    },
    {
      name: "Kuba",
      lastname: "Piasek",
      avatar: Avatar,
      location: "Kielce",
      region: "świętokrzyskie",
    },
    {
      name: "Tomek",
      lastname: "Rzeczka",
      avatar: Avatar,
      location: "Kielce",
      region: "świętokrzyskie",
    },
  ];

const Users = () => {
    const [visibleFriends, setVisibleFreinds] = useState(true);
    const [visibleOthers, setVisibleOthers] = useState(false);
    const [color1, setColor1] = useState("#b2ffff");
    const [color2, setColor2] = useState("white");
  
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
    return(
  <div className={style.UsersContainer}>
    <div className={style.UsersType}>
      <button
        onClick={() => Sections("others")}
        style={{ backgroundColor: color2 }}
        className={style.Header1Btn}
      >
        Użytkownicy
      </button>
      <button
        onClick={() => Sections("friends")}
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
            <img className={style.UserAvatar} src={user.avatar} alt="avatar" />
            <div className={style.UserSection}>
              <div className={style.NameSection}>
                <p className={style.UserName}>{user.name}</p>
                <p className={style.UserName}>{user.lastname} </p>
              </div>
              <div className={style.LocationSection}>
                <p className={style.UserLocation}> {user.location}</p>
                <p className={style.UserLocation}>{user.region}</p>
              </div>
              <button className={style.AddFriend}>
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
            <img className={style.UserAvatar} src={user.avatar} alt="avatar" />
            <div className={style.UserSection}>
              <div className={style.NameSection}>
                <p className={style.UserName}>{user.name}</p>
                <p className={style.UserName}>{user.lastname} </p>
              </div>
              <div className={style.LocationSection}>
                <p className={style.UserLocation}> {user.location}</p>
                <p className={style.UserLocation}>{user.region}</p>
              </div>
              <button className={style.AddFriend}>
                <img alt="" src={DFriend} />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>)
};

export default Users;