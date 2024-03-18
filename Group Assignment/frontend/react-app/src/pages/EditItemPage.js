import React, { useRef, useEffect, useState } from "react";
import Nav from "./nav";
import Footer from "./footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import Swal from "sweetalert2";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({ region: "ap-southeast-1", credentials: creds });

function EditItemPage() {
    const fileInputRef = useRef(null);
    let ItemImages;

    const [path, setPath] = useState(null);
    const [posts, setPosts] = useState();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [condition, setCondition] = useState("New");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");

    const [titleValid, settitleValid] = useState(false);
    const [priceValid, setPriceValid] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");
    const endPointPost = "http://localhost:8000/api/post/getPost/" + itemId;
    const endpointU = "http://localhost:8000/api/post/update/" + itemId;

    async function loadAllPosts() {
        try {
            const response = await axios.get(endPointPost);
            if (response.status === 200) {
                if (response.data) {
                    setPosts(response.data); //item data in posts
                    setTitle(response.data.title);
                    setPrice(response.data.price);
                    setSize(response.data.size);
                    setDescription(response.data.content);
                    setCondition(response.data.condition);
                    setImg(response.data.img);
                                       
                } else {
                    console.log("Data is undefined");
                }
            } else {
                alert("Load Failed");
            }
        } catch (error) {
            alert("Totally Failed: " + error.message);
        }
    }

    useEffect(() => {
        loadAllPosts();
    }, []);



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
    const handleSize = (event) => {
        setSize(event.target.value); // update the price state when input value changes
    };

    const handleDescription = (event) => {
        setDescription(event.target.value); // update the price state when input value changes
    };
    async function UpdateItem() {
        if (title.length > 3) {
            if (price > 9) {
                if (size > 3) {
                    if (path !== null) {
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

                                    Swal.fire({
                                        icon: "success",
                                        title: "Itme has beed updated!",
                                    })
                                    console.log('Succeed Uploadding to S3!', upload);
                                    document.location.href = '/selling'

                                } catch (error) {
                                    alert('Fail to Upload to S3!' + error);
                                    console.log('Fail to Upload to S3!', error);
                                }
                            } else {

                                Swal.fire({
                                    icon: "warning",
                                    title: "Item cannot be updated Reload the page",
                                })
                            }
                        } catch (error) {
                            alert("Totally Failed: " + error.message);
                        }
                    } else {
                        const updatedIteminfo = {
                            title: title,
                            price: price,
                            size: size,
                            condition: condition,
                            content: description,
                        }
                        try {
                            const response = await axios.put(endpointU, updatedIteminfo);
                            if (response.status === 200) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Itme has beed updated!",
                                })
                                document.location.href = '/selling'
                            } else {

                                Swal.fire({
                                    icon: "warning",
                                    title: "Item cannot be updated Reload the page",
                                })
                            }
                        } catch (error) {
                            alert("Totally Failed: " + error.message);
                        }
                    }
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Size cannot be empty or less than 3",
                    })
                }
            } else {

                Swal.fire({
                    icon: "warning",
                    title: "Price cannot be empty or less than 10",
                })
            }
        } else {

            Swal.fire({
                icon: "warning",
                title: "Title cannot be empty or less than 3",
            })
        }
    };

    const handleFileInputChange = (e) => {
        ItemImages = e.target.files[0];
        setPath(ItemImages);

    };

    function loadFile(event) {
        const file = event.target.files[0];
        setPath(file); //To get the path outside of the function
        console.log("path!!", file);
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
                        
                        <img id="preview" alt="" style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }} src={img} onChange={(event) => setImg(event.target.value)} />
                        <br />
                        <div className="text-center">
                            <button id="ImageUploadButton" type="button" onClick={handleChooseFile}>Choose File</button>
                        </div>

                    </div>
                    <div id="ImageContainer" className="col-lg-10 col-md-10 col-sm-10">
                        <hr />
                        <input id="TitleInput" placeholder="Title" value={title} onChange={titleHandler} />

                        <hr />
                        <label style={{ color: 'gray' }}>$</label>
                        <input id="PriceInput" placeholder="Price" type="number" value={price}
                            onChange={priceHandler} />

                        <hr />
                        <label style={{ color: 'gray' }}>us</label>
                        <input id="SizeInput" type="number" placeholder="Size" value={size} onChange={handleSize} />

                        <hr />
                        <select id="StatusSelet" onChange={(e) => setCondition(e.target.value)}>
                            <option> New </option>
                            <option> Second-hand </option>
                        </select>
                        <hr />

                        <hr />
                        <textarea id="DescriptionInput" placeholder="Description" value={description} onChange={handleDescription} />

                        <hr />

                    </div>

                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-10">
                <hr />
                <button type="button" className="btn btn-success" onClick={UpdateItem}>Success</button>
            </div>
        </div>
        <Footer />
    </div>;
}

export default EditItemPage;