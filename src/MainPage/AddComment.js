import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./MainPage.module.css";
import send from "../Assets/send.svg";
const Post = (props) => {
  const token = localStorage.getItem("access");
  const [text, setText] = useState("");
  const postId = props.id;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/comments/",
        {text:text, post:postId,},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {setText(""); props.getData()});
  };
  return (
    <div className={style.NewCommnetContainer}>
      <input
        placeholder="Dodaj odpowiedź..."
        className={style.AddComment}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit} className={style.AddCommentBtn}>
        Dodaj <img alt="" src={send}  />
      </button>
    </div>
  );
};
export default Post;
