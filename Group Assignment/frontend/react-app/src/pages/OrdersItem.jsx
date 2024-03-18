import React from "react";
import { useState } from 'react';

// import Orders from "./Orders";

export default function OrdersItems() {
    const [products] = useState([
        {
            _id: "1",
            title: "Nike shoes",
            src: [
                "https://admin.thegioigiay.com/upload/product/2022/11/giay-the-thao-air-jordan-1-low-white-wolf-grey-aluminum-dc0774-105-size-37-636dffb35804c-11112022145427.png",
                "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_3504889%2F35048896632.2.jpg&type=f372_372",
                "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8602042%2F86020425785.jpg&type=a340",
                "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMDA3MTZfMjEz%2FMDAxNTk0OTAyMTgwMTIx.BnYQ6q3DyH7MkaE_YD1TZIXCrExIuB7RoufGtylgKXsg.T1p7LndqrmMLhPvdjKTfEA3hoxcHXPm3fFxZXul7_nMg.JPEG%2Fjordan1_low_paris_2.jpg&type=a340"
            ],
            description: "UI/UX designing, html css tutorials",
            content: "Welcome",
            price: 23,
            colors: ["red", "black", "crimosn", "teal"],
            count: 1
        }
    ]);
    const [index, setIndex] = useState(0);
    const selectedPicture = products[0].src[index];

    return (
        <div className="orders--item">
        <div className="orders--item--left">    
            <p className="purchased-name">{products[0].title}</p>
            <p>{products[0].price}$</p>
            <p>{products[0].description}</p>
        </div>                
        <p><img className="purchased-image" src={selectedPicture} alt="product" /></p>
        {/* <img src="./profile-avatar.jpg"></img> */}
    </div>)
}