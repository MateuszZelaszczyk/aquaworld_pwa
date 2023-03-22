import React from 'react';
import style from "./InfoWindow.module.css"

const InfoWindow=(props)=> {

  const message = props.message;
  const show = props.show;
  console.log(show);


  return (
    <div>
      {show && (
        <div className={style.WindowContainer} style={ {color:`${props.color}`}}>
          <div className={style.Window} >
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{props.header}</h2>
          </div>
          <p style={{ fontSize: '16px' }}>{message}</p>
        </div>
      )}
    </div>
  );
}

export default InfoWindow;
