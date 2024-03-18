import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
// import WishlistItem from "./sellingItem"
import PersonalInfo from "./PersonalInfo";
import SideBar from "../components/SideBar";
import Nav from "./nav";
import Footer from "./footer";
function SellingItem(props) {
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
    const no = products.length;
    const [index, setIndex] = useState(0);
    const selectedPicture = products[0].src[index];

    return (
        <div className="wishlist--item">
            <div className="wishlist--item--left">
                <p className="purchased-name">{props.data?.title}</p>
                <p >{props.data?.price}$</p>
                <p >{props.data?.content}</p>
            </div>
            <img className="purchased-image" src={selectedPicture} alt="product image"></img>
        </div>
    )
}

export default function Selling() {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    const endPoint = `http://localhost:8000/api/post/getPosts/${user._id}`
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
            <PersonalInfo />
            <div className="info--body">
                <SideBar>
                </SideBar>
                <div className="wishlist">
                    <div className="wishlist--header">
                        <h3>All Item</h3>
                        {/* <p>{no} items</p> */}
                    </div>
                    <div className="orders--body">
                        {
                            posts.map((p) => {
                                return (
                                    <SellingItem
                                        data={p}
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