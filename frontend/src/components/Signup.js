import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const Signup = () => {
  const data = useContext(noteContext);
  const {signup} = data;

  const [state,changeState] = useState({user:"",email:"",password:""});
  const onChange = (e)=>{
    changeState({...state,[e.target.name]: e.target.value})
  }

  const sign = (e)=>{
    signup(e,state.user,state.email,state.password)
    // window.location.href='/';
  }

  return (
    <>
      <div className="w-50 m-auto" style={{minWidth:'300px'}}>
        <h3>sign up</h3>
      <form>
        <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
            user name
          </label>
          <input
            type="text"
            className="form-control"
            name="user"
            value={state.user}
            onChange={onChange}
          />
          <label htmlFor="exampleInputEmail1" className="form-label" aria-required>
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={state.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={state.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={sign}
        disabled={state.user==="" || state.email==="" || state.password===""}>
          Submit
        </button>
       </form>
      </div>
    </>
  );
};

export default Signup;


//todo 
//set input type email
//why required is not working