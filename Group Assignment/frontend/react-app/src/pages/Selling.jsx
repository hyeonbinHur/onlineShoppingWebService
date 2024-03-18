import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
// import WishlistItem from "./sellingItem"
import PersonalInfo from "./PersonalInfo";
import SideBar from "../components/SideBar";
import Nav from "./nav";
import Footer from "./footer";
import Swal from "sweetalert2";


import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'ap-southeast-1', credentials: creds })


function SellingItem(props) {
    const [title, setTitle] = useState(props.data.title);
    const [price, setprice] = useState(props.data.price);
    const [size, setsize] = useState(props.data.size);
    const [condition, setcondition] = useState(props.data.condition);
    const [description, setdescription] = useState(props.data.content);
    const [img, setimg] = useState(props.data.img);
    // DeleteItem function
    const endpoint = "http://localhost:8000/api/post/delete/" + props.data._id;
    async function DeleteItem() {
        try {
            const response = await axios.delete(endpoint);
            if (response.status === 200) {
                props.a();
            } else if (response.status === 500) {
                console.log("Con 500");
            } else {
                console.log("Unknown error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    // update function
    const endpointU = "http://localhost:8000/api/post/update/" + props.data._id;
    async function UpdateItem() {
        if (title.length > 3) {
            if (price > 9) {
                if (size > 3) {
                    if (path !== null) {
                        console.log(props.data._id);
                        const updatedIteminfo = {
                            title: title,
                            price: price,
                            size: size,
                            condition: condition,
                            content: description,
                            img: 'https://box-4-imgs.s3.ap-southeast-1.amazonaws.com/' + (path.name).replace(' ', '+')
                        }
                        try {
                            const response = await axios.put(endpointU, updatedIteminfo);
                            if (response.status === 200) {

                                try {
                                    const params = {
                                        Bucket: 'box-4-imgs',
                                        Key: path.name,
                                        Body: path,
                                    };
                                    const upload = await s3.send(new PutObjectCommand(params));

                                    alert('Succeed Uploadding to S3!');
                                    console.log('Succeed Uploadding to S3!', upload);

                                } catch (error) {
                                    alert('Fail to Upload to S3!' + error);
                                    console.log('Fail to Upload to S3!', error);
                                };
                                props.a();
                            } else if (response.status === 500) {
                                console.log("Con 500");
                            } else {
                                console.log("Unknown error");
                            }
                        } catch (error) {
                            console.error(error);
                        }

                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "Itme's Image is essential",
                        })
                    }
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "SIZE must be bigger than 4",
                    })
                }

            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Check The Price",
                })

            }

        } else {
            Swal.fire({
                icon: "warning",
                title: "Check The Title",
            })
        }
    }
    const [index, setIndex] = useState(0);
    let ItemImages;
    const [path, setPath] = useState(null);

    function loadFile(event) {
        const file = event.target.files[0];
        setPath(file); //To get the path outside of the function
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const img = document.getElementById("preview");
                img.src = reader.result;
                console.log(img.src);
                ItemImages = file;
                console.log(ItemImages);
            }
            reader.readAsDataURL(file);
        };
    }
    const fileInputRef = useRef(null);
    function handleChooseFile() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
 

    const idcheck = (props) => {
        setTitle(props.title);
        setprice(props.price);
        setsize(props.size);
        setcondition(props.condition);
        setdescription(props.content);
      
    }

    const goEditItem = (event) => {
        event.preventDefault();
        const url = `/editItem?id=${props.data._id}`;
        window.location.href = url;
    };
    return (
        <div>

              <button onClick={goEditItem} className="UpdateBtn">Edit</button>
            <button onClick={DeleteItem} className="UpdateBtn"> Delete</button>
           
            <div className="wishlist--item">
                <div className="wishlist--item--left">
                    <p className="purchased-name">{props.data?.title}</p>
                    <p >{props.data?.price}$</p>
                    <p >{props.data?.content}</p>
                </div>
                <img className="purchased-image" src={props.data.img} alt="product image"></img>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                   
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{props.data?.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="UpdateContainer">
                                <label>Title</label><br />
                                <input className="modalinput" defaultValue={title} onChange={(event) => setTitle(event.target.value)} /><br />
                                <label>Price</label><br />
                                <input className="modalinput" type="number" defaultValue={price} onChange={(event) => setprice(event.target.value)} /><br />
                                <label>Size</label><br />
                                <input className="modalinput" type="number" defaultValue={size} onChange={(event) => setsize(event.target.value)} /><br />
                                <label>Condition</label><br />
                                <select id="modalselec" onChange={(e) => setcondition(e.target.value)}>
                                    <option id="modalselec"> New </option>
                                    <option id="modalselec"> Second-hand </option>
                                </select>
                                <br />
                                <label>Description</label><br />
                                <input className="modalinput" defaultValue={description} onChange={(event) => setdescription(event.target.value)} /><br />
                                <label>Image</label><br />
                                <div id="ImageContainer" className="col-lg-2 col-md-2 col-sm-2">
                                    <div style={{ display: 'none' }}>
                                        <input type="file" ref={fileInputRef} onChange={loadFile} accept="image/*" />
                                    </div>
                                    <img id="preview" alt="" style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }} />
                                    <br />
                                    <div className="text-center">
                                        <button id="ImageUploadButton" type="button" onClick={handleChooseFile}>Choose File</button>
                                    </div>

                                </div>


                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={UpdateItem}>Update Item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default function Selling() {
    const a = () => {
        window.location.reload();
    };

    const data = localStorage.getItem('user');
    const user = JSON.parse(data);

    const endPoint = `http://localhost:8000/api/post/getNotSoldPosts/${user._id}`
    const [posts, setPosts] = useState([])


    const LoadPage = async () => {
        try {
            const res = await axios.get(endPoint)
            setPosts(res.data)


        } catch (err) {

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
                <div className="wishlist">
                    <div className="wishlist--header">
                        <h3>Selling Items</h3>
                        {/* <p>{no} items</p> */}
                    </div>
                    <div className="orders--body">
                        {
                            posts.map((p) => {
                                return (
                                    <SellingItem
                                        key={p._id}
                                        data={p}
                                        a={a}
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

