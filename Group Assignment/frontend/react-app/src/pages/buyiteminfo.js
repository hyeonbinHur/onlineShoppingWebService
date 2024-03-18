import { useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function Buyiteminfo({title,condition,size,content,img,price}) {
  console.log(content);

  const [index] = useState(0);
  return <div>
   
      <div id="itemDetailContainer" className="row">
        <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <img id="itemPicture" src={img} alt="product" />
          <h5 className="itemTitle">{title}</h5>
          <p className="itemPrice">{price}$</p>
          <p> {size}</p>
          <p> {condition}</p>
          <p className="itemDescription">{content}</p>
        </div>
      </div>


  </div>;
}
export default Buyiteminfo;
