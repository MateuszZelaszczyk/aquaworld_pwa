import React, { useState, useEffect } from "react";
import style from "./Modal.module.css";
import Close from "../../Assets/close.svg";
import axios from "axios";
//import axios from "axios";
//const url = "http://3.68.195.28/api/users/";
const EditUser = (props) => {
  const [id,setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [province, setProvince] = useState("");
  const token = localStorage.getItem("access");
  const getData = async () => {
    const response = await axios.get("http://localhost:8000/api/userInfo/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data['user'][0];
    setId(response.data["id"]);
    setName(data.firstname);
    setLastName(data.lastname);
    if (data.phone) {
      setPhone(data.phone);
    }
    if (data.location) {
      setLocation(data.location);
    }
    if (data.province) {
      setProvince(data.province);
    }
  };
  const update = (e) => {
    e.preventDefault();
    const response = axios.put(
      `http://localhost:8000/api/updateuser/${id}/`,
      {
        firstname: name,
        lastname: lastName,
        phone: phoneNumber,
        location: location,
        province: province,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response)=>{ props.getInfo(); props.getData()})
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.MainContainer}>
      <div className={style.HeaderContainer}>
        <h2 className={style.Header}>Edytuj dane</h2>
        <button className={style.CloseBtn} onClick={props.closeModal}>
          <img alt="" src={Close} />
        </button>
      </div>
      <form onSubmit={update}>
        <div className={style.LabelGroup}>
          <label className={style.EditTextLabel}>Imię </label>
          <input
            className={style.TextInput}
            value={name}
            type="text"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className={style.LabelGroup}>
          <label className={style.EditTextLabel}>Nazwisko</label>
          <input
            className={style.TextInput}
            value={lastName}
            type="text"
            name="LastName"
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
        <div className={style.LabelGroup}>
          <label className={style.EditTextLabel} id={style.EditNumber}>
            Numer telefonu
          </label>
          <input
            className={style.TextInput}
            value={phoneNumber}
            type="tel"
            name="Phone"
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <div className={style.LabelGroup}>
          <label className={style.EditTextLabel}>Miasto </label>
          <input
            className={style.TextInput}
            value={location}
            name="Location"
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>
        <div className={style.LabelGroup}>
          <label className={style.EditTextLabel}>Województwo </label>
          <input
            className={style.TextInput}
            value={province}
            name="Province"
            onChange={(e) => setProvince(e.target.value)}
          ></input>
        </div>
        <div className={style.FormContainerButtons}>
          <button type="submit" className={style.Send} id={style.SaveChange}>
            Zapisz zmiany
          </button>
          <button
            type="button"
            className={style.Back}
            id={style.Back}
            onClick={props.closeModal}
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditUser;
