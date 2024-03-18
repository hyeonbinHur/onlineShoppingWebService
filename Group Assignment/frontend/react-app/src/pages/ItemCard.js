import React from "react";
import { FaHeart } from "react-icons/fa";

function ItemCard({ id, title, status, size, price, img, likes }) {



    const goItemdetail = (event) => {
        event.preventDefault();
        const url = `/ItemDetail?id=${id}`;
        window.location.href = url;
    };

   

    return (
        <div className="col-lg-3 col-md-6 col-sm-4">
            <div id="cards" className="card">
                <img src={img} alt="" className="card-img-top" />
                <hr />
                <div className="card-body">
                    <div className="card_title">
                        <h4 className="card-title">{title}</h4>
                    </div>

                    <hr />
                    <div className="cardBodyContainer">
                        <label className="main_card_label"> Price :&nbsp; </label>
                        <p className="card_p">{price}</p><span>$</span>
                    </div>
                    <div className="cardBodyContainer">
                        <label className="main_card_label"> Condition : &nbsp;</label>
                        <p className="card_p">{status}</p>
                    </div>
                    <div className="cardBodyContainer">
                        <label className="main_card_label"> Size : &nbsp;</label>
                        <p className="card_p">{size}</p>
                    </div>
                    <div className="cardBodyContainer">
                        {/* <button className="like-button"><FaHeart id= "like-icon"></FaHeart> &nbsp;</button> */}
                        {likes} {" "} Likes
                        <p className="MainLike">{ }</p>
                    </div>
                    <div className="cardBodyContainer">
                        <button onClick={goItemdetail} className="GotoDetail">More Detail</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
