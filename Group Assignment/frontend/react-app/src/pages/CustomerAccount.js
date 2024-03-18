import React from 'react'
// import Nav from "./pages/Nav"
import PersonalInfo from "./PersonalInfo";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SideBar from '../components/SideBar';
import About from './About.jsx';
import Wishlist from './Selling.jsx';
// import './profile.css'
import Nav from "./nav.js"

function CustomerAccount() {
    return (
      <>
      <Nav/>
      <PersonalInfo/>
      <SideBar>
      </SideBar>
    </>
    );
  }
  
  export default CustomerAccount;