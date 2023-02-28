import React, { useState } from "react";
import style from "./MainPage.module.css";
import Navi from "./Navi";
import Avatar from "../Assets/Avatar.png";
import foto from "../Assets/Fish.jpg";
import send from "../Assets/send.svg";

import { Sidebar, Menu, useProSidebar } from "react-pro-sidebar";
import Users from "./Users";
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

const MainPage = () => {
  const [collapseSidebar, setCollapse] = useState(true);
  const Collaps = () => {
    setCollapse(!collapseSidebar);
  };
  return (
    <div>
      <Navi Colap={Collaps} show='flexible' />

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
        <div className={style.UsersWidnow}>
          <Users />
        </div>

        <div className={style.SideBar}>
          <Sidebar
            defaultCollapsed={collapseSidebar}
            collapsedWidth="0px"
            width="80%"
            style={{ height: "100%", backgroundColor: "#ffffff" }}
          >
            <Menu>
              <Users style={{ height: "95%", position: "absolute" }} />
            </Menu>
          </Sidebar>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
