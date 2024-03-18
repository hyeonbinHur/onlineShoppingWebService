import React, { useEffect, useState, useRef } from 'react';
import PersonalInfo from './PersonalInfo';
import SideBar from '../components/SideBar';
import axios from 'axios';
import Nav from './nav';
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Swal from "sweetalert2";
//S3
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'ap-southeast-1', credentials: creds })

const About = () => {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone_num);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);

    const [NewPhone, setNewPhone] = useState(user.phone_num);
    const [NewEmail, setNewEmail] = useState(user.email);
    const [NewAddress, setNewAddress] = useState(user.address);
    const [imgFlag, setIgmFlag] = useState(false);

    // Mass Product    

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
                setIgmFlag(true);
            }

            reader.readAsDataURL(file);
        };
    }
    function handleChooseFile() {
        if (fileInputRef.current) {
            fileInputRef.current.click();

        }
    }

    console.log('Here is the Path!', path);
    async function LoadPage() {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/user/${user._id}`);

            if (response.status === 200) {
                console.log(response.data);
                setProfilePicture(response.data.profilePicture);
                setPhone(response.data.phone_num);
                setAddress(response.data.address);
                setEmail(response.data.email);
                ReLoadLocal(response.data);
            } else {

            }
        } catch (error) {
            console.error(error);
        }
    }

    async function ReLoadLocal(data) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(data));

    }
    const updateHandler = (event) => {
        if (NewPhone.length > 8) {
            if (NewEmail.indexOf('@') === -1) {
                Swal.fire({
                    icon: "warning",
                    title: "Check your Email form",
                })

            } else {
                event.preventDefault();
                //S3
                try {
                    if (path !== null) {
                        const params = {
                            Bucket: 'box-4-imgs',
                            Key: 'users/' + path.name,
                            Body: path,
                        };
                        const upload = s3.send(new PutObjectCommand(params));

                    }

                } catch (error) {
                    alert('Fail to Upload to S3!' + error);
                    console.log('Fail to Upload to S3!', error);
                };
                //End of S3
                let newInfo = {};
                if (path == null) {
                    newInfo = {
                        address: NewAddress,
                        email: NewEmail,
                        phone_num: NewPhone
                    };

                } else if (path !== null) {
                    newInfo = {
                        address: NewAddress,
                        email: NewEmail,
                        phone_num: NewPhone,
                        profilePicture: 'https://box-4-imgs.s3.ap-southeast-1.amazonaws.com/users/' + (path.name).replace(' ', '+'),

                    };
                }
                updateUser(user._id, newInfo);

            }

        } else {

            Swal.fire({
                icon: "warning",
                title: "Phone number have to be longer than 9 digits!",
            })

        }
    };

    async function updataAvatar(event) {
        event.preventDefault();
        try {
            if (path !== null) {
                const params = {
                    Bucket: 'box-4-imgs',
                    Key: 'users/' + path.name,
                    Body: path,
                };
                const upload = s3.send(new PutObjectCommand(params));

                alert('Succeed Uploadding to S3!');
                console.log('Succeed Uploadding to S3!', upload);
            }

        } catch (error) {
            alert('Fail to Upload to S3!' + error);
            console.log('Fail to Upload to S3!', error);
        };

        let newInfo = {
            profilePicture: 'https://box-4-imgs.s3.ap-southeast-1.amazonaws.com/users/' + (path.name).replace(' ', '+'),
        };
        updateUser(user._id, newInfo);
    }


    const updateUser = async (userId, userData) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/user/update/${userId}`,
                userData
            );
            if (response.status === 200) {
                LoadPage();
                Swal.fire({
                    icon: "success",
                    title: "Profile has beed updated!",
                })
                localStorage.removeItem('user');
                try {
                    const response = await axios.get("http://localhost:8000/api/user/" +user._id)
                    console.log('Response:', response);
                    if (response.status === 200) {
                      const user = response.data;
                      localStorage.setItem('user', JSON.stringify(user));
                    } 
                  } catch (error) {
                    console.error(error);
                    if (error.response.status === 400) {
                      Swal.fire({
                        icon: "warning",
                        title: "Check your ID and Password Again",
                    })
                    } else {
                      alert("An error occurred. Please try again later.");
                    }
                  }
                window.location.reload();
            } else {
                console.log("update error");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Nav />
            <div className='info--body'>
                <div className='side'>
                    <PersonalInfo />
                    <SideBar></SideBar>
                </div>
                <div className='vl'></div>
                <div className='about-page'>
                    <div className='about-section'>
                        <header>MY PROFILE</header>
                        <table>
                            <tbody>
                                <tr className='about-row'>
                                    <td>Username : &nbsp;</td>
                                    <td>{user.username}</td>
                                </tr>
                                <tr className='about-row'>
                                    <td>Name : </td>
                                    <td>

                                        {name}

                                    </td>
                                </tr>
                                <tr className='about-row'>
                                    <td>Phone : &nbsp;</td>
                                    <td>

                                        {phone}

                                    </td>
                                </tr>
                                <tr className='about-row'>
                                    <td>Address : &nbsp;</td>
                                    <td>

                                        {address}

                                    </td>
                                </tr>
                                <tr className='about-row'>
                                    <td>Email : &nbsp;</td>
                                    <td>

                                        {email}

                                    </td>
                                </tr>
                                <tr className='about-row'>

                                    <td>Avatar: </td>
                                    <td>
                                        <div style={{ display: 'none' }}>
                                            <input type="file" ref={fileInputRef} onChange={loadFile} accept="image/*" />
                                        </div>
                                        <img id="preview" alt="" src={profilePicture} style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }} />
                                        <br />
                                        <div className="text-center">
                                            <button id="ImageUploadButton" type="button" onClick={handleChooseFile}>Choose Image</button>
                                        </div>
                                        <div className="text-center">
                                            {
                                                imgFlag && (
                                                    <button id="ImageUploadButton" type="button" onClick={updataAvatar}>Change My avatar</button>
                                                )
                                            }

                                        </div>
                                        <br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Edit Profile
                    </button>


                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Profile</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <label>
                                        Phone number
                                    </label>
                                    <br />
                                    <input className='modalInput profile-input' type="number" value={NewPhone} onChange={(event) => setNewPhone(event.target.value)} />
                                    <br />
                                    <label>
                                        Email
                                    </label>
                                    <br />
                                    <input className='modalInput profile-input' value={NewEmail} onChange={(event) => setNewEmail(event.target.value)} />
                                    <br />
                                    <label>
                                        Address
                                    </label>
                                    <br />
                                    <input className='modalInput profile-input' value={NewAddress} onChange={(event) => setNewAddress(event.target.value)} />
                                    <br />
                                    <label>
                                        Image
                                    </label>
                                    <br />


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                                    <button className='save-button' type='submit' onClick={updateHandler}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
