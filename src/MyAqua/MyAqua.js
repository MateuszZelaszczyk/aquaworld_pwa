import React, { useState, useEffect } from "react";
import Navi from "../MainPage/Navi";
import style from "./MyAqua.module.css";
import { NavLink } from "react-router-dom";
import FormMenu from "./FormMenu/FormMenu.js";
import axios from "axios";
const MyAqua = () => {
  const token = localStorage.getItem("access");
  const [isEditing, setIsEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [capacity, setCapacity] = useState();
  const [type, setType] = useState();
  const [length, setLength] = useState();
  const [height, setHeight] = useState();
  const [depth, setDepth] = useState();
  const [startDate, setStartDate] = useState();
  const [image, setImage] = useState();
  const [avatarURL, setAvatarURL] = useState(null);
  const handleEditClick = (index, aquarium) => {
    setIsEditing(true);
    setId(index);
    setName(aquarium.name);
    setCapacity(aquarium.capacity);
    setType(aquarium.type);
    setLength(aquarium.length);
    setHeight(aquarium.height);
    setDepth(aquarium.depth);
    setStartDate(aquarium.startDate);
    setImage(aquarium.image);
  };
  const handleSaveClick = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/aquariums/${id}/`,
        {
          name: name,
          capacity: capacity,
          type: type,
          length: length,
          height: height,
          depth: depth,
          startDate: startDate,
          image: avatarURL,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getData();
        setIsEditing(false);
      });
  };
  const update = (e) => {
    setAvatarURL(e.target.files[0]);
    var file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setImage(objectURL);
  };
  const getData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/aquariums/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setData(response.data);
  };
  const deleteAqua = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/aquariums/${id}/`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    getData();
  };
  function handleVisibleCl(index) {
    setVisible(!visible);
    setId(index);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.MainContainer}>
      <Navi show={"none"} />
      <div className={style.AquaContainer}>
        <div className={style.HeadContainer}>
          <p className={style.Head1}></p>
          <p className={style.Head2}>Nazwa</p>
          <p className={style.Head3}>Pojmeność (l)</p>
          <p className={style.Head4}>Wymiary (cm)</p>
          <p className={style.Head5}>Data założenia</p>
          <p className={style.Head6}>Rodzaj</p>
          <p className={style.Head7}></p>
        </div>
        {data.map((aquarium, index) => (
          <div key={index} className={style.ItemContainer}>
            {isEditing && aquarium.id === id ? (
              <div className={style.ItemContainer2}>
                <div className={style.file_input}>
                  <input
                    className={style.AquaFotoInput}
                    type="file"
                    onChange={(e) => update(e)}
                  />
                  <label>Wybierz plik...</label>
                </div>
                <img className={style.AquaFoto} alt="" src={image} />
                <input
                  className={style.Input1}
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className={style.Input2}
                  value={capacity}
                  type="text"
                  onChange={(e) => setCapacity(e.target.value)}
                />
                <div className={style.SizeContainer}>
                  <div className={style.Size}>
                    <input
                      className={style.SizeInput}
                      value={length}
                      type="number"
                      onChange={(e) => setLength(e.target.value)}
                    />
                    <input
                      className={style.SizeInput}
                      value={height}
                      type="number"
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <input
                      className={style.SizeInput}
                      value={depth}
                      type="number"
                      onChange={(e) => setDepth(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  className={style.Input3}
                  value={startDate}
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  className={style.Input4}
                  value={type}
                  type="text"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            ) : (
              <div className={style.ItemContainer2}>
                <img className={style.AquaFoto} alt="" src={aquarium.image} />
                <p className={style.Para1}>{aquarium.name}</p>
                <p className={style.Para2}>{aquarium.capacity}</p>
                <div className={style.SizeContainer}>
                  <div className={style.Size}>
                    <p className={style.SizeParagraph}>Sz: {aquarium.length}</p>
                    <p className={style.SizeParagraph}>Wy: {aquarium.height}</p>
                    <p className={style.SizeParagraph}>Gł: {aquarium.depth}</p>
                  </div>
                </div>
                <p className={style.Para3}>{aquarium.startDate}</p>
                <p className={style.Para4}>{aquarium.type}</p>
              </div>
            )}
            <div className={style.BtnContainer}>
              <button className={style.MoreInfoBtn}>
                <NavLink
                  className={style.Link}
                  to={`/profile/myaqua/moreinformations/${aquarium.id}`}
                >
                  Szczegóły
                </NavLink>
              </button>
              <button
                className={style.MoreBtn}
                onClick={() => handleVisibleCl(aquarium.id)}
              >
                + Informacje
              </button>
              {isEditing && id === aquarium.id ? (
                <button
                  className={style.EditBtn}
                  onClick={() => handleSaveClick()}
                >
                  Zapisz
                </button>
              ) : (
                <button
                  className={style.EditBtn}
                  onClick={() => handleEditClick(aquarium.id, aquarium)}
                >
                  Edytuj
                </button>
              )}
              <button
                onClick={() => deleteAqua(aquarium.id)}
                className={style.DeleteBtn}
              >
                Usuń
              </button>
            </div>
            {id === aquarium.id && visible && (
              <FormMenu visible={handleVisibleCl} index={id} actual={visible} />
            )}
          </div>
        ))}
      </div>
      <button className={style.BackBtn}>
        <NavLink
          to="/profile/mainpage"
          style={{ color: "black", textDecoration: "none" }}
        >
          Strona główna
        </NavLink>
      </button>
    </div>
  );
};

export default MyAqua;
