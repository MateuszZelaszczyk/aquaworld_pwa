import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./UserMenu.module.css";
import { logout } from "../../Actions/auth.js";
import { connect } from "react-redux";
import axios from "axios";
const Requests = ({ logout, isAuthenticated, ...props }) => {
  const navigate = useNavigate();
  const data = props.data;
  const token = localStorage.getItem("access");
  const Accep = (id) => {
    const response = axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/acceptfriend/${id}/`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        props.getRequests();
      });
  };
  const Reject = (id) => {
    const response = axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/rejectrequest/${id}/`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        props.getRequests();
      });
  };
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={style.ReqContainer}>
      {data.map((req) => (
        <div key={req.request_id} className={style.ReqRow}>
          {req.user.firstname} {req.user.lastname}
          <button
            className={style.AcceptBtn}
            onClick={() => Accep(req.request_id)}
          >
            Akceptuj
          </button>
          <button
            className={style.DeleteBtn}
            onClick={() => Reject(req.request_id)}
          >
            Odrzuć
          </button>
        </div>
      ))}
    </div>
  );
};
const mapSatateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapSatateToProps, { logout })(Requests);
