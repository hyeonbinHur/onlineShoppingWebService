import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import PersonalInfo from "./PersonalInfo";
import SideBar from "../components/SideBar";
import Nav from "./nav";
import Footer from "./footer";
function SoldItem(props) {
    
    const [index, setIndex] = useState(0);


    return (
        <div className="orders--item">
            <div className="orders--item--left">
                <p className="purchased-name">{props.data?.title}</p>
                <p >{props.data?.price}$</p>
                <p >{props.data?.content}</p>
            </div>
            <p><img className="purchased-image" src={props.data.img} alt="product" /></p>
            {/* <img src="./profile-avatar.jpg"></img> */}
        </div>)
}

export default function Sold() {

    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    const endPoint = `http://localhost:8000/api/post/getSoldPosts/${user._id}`
    const [posts, setPosts] = useState([])


    const LoadPage = async () => {
        try {

            const res = await axios.get(endPoint)
            setPosts(res.data)
            console.log(res.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        LoadPage()
    }, [data])

    return (
        <>
            <Nav />
            <div className="info--body">
                <div className='side'>
                        <PersonalInfo />
                        <SideBar></SideBar>
                </div> 
                <div className='vl'></div>  
                <div className="orders">
                    <div className="orders--header">
                        <h3>Sold Items
                        </h3>
                        {/* <p>3 items</p> */}
                    </div>
                    <div className="orders--body">
                        {
                            posts.map((p) => {
                                return (
                                    <SoldItem
                                        data={p}
                                        key = {p._id}
                                    />
                                )

                            })
                        }

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}