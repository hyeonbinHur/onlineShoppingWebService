//import { useState } from "react";
import React, { useRef } from "react";
import Nav from "./nav";
import Footer from "./footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";


//S3
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'ap-southeast-1', credentials: creds })

function PostPage() {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [condition, setCondition] = useState("New");
    const [desctiption, setDescription] = useState("");


    const [titleValid, settitleValid] = useState(false);
    const [priceValid, setPriceValid] = useState(false);
 
    const titleHandler = (event) => {
        setTitle(event.target.value);
        if (title.length > 3) {
            settitleValid(true);
        } else {
            settitleValid(false);
        }
    };
    const priceHandler = (event) => {
        setPrice(event.target.value);
        if (price > 0) {
            setPriceValid(true);
        } else {
            setPriceValid(false);
        }
    };
   






    /////////////////////////////////////////////// need to put price/////////////////////////

    const endPoint = "http://localhost:8000/api/post/create"

    const fileInputRef = useRef(null);
    let ItemImages;

    const [path, setPath] = useState(null); //To get the path outside of the function

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
    function handleChooseFile() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    console.log('Here is the Path!', path); //test the path

    const submitHandler = async (event) => {
        if (titleValid) {
            if (priceValid) {
                if (size > 3) {
                    
                    if (path !== null) {
                        const data = localStorage.getItem('user');
                        const user = JSON.parse(data);
                        let postItem = {
                            userId: user._id,
                            title: title,
                            content: desctiption,
                            size: size,
                            condition: condition,
                            price: price,
                            img: 'https://box-4-imgs.s3.ap-southeast-1.amazonaws.com/' + (path.name).replace(' ', '+'),
                            users: [
                                {
                                    username: user.username,
                                    profilePicture: ""
                                }
                            ]
                        }
                        await axios.post(endPoint, postItem)
                        event.preventDefault();
                        try {
                            const params = {
                                Bucket: 'box-4-imgs',
                                Key: path.name,
                                Body: path,
                            };
                            const upload = await s3.send(new PutObjectCommand(params));
                
                            Swal.fire({
                                icon: "success",
                                title: "Your Item is posted!",
                            })
                
                        } catch (error) {
                            alert('Fail to Upload to S3!' + error);
                            console.log('Fail to Upload to S3!', error);
                        };
                
                        document.location.href = '/Main'
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "Itme's Image is essential",
                        })
                    }

                } else {
                    console.log(size);
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

    };



const handleSize = (event) => {
    setSize(event.target.value); // update the price state when input value changes
};

const handleDescription = (event) => {
    setDescription(event.target.value); // update the price state when input value changes

};


return <div>
    <Nav />
    <div className="row">
        <div id="PageHeader" className="col-lg-10">
            <h2 >Post Item</h2>
        </div>
        <div className="col-lg-10">
            <hr />
        </div>
    </div>

    <div id="cardContainer" className="bg-light">
        <div className="container">
            <div id="PostPageContainer" className="row ">
                <div id="ImageContainer" className="col-lg-2 col-md-2 col-sm-2">
                    <div style={{ display: 'none' }}>
                        <input type="file" ref={fileInputRef} onChange={loadFile} accept="image/*" />
                    </div>
                    <img id="preview" alt="" style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }} />
                    <br />
                    <div className="text-center">
                        <button id="ImageUploadButton" type="button" onClick={handleChooseFile}>Choose Image</button>
                    </div>

                </div>
                <div id="ImageContainer" className="col-lg-10 col-md-10 col-sm-10"> 
                    <label className="form-title" htmlFor="title">Title</label>      
                    <br></br>             
                    <input id="TitleInput" placeholder="title" value={title} onChange={titleHandler} />
                    <div className='Login_Error' >
                        {
                            !titleValid && (
                                <p>Title is essential</p>
                            )
                        }
                    </div>
                    <hr />
                    <label style={{ color: 'black' }}>$</label>
                    <label className="form-title" htmlFor="price">Price</label>      
                    <br></br> 
                     
                    <input id="PriceInput" placeholder="price" type="number" value={price}
                        onChange={priceHandler} />
                    <div className='Login_Error' >
                        {
                            !priceValid && (
                                <p>Price is essential</p>
                            )
                        }

                    </div>
                    <hr />                    
                    <label className="form-title" htmlFor="size">US Size</label>      
                    <br></br>  
                    <input id="SizeInput" type="number" placeholder="size" value={size} onChange={handleSize} />
                   
                    <hr />
                    <label className="form-title" htmlFor="condition">Condition</label>      
                    <br></br>  
                    <select id="StatusSelect" onChange={(e) => setCondition(e.target.value)}>
                        <option> New </option>
                        <option> Second-hand </option>
                    </select>
                    <hr />
                    <label className="form-title" htmlFor="description">Description</label>      
                    <br></br>  
                    <textarea id="DescriptionInput" placeholder="Description" value={desctiption} onChange={handleDescription} />

                </div>
            </div>
        </div>
        <button type="button" className="btn btn-success" onClick={submitHandler}>Success</button>
    </div>

    <div className="row">
        <div className="col-lg-10">            
           
        </div>
    </div>
    <Footer />
</div>;
}

export default PostPage;