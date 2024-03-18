import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./nav";
import Footer from "./footer";
import axios from 'axios';
import { FaHeart, FaRocketchat } from "react-icons/fa";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Swal from "sweetalert2";

function Detail() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");
    console.log(itemId)
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    // console.log(user)
    const endPointPost = "http://localhost:8000/api/post/getPost/" + itemId;
    const endPointFeedbacks = "http://localhost:8000/api/feedback/getFeedbacks/" + itemId;
    const endPointLike = "http://localhost:8000/api/post/like/" + itemId;
    const [post, setPost] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [seller, setSeller] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    


    const [feedbackCount, setFeedbackCount] = useState(0)
    async function loadAllPost() {
        try {
            const response = await axios.get(endPointPost);
            if (response.status === 200) {
                if (response.data) {
                    setPost(response.data); //item data in posts
                    if (response.data.likes.includes(user._id)) {
                        setLiked(true)
                    }
                    setLikeCount(response.data.likes.length)
                    console.log(response.data.likes)
                    loadseller(response.data.userId);
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
        loadAllPost();
    }, []);
    //  console.log(posts.users.username);

    const handleLikeClick = async () => {
        try {
            const response = await axios.put(endPointLike, { userId: user._id });
            loadAllPost();
        } catch (err) {
            console.log(err)
        }

    };
    const GoBack = (event) => {
        event.preventDefault();
        document.location.href = '/Main'
    };
    function moveTopurchase() {
        if(post.userId !== user._id){
            console.log(itemId);
            const url = `/Checkout?id=${itemId}`
            window.location.href = url;
        }else{
            Swal.fire({
                icon: "warning",
                title: "This is your Item",
            })
        }
    }
    console.log("http://localhost:8000/api/user/" + post.userId);
    /////////////////////seller info/////////////////////
    async function loadseller(sellerId) {
        const seller_endpoint = "http://localhost:8000/api/user/" + sellerId;
        try {
            const response = await axios.get(seller_endpoint);
            if (response.status === 200) {
                if (response.data) {
                    setSeller(response.data); //item data in posts
                } else {
                    console.log("Data is undefined");
                }
            } else {
                alert("Load Failed");
            }
        } catch (error) {
            // alert("Totally Failed: " + error.message);
        }
    }
    console.log("seller :", seller);
    async function loadAllFeedbacks() {
        try {
            const response = await axios.get(endPointFeedbacks);
            console.log(response)
            if (response.status === 200) {
                if (response.data) {
                    setFeedbacks(response.data); //item data 
                    setFeedbackCount(response.data.length)
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
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formatDate = (newDate) => {
        var date = new Date(newDate)
        return date.getDate() + " - " + month[date.getMonth()] + " - " + date.getFullYear()
    }
    useEffect(() => {
        loadAllFeedbacks();
    }, []);


    return (
        <div>
            <Nav />
            <button className='goback-button'
                onClick={GoBack}
            >
                Go Back
            </button>
            <div id="itemDetailContainer" className="row">
                <div id="itemPictureContainer" className=" col-xl-6 col-lg-6 col-md-10 col-sm-10">
                    <img id="itemPicture" src={post.img} alt="product" />
                </div>
                <div id="itemInfoContainer" className=" col-xl-6 col-lg-6 col-md-10 col-sm-10">
                    <div className="itemInfo">
                        <div className="item-detail-header">
                            <h3 className="itemTitle">{post.title}</h3>
                            <p>{formatDate(post.createdAt)}</p>
                            <p id="itemPrice" className="itemPrice">{post.price}$
                            </p>
                            <button
                                id="likeButton"
                                onClick={handleLikeClick}
                                className={`like-button${liked ? " liked" : ""}`}
                            >
                                {liked ? "Unlike" : "Like"}
                            </button>
                        </div>
                        <hr id="titleHr" />
                        <span id="like"><FaHeart id="icon"></FaHeart> {likeCount}  <FaRocketchat /> {feedbackCount}</span> <br />
                        <div className="itemDescription">
                            <span>Description: {post.content}</span> <br />
                            <span> Size: {post.size} </span> <br />
                            <span> Status: {post.condition}</span>
                        </div>
                        
                        <span> Sellers info <br /></span>
                        <span> Sellers name<br /></span> <p>{seller.username}</p>
                        <span> Seleers contact<br /></span> <p>{seller.phone_num}</p>
                        <button id="purchaseBtn" onClick={moveTopurchase}>Purchase</button>
                        <EditFeedback 
                            user={user}
                            postId={itemId}
                            feedbacks={feedbacks}
                            setFeedbacks={setFeedbacks}
                            loadAllFeedbacks={loadAllFeedbacks}
                        />
                                            
                    </div>
                </div>
            </div>
            <p className='comment-title'>Comments</p>
            <div className="comment">
                            <div className="mb-5 mt-2">
                                <div className="card">
                                    <div className="row1">
                                        <div className="col-md-12" >
                                            <div className="media mt-4">
                                                {/* <a class="pr-2" href="#"><img class="rounded-circle" alt="Bootstrap Media Another Preview" src="./person.png" /></a>
                                                <div class="media-body">
                                                    <div class="border">
                                                        <div class="row">
                                                            <div class="col-8 d-flex">
                                                                <h6>Pham Gia Nguyen</h6>
                                                                <span>- 2 hours ago</span>
                                                            </div>
                                                            <div class="col-4 d-flex">
                                                                <a href="#"><span><i class="fa fa-reply"></i> reply</span></a>
                                                            </div>
                                                        </div>
                                                        asdawdq wqeqw eqwe qweqw eqweqweqw qwe qweqwadas
                                                    </div>
                                                </div> */}
                                                {
                                                    feedbacks?.map((f) => {
                                                        console.log(f)
                                                        console.log(f.users)
                                                        console.log(f.users[0].username)
                                                        return (
                                                            <FeedbackOnPost
                                                                username={f.users[0].username}
                                                                profilePicture={f.users[0].profilePicture}
                                                                content={f.content}
                                                                date={formatDate(f.createdAt)}
                                                                feedback={f }
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            <Footer />
        </div>
    );
}
function EditFeedback(props) {
    const { user, postId, feedbacks, setFeedbacks, loadAllFeedbacks } = props
    const [feedback, setFeedback] = useState("")
    const handleFeedback = (e) => {
        setFeedback(e.target.value)
    }
    const handleResetFeedback = () => {
        setFeedback('')
    }
    const handlePost = async (e) => {
        var today = new Date();
        if (feedback) {
            const savedFeedback = await axios.post("http://localhost:8000" + "/api/feedback/create", {
                content: feedback,
                postId: postId,
                userId: user._id,
            })
            console.log(savedFeedback)
            // setFeedbacks(...feedbacks, savedFeedback)
            loadAllFeedbacks()
            setFeedback('')
        }
    }
    return (
        <div className="media mt-4">
            {/* <a className="pr-2" href="#"><img className="rounded-circle" alt="Bootstrap Media Another Preview" src="https://th.bing.com/th/id/OIP.FjSRywv2jSoO2kdlijRZ4gHaHa?pid=ImgDet&rs=1" /></a> */}
            <div className="media-body">
                <div className="border">
                    <div className="row1">                        
                        <h6 className="col-8 d-flex">
                            Username:
                            {" "}{user?.username}
                        </h6>    
                        <textarea style={{ marginTop: '1.5%', marginBottom: '1%' }}
                        type="text"
                        className="form-control"
                        placeholder="Write a public comment..."
                        aria-describedby="basic-addon1"
                        onChange={handleFeedback}
                        value={feedback} />                    
                    </div>
                    
                    <div className='left' style={{ width: '100%' }}></div>
                    <Row>
                        <Col className='text-left' xs={5}>
                            <button className="btn"><i className="fa fa-smile-o"></i></button>
                            <button className="btn"><i className="fa fa-camera"></i></button>
                            <button className="btn"><i className="fa fa-folder"></i></button>
                        </Col>
                        <Col className='text-right' xs={7}>
                            <button onClick={handlePost} style={{ marginTop: '1%', marginLeft: '2%' }} type="button" className="btn btn-sm btn-success">Post</button>
                            <button onClick={() => handleResetFeedback()} style={{ marginTop: '1%', marginLeft: '2%' }} type="button" className="btn btn-sm btn-danger">Reset</button>
                            {/* {handleCancelComment && <button onClick={handleCancelComment} style={{ marginTop: '1%', marginLeft: '2%' }} type="button" className="btn btn-sm btn-secondary">Cancel</button>} */}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}
function FeedbackOnPost(props) {
    const { username, date, content } = props
    { console.log(username) }
    return (
        <div className="media mt-4">
            {/* <a className="pr-2" href="#"><img className="rounded-circle" alt="Bootstrap Media Another Preview" src={person} /></a> */}
            <div className="media-body">
                <div className="border">
                    <div className="row1">
                        <div className="col-8 d-flex">
                            <h6>
                                {username}
                            </h6>
                            <span>&emsp; {date}</span>
                        </div>
                    </div>
                    <div className='feedback'>
                    {content}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
export default Detail;