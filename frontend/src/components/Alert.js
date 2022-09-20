import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/noteContext";
const Alert = () => {
  const data = useContext(noteContext);
  const { msg } = data;

  //for display or hide the alert
  const [displayalert,toggle] = useState('d-none');
  useEffect(()=>{
    toggle('');
    setTimeout(()=>{
      toggle('d-none');
    },2000)
  },[msg])

  
  return (
    <>
      <div style={{minWidth:'300px'}} className={`alert alert-primary ${displayalert}`} role="alert">
        {msg}
      </div>
    </>
  );
};

export default Alert;
