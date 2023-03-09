import React, { useState, useEffect } from "react";
import styleLogin from "../LogInPage/LogIn.module.css"
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../Actions/auth";
import { useParams } from "react-router-dom";

const Activate = ({ verify }) => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const { uid, token } = useParams();
  const verify_acc = () =>{
      verify(uid, token);
      setVerified(true)

  }
  useEffect(() => {
    if (verified) {
      navigate("/");
    }
  }, [verified, navigate]);

  return (
    <div className={styleLogin.LoginPage} id={styleLogin.activdiv}>
     <h1>Aktywacja konta</h1>
     <button className={styleLogin.Button} id={styleLogin.active} onClick={verify_acc} type="button">Aktywuj</button>
    </div>
  );
};

export default connect(null, { verify })(Activate);
