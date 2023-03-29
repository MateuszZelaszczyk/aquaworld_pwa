import React, { useState, useEffect } from "react";
import style from "./MainPage.module.css";
import Navi from "./Navi";
import axios from "axios";
import { Sidebar, Menu } from "react-pro-sidebar";
import Users from "./Users";
import Post from "./AddComment";
const MainPage = () => {
  const [collapseSidebar, setCollapse] = useState(true);
  const Collaps = () => {
    setCollapse(!collapseSidebar);
  };
  const token = localStorage.getItem("access");
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get("http://localhost:8000/api/postsinfo", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    setData(response.data["posts"]);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Navi Colap={Collaps} show="flexible" getData={getData} />

      <div className={style.MainContainer}>
        <div className={style.PostContainer}>
          {data.map((post, index) => (
            <div className={style.Post} key={index}>
              <div className={style.PostAuth}>
                <div className={style.AuthNameContainer}>
                  <img
                    className={style.AuthAvatar}
                    alt="Avatar"
                    src={"http://localhost:8000/media/" + post.user_id__image}
                  />
                  <p className={style.AuthName}>
                    {post.user_id__firstname} {post.user_id__lastname}
                  </p>
                </div>
                <div className={style.AuthLocal}>
                  <p>
                    {post.user_id__location}, {post.user_id__province}
                  </p>
                </div>
              </div>
              <div className={style.PostValue}>
                <h3 className={style.PostTitle}>{post.title}</h3>
                <p className={style.PostDescribe}>{post.describe}</p>
                <img className={style.PostFoto} alt="" src={post.foto} />
              </div>

              <h4 style={{ marginLeft: "5px" }}>Odpowiedzi:</h4>
              <Post id={post.id} getData={getData} />

              {post.comments.map((comment) => (
                <div key={comment.id} className={style.InteractContainer}>
                  <div className={style.CommmentAuthorContainer}>
                  <img
                    className={style.CommentAvatar}
                    alt="Avatar"
                    src={"http://localhost:8000/media/" + comment.user__image}
                  />
                  <p className={style.CommentAuthor}>
                    {comment.user__firstname} {comment.user__lastname}
                  </p>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))}
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
