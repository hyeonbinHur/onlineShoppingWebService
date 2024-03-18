import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function PersonalInfo() {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    return (
        <div>
            <div>
            <div className="personal-info">
            <img src = {user.profilePicture} alt = "avatar" className="navbar-brand img-fluid col-2 align-middle"></img>     
                    <h3 className="text-center"> {user.name} </h3>                    
                </div>
            </div>
        </div>
    )
}