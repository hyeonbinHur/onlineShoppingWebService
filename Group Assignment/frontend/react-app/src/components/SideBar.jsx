import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[        
        {
            path:"/about",
            name:"About",
            // icon:<FaUserAlt/>
        },
        {
            path:"/purchased",
            name:"Purchased Items",
            // icon:<FaShoppingBag/>
        },
        {
            path:"/selling",
            name:"Selling Items",
            // icon:<FaThList/>
        }
        ,
        {
            path:"/sold",
            name: "Sold Items"
        }
        
    ]
    return (
        <div className="container1">
           <div  className="sidebar">
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                            <div className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;