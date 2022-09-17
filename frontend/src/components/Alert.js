import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";
const Alert = () => {
  const data = useContext(noteContext);
  const { msg } = data;
  

  //for display or hide the alert
  const [dspl,setDspl] = useState("");
  return (
    <>
      <div style={{minWidth:'300px'}} className={`alert alert-primary ${dspl}`} role="alert">
        {msg}
      </div>
    </>
  );
};

export default Alert;
