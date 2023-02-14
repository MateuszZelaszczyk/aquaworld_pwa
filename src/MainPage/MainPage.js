import React, { useState } from "react";
import style from "./MainPage.module.css";
import Navi from "./Navi";
import Avatar from "../Assets/Avatar.png";
import foto from "../Assets/Fish.jpg";
import send from "../Assets/send.svg";
import Friend from "../Assets/AddFriend.svg";
import DFriend from "../Assets/DeleteFriend.svg";
const data = [
  {
    author: {
      name: "Mateusz",
      lastname: "Kowalski",
      avatar: Avatar,
      location: "Ostrowiec",
    },
    tittle: "Witajcie",
    foto: null,
    describe: "Częśc chciałbym się z wami przywitać!!",
    isPublic: true,
    comments: [
      {
        value: "Cześć, miło Cie poznać.",
        author: { name: "Jan", lastname: "Wójcik", avatar: Avatar },
      },
      {
        value: "Witaj Mateusz.",
        author: { name: "Jan", lastname: "Wójcik", avatar: Avatar },
      },
    ],
  },

  {
    author: {
      name: "Michał",
      lastname: "Nowakowski",
      avatar: Avatar,
      location: "Kielce",
    },
    tittle: "Problem z neonkami",
    foto: foto,
    describe:
      "Od wczorja moje neonki dziwnie się zachowują. Co jakiś czas podpływają do powierzchni wody i ciężko oddychają. Mają ciemne plamy na ogonie",
    isPublic: false,
    comments: [
      {
        value: "Cześć, miło Cie poznać.",
        author: { name: "Jan", lastname: "Wójcik", avatar: Avatar },
      },
      {
        value: "Witaj Mateusz.",
        author: { name: "Jan", lastname: "Wójcik", avatar: Avatar },
      },
    ],
  },
  {
    author: {
      name: "Jan",
      lastname: "Wójcik",
      avatar: Avatar,
      location: "Chmielów",
    },
    tittle: "Ikra skalara",
    foto: null,
    describe: "Wczoraj moje skalary złożyły. Co zrobić by coś się wychowało?",
    isPublic: true,
    comments: [
      {
        value: "Cześć, miło Cie poznać.",
        author: { name: "Jan", lastname: "Wójcik", avatar: Avatar },
      },
      {
        value: "Witaj Mateusz.",
        author: { name: "Jan", lastname: "Wójcik", avatar: Avatar },
      },
    ],
  },
];
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
const MainPage = () => {
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
  return (
    <div>
      <Navi />
      <div className={style.MainContainer}>
        <div className={style.PostContainer}>
          {data.map((post, index) => (
            <div className={style.Post} key={index}>
              <div className={style.PostAuth}>
                <img
                  className={style.AuthAvatar}
                  alt="Avatar"
                  src={post.author.avatar}
                />
                <p className={style.AuthName}>
                  {post.author.name} {post.author.lastname},{" "}
                  {post.author.location}
                </p>
              </div>
              <div className={style.PostValue}>
                <h3 className={style.PostTitle}>{post.tittle}</h3>
                <p className={style.PostDescribe}>{post.describe}</p>
                <img className={style.PostFoto} alt="" src={post.foto} />
              </div>

              <h4 style={{ marginLeft: "5px" }}>Odpowiedzi:</h4>
              <div className={style.NewCommnetContainer}>
                <input
                  placeholder="Dodaj odpowiedź..."
                  className={style.AddComment}
                />
                <button className={style.AddCommentBtn}>
                  {" "}
                  Dodaj <img alt="" src={send} />
                </button>
              </div>
              <div className={style.InteractContainer}>
                {post.comments.map((comment, id) => (
                  <div className={style.CommentSection} key={id}>
                    <div className={style.CommmentAuthorContainer}>
                      <img
                        className={style.CommentAvatar}
                        alt=""
                        src={comment.author.avatar}
                      />
                      <p className={style.CommentAuthor}>
                        {comment.author.name} {comment.author.lastname}
                      </p>
                    </div>
                    <p className={style.CommentValue}>{comment.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={style.UsersContainer}>
          <div className={style.UsersType}>
            <button onClick={()=>Sections("others")} style={{backgroundColor:color2}} className={style.Header1Btn}>Użytkownicy</button>
            <button onClick={()=>Sections("friends")} style={{backgroundColor:color1}} className={style.Header2Btn}>Znajomi</button>
          </div>
          {visibleOthers &&
          <div>
            {users.map((user, index) => (
              <div key={index} className={style.User}>
                <img
                  className={style.UserAvatar}
                  src={user.avatar}
                  alt="avatar"
                />
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
          </div>}
          {visibleFriends && (
            <div>
              {friends.map((user, index) => (
                <div key={index} className={style.User}>
                  <img
                    className={style.UserAvatar}
                    src={user.avatar}
                    alt="avatar"
                  />
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
        </div>
      </div>
    </div>
  );
};
export default MainPage;
