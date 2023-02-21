import React, { useState } from "react";
import style from "./Modal.module.css";
import Close from "../../Assets/close.svg";
//import axios from "axios";
//const url = "http://3.68.195.28/api/users/";
const EditUser = (props) => {
  const [name, setName] = useState("Michał");
  const [lastName, setLastName] = useState("Nowak");
  const [phoneNumber, setPhone] = useState("345655444");
  const [description, setDescription] = useState("Witam wszytskich");
  //const [id, setId] = useState(props.id);

  const update = (e) => {
    const set = "set"+e.target.name;
    console.log(set);
    switch(set){
        case "setName":
            setName(e.target.value);
            break;
        case "setLastName":
            setLastName(e.target.value);
            break;
        case "setPhone":
            setPhone(e.target.value);
            break;
        case "setDescription":
            setDescription(e.target.value);
            break;
        default:
            console.error(e.target.name);
    }
  };
  /*const onSubmit = async () => {
    const userData = {
      firstName: name,
      lastName: lastName,
      phoneNumber: phoneNumber,
      description: description,
    };
    const response = await axios
      .patch(
        url + id,
        {
          userData,
        },
        { headers: { Authorization: `Bearer ${props.token}` } }
      )
      .then(props.getData, props.CloseModal());
  };*/

  return (
    <div className={style.MainContainer}>
      <div className={style.HeaderContainer}>
        <h2 className={style.Header}>Edytuj dane</h2>
        <button className={style.CloseBtn} onClick={props.closeModal}>
          <img alt="" src={Close} />
        </button>
      </div>
      <form onSubmit={() => this.onSubmit()}>
        <div className={style.LabelGroup}>
          <label className={style.EditTextLabel}>Imię </label>
          <input
            className={style.TextInput}
            value={name}
            type="text"
            name="Name"
            onChange={(e) => update(e)}
          ></input>
        </div>
        <div className={style.LabelGroup}>
          <label className={style.EditTextLabel}>Nazwisko</label>
          <input
            className={style.TextInput}
            value={lastName}
            type="text"
            name="LastName"
            onChange={(e) => update(e)}
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
            onChange={(e) => update(e)}
          ></input>
        </div>
        <div className={style.LabelGroup}>
          <label className={style.EditTextLabel}>Dodatkowe informacje </label>
          <input
            className={style.TextInput}
            value={description}
            name="Description"
            onChange={(e) => update(e)}
          ></input>
        </div>
        <div className={style.FormContainerButtons}>
          <button className={style.Send} id={style.SaveChange}>
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
