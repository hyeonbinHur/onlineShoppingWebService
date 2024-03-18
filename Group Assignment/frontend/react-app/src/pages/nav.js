import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import cloudLogo from './images/cloudlogo.png';


function Nav() {
  const onLogout = () => {
    localStorage.removeItem('user');
    document.location.href = '/Login'
  }
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  useEffect(() => {
    const userNameMain = document.getElementById("userName_main");


    if (user?.name) {
      userNameMain.innerHTML = user.name;
    }
  }, []);

  return <nav className="navbar navbar-expand-lg bg-light" id="navBar">
    <div className="container-fluid" id="navBar">
      <a className="navbar-brand" href="/Main">
        <img src={cloudLogo} alt="Cloud Logo" id="logo" />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="liContainer">
          <li className="nav-item">
            <a className="nav-link" id="navLink" aria-current="page" href="/Main">MAIN</a>
          </li>
          
          <li className="nav-item">
            <a className="nav-link" id="navLink" href="/post">POST</a>
          </li>
          <li className="nav-item" >
            <a className="nav-link" id="navLink" href="/About">PROFILE</a>
          </li>
          

        </ul>
        <span className="navbar-text nav-item" id="MyName"  >
          <div className="dropdown">
            <button id="userName_main" className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundImage: "none" }}>

            </button>
            <ul className="dropdown-menu custom-dropdown-menu">
              <button onClick={onLogout} className="logout--button">
                Log out
              </button>
            </ul>
          </div>          
              <button onClick={onLogout} className="logout--button">
                Log out
              </button>
          
        </span>
      </div>
    </div>
  </nav>;
}
export default Nav;
