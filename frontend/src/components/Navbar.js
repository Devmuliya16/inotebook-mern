import React, { useEffect} from "react";

//for creating the navigation bar tab active
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";



const Navbar = () => {
  let location = useLocation(); //gives the object in which path is exist as pathname
  useEffect(()=>{
  },[location]);

  
  if(window.location.href==="http://localhost:3000/" && localStorage.getItem('authTokenNotes')===null){
    window.location.href='http://localhost:3000/login' 
  }

  const delauth = ()=>{
    localStorage.removeItem('authTokenNotes');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light" style={{minWidth:'300px'}}>
        <div className="container-fluid">
          <div className="navbar-brand">
            iNotebook
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                 className={`nav-link ${(location.pathname === "/") ? "active" : ""}`} to='/'>
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                className={`nav-link ${(location.pathname === "/about") ? "active" : ""}`}
                  to="/about">
                  About
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {/* if logged in then show logout button only */}
              {localStorage.getItem('authTokenNotes')===null ? 
                <Link type="button" className="btn btn-primary mx-2" to="/login">Log in</Link>
                : <Link type="button" className="btn btn-primary mx-2" to="/login" onClick={delauth}>Log out</Link>
              }
              <Link type="button" className="btn btn-primary mx-2" to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;
