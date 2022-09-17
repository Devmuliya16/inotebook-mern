import React, { useContext ,useState} from "react";
import noteContext from "../context/noteContext";

const Login = () => {
  const data = useContext(noteContext);
  const {login} = data; //getting the login api handler from the noteState

  const [state,changeState] = useState({email:"", password:""});
  const onChange = (e)=>{
    changeState({...state, [e.target.name]: e.target.value})
  }

  const log = (e)=>{
    login(e,state.email,state.password);
  }
  return (
    <>
    <div className=" m-auto w-50" style={{minWidth:'300px'}}>
      <h3>Log-in</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
            value={state.email}
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
            onChange={onChange}
            value={state.password}/>
        </div>
        
        <button className="btn btn-primary" onClick={log} >
          Log-in
        </button>
      </form></div>
    </>
  );
};

export default Login;
