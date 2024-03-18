import React from "react";

const GoBack = (event) => {
    event.preventDefault();
    document.location.href = '/Main';
};

function CheckoutConfirm() {
    return (
        <div className="Thankyoucontainer">
            Thank you! 
            <br/>
            <button className="Thankyou" onClick={GoBack}>Main</button>
        </div>
    );
}

export default CheckoutConfirm;
