import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './profile.css'
import Login from "./pages/login";
import SignUp from "./pages/Signup"
import Main from "./pages/main"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Itemdetail from './pages/itemdetail';
import Checkout from './pages/checkout';
import CustomerAccount from './pages/CustomerAccount';
import About from './pages/About';
import Orders from './pages/Purchased';
import Selling from './pages/Selling';
import PostPage from './pages/Postpage';
import Sold from './pages/Sold';
import MyItem from './pages/MyItem';
import EidtItemPage from './pages/EditItemPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Router>
  <div>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Main" element={<Main />} />
      <Route path="/Itemdetail" element={<Itemdetail />} />
      <Route path="/Checkout" element={<Checkout />} />
      <Route path="/CustomerAccount" element={<CustomerAccount />} />
      <Route path="/about" element={<About />} />
      <Route path="/purchased" element={<Orders />} />
      <Route path="/allmyItem" element={<MyItem />} />
      <Route path="/selling" element={<Selling />} />
      <Route path="/sold" element={<Sold />} />   
      <Route path="/post" element={<PostPage />} />
      <Route path="/editItem" element={<EidtItemPage />}/>
    </Routes>
  </div>
</Router>
  // <React.StrictMode>
  //   <Login />
  //   <SignUp />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
