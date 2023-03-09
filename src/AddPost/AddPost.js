import React, { useState } from "react";
import Navi from "../MainPage/Navi";
import style from "./AddPost.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
const NewPost = () => {
  const [fotoShow, setFotoShow] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [describe, setDescribe] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [images, setImages] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(images[0])
    const data = new FormData();
    data.append("title", title);
    data.append("describe", describe);
    data.append("isPublic", isPublic);
    for(let i=0; i<images.length; i++){
      data.append('uploaded_images', images[i])
    }
    axios
      .post("http://localhost:8000/api/posts/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
        setTitle("");
        setDescribe("");
        setImages([]);
        setIsPublic(true);
      });
  };

  const handleFileChange = (index, event) => {
    const newFiles = [...selectedFiles];
    newFiles[index] = event.target.files[0];
    setSelectedFiles(newFiles);

    const fotos =[...fotoShow];
    fotos[index]=URL.createObjectURL(event.target.files[0]);
    setFotoShow(fotos);
    setImages(newFiles)
console.log(fotos);
console.log(newFiles);
  };

  const handleAddField = () => {
    setSelectedFiles([...selectedFiles, null]);
    setFotoShow([...fotoShow, null]);
  };

  return (
    <div>
      <Navi show={'none'} />
      <div className={style.NewPostContainer}>
        <h1 className={style.NewPostHeader}>Nowy post</h1>
        <form className={style.PostForm} onSubmit={handleSubmit}>
          <label className={style.NewPostLabel} htmlFor="title">
            Tytuł
          </label>
          <input
            className={style.PostTitle}
            required
            name="title"
            type="text"
            placeholder="Podaj tytuł..."
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
          <label className={style.NewPostLabel} htmlFor="describe">
            Opisz swój problem
          </label>
          <textarea
            className={style.PostDescribe}
            required
            name="describe"
            placeholder="Napisz o co chodzi"
            value={describe}
            onChange={(e)=>setDescribe(e.target.value)}
          />
          {selectedFiles.map((file, index) => (
            <div key={index} className={style.File}>
              <label htmlFor="foto">Wybierz zdjęcie</label>
              <input
                className={style.NewPostFile}
                onChange={(e) => handleFileChange(index, e)}
                name="foto"
                type="file"
              ></input>
              <img className={style.Foto} src={fotoShow[index]} alt=""></img>
            </div>
          ))}
          <button className={style.AddFoto} type="button" onClick={handleAddField}>
            Dodaj zdjęcie
          </button>
          <div className={style.NewPostType}>
            <legend className={style.Legend} htmlFor="isPublic">
              Widoczność postu
            </legend>
            <div className={style.RadioContainer}>
              <label className={style.NewPostLabel} htmlFor="isPublic">
                Publiczny
              </label>
              <input
                className={style.NewPostVisible}
                name="isPublic"
                type="radio"
                value={true}
                onChange={(e)=>setIsPublic(e.target.value)}
              />
            </div>
            <div className={style.RadioContainer}>
              <label className={style.NewPostLabel} htmlFor="isPublic">
                Tylko znajomi
              </label>
              <input
                className={style.NewPostVisible}
                name="isPublic"
                type="radio"
                value={false}
                onChange={(e)=>setIsPublic(e.target.value)}
              />
            </div>
          </div>
          <div className={style.BtnContainer}>
            <button type="submit" className={style.Save}>
              Utwórz
            </button>
            <button className={style.Back}>
              <NavLink to="/profile/mainpage" className={style.BackLink}>
                Anuluj
              </NavLink>
            </button>
          </div>
        </form>
      </div>
      <div style={{ height: "30px", margin: "30px" }}></div>
    </div>
  );
};

export default NewPost;
