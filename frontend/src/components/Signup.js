import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const Signup = () => {
  const data = useContext(noteContext);
  const { signup } = data;

  const [state, changeState] = useState({ user: "", email: "", password: "" });
  const [incorrectemailmsg,changemsg] =useState('');
  const [incorrectpasswordmsg,changealert] =useState('');
  
  const [submitstatus,buttondisable] = useState(false);
  const onChange = (e) => {
    changeState({ ...state, [e.target.name]: e.target.value });

    //for incorrect email id format
    if(e.target.name==='email'){
      if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value)){
        changemsg('please enter valid email id');
        buttondisable(true);
      }
      else{
        changemsg('');
        buttondisable(false);
      }
    }
    
    //for incorrect password format
    if(e.target.name==='password'){
      if(!/^[a-zA-Z0-9]{8,}$/.test(e.target.value)){
        changealert('password should be atleast 8 digit long');
        buttondisable(true);
      }
      else{
        changealert('');
        buttondisable(false);
      }
      
    }
  }

  
  const sign = (e) => {
    signup(e, state.user, state.email, state.password);
  };



  return (
    <>
      <div className="w-50 m-auto mt-5" style={{ minWidth: "300px" }}>
        <h3>Sign up</h3>
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
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              aria-required
            >
              Email address
            </label>
            <div>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={state.email}
                onChange={onChange}
              />

              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
                {incorrectemailmsg}
              </div>
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
            <div id="passwordHelp" className="form-text">
                {incorrectpasswordmsg}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={sign}
            disabled={
              state.user === "" || state.email === "" || state.password === "" || submitstatus
            }
          >
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
