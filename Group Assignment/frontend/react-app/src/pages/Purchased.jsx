import React, { useEffect, useState } from 'react';
import PersonalInfo from "./PersonalInfo";
import SideBar from "../components/SideBar";
import Nav from "./nav";
import Footer from "./footer";
import axios from 'axios';

function PurchasedItem(props) {
    
    const [index, setIndex] = useState(0);

    return (
        <div className="wishlist--item">
            <div className="wishlist--item--left">
                <p className="purchased-name">{props.data?.title}</p>
                <p >{props.data?.price}$</p>
                <p >{props.data?.content}</p>
            </div>
            <img className="purchased-image" src={props.data.img} alt="product image"></img>
        </div>
    )
}

export default function Orders() {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    const endPoint = `http://localhost:8000/api/post/getBoughtPosts/${user._id}`
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
    // const data = localStorage.getItem('user');
    // const user = JSON.parse(data);

    // const endPoint = "http://localhost:8000/api/user/" + user._id;
    // const [posts, setPosts] = useState([]);
    // let myItemInfo = [];

    // async function loadAllPosts() {
    //     try {
    //         const response = await axios.get(endPoint);
    //         if (response.status === 200) {
    //             setPosts(response.data.bought_posts);
    //             console.log(posts);
    //         } else {
    //             alert("Load Failed");
    //         }
    //     } catch (error) {
    //         alert("Totally Failed: " + error.message);
    //     }
    // }

    // async function findItem() {
    //     const findItemEndpoint = "http://localhost:8000/api/post/posts";
    //     try {
    //         const response = await axios.get(findItemEndpoint);
    //         if (response.status === 200) {
    //             console.log("response", response.data);
    //             for (let i = 0; i < posts.length; i++) {
    //                 for (let j = 0; j < response.data.length; j++) {
    //                     if (posts[i] === response.data[j]._id) {
    //                         myItemInfo.push(response.data[j]);
    //                         break;
    //                     }
    //                 }
    //             }
    //             console.log("my", myItemInfo);
    //         } else {
    //             alert("Load Failed");
    //         }
    //     } catch (error) {
    //         alert("Totally Failed: " + error.message);
    //     }
    // }

    // useEffect(() => {
    //     console.log("HELLO");
    //     loadAllPosts();
    // }, []);

    // useEffect(() => {
    //     console.log("POSTS UPDATED", posts);
    //     findItem();
    // }, [posts]);
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
                        <h3>Purchased Items

                        </h3>
                    </div>
                    <div className="orders--body">
                        {
                            posts.map((p) => {
                                return (
                                    <PurchasedItem
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

    // const [purchased] = useState([
    //     {
    //         _id: "1",
    //         title: "Nike shoes",
    //         src: [
    //             "https://admin.thegioigiay.com/upload/product/2022/11/giay-the-thao-air-jordan-1-low-white-wolf-grey-aluminum-dc0774-105-size-37-636dffb35804c-11112022145427.png",
    //             "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_3504889%2F35048896632.2.jpg&type=f372_372",
    //             "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8602042%2F86020425785.jpg&type=a340",
    //             "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMDA3MTZfMjEz%2FMDAxNTk0OTAyMTgwMTIx.BnYQ6q3DyH7MkaE_YD1TZIXCrExIuB7RoufGtylgKXsg.T1p7LndqrmMLhPvdjKTfEA3hoxcHXPm3fFxZXul7_nMg.JPEG%2Fjordan1_low_paris_2.jpg&type=a340"
    //         ],
    //         description: "UI/UX designing, html css tutorials",
    //         content: "Welcome",
    //         price: 23,
    //         colors: ["red", "black", "crimosn", "teal"],
    //         count: 1
    //     }
    // ]);

}
