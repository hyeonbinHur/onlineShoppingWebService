import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";

function Address(props) {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);


    const [address, setAddress] = useState(user.address);
    const [postalcode, setPostalCode] = useState('');
    const [creditCard, setCreditCard] = useState(user.credit_card_num);
    const [cvc, setCvc] = useState('');


    const [receiver, setReceiver] = useState(user.name);
    const [contact, setContact] = useState(user.phone_num);
    const [card, setCard] = useState(user.credit_card_num);

    const [cardok, setCardok] = useState(false);
    const [cardvalid, setCardValid] = useState(false);

    function handlePostalCodeChange(event) {
        setPostalCode(event.target.value);
        props.setPostalCode(event.target.value);
    }

    function handleCvc(event) {
        setCvc(event.target.value);
        props.setCvc(event.target.value);
    }

    function handleReceiver(event) {
        setReceiver(event.target.value);
        props.setReceiver(event.target.value);
    }

    function handleContact(event) {
        setContact(event.target.value);
        props.setContact(event.target.value);
    }

    function handleAddress(event) {
        setAddress(event.target.value);
        props.setAddress(event.target.value);
    }
    function OKcardCheck() {
        const newCard = card1 + card2 + card3 + card4;
        if (newCard.length == 16) {
            props.setCard(newCard);
            props.setCard(newCard);
            props.setCardok(true);
            setCardok(true);
            Swal.fire({
                icon: "success",
                title: "Your card has been checked!",
            })
        } else {
            props.setCard(newCard);
            props.setCard(newCard);
            props.setCardok(false);
            setCardok(false);
            Swal.fire({
                icon: "warning",
                title: "Your card number must be 16 length",
            })
        }
    }

    function ValidcardCheck() {
        const newCard = card1 + card2 + card3 + card4;
        props.setCard(newCard);
        setCard(newCard);
        if (card.length == 16) {
            props.setCardValid(true);
            setCardValid(true);
            Swal.fire({
                icon: "success",
                title: "Your card validation is checked!",
            })
        } else {
            props.setCardValid(false);
            setCardValid(false);
            Swal.fire({
                icon: "warning",
                title: "Your card validation is not valied!",
            })
        }
    }

    const handleCard = () => {
        const newCard = card1 + card2 + card3 + card4;
        if (card1.length >= 3 && card2.length >= 3 && card3.length >= 3 && card4.length >= 3) {
            props.setCard(newCard)
        } else {
            props.setCard(newCard)
        }
    };

    function splitCreditCardNumber(creditCard) {
        const chunks = [];
        for (let i = 0, j = creditCard.length; i < j; i += 4) {
            chunks.push(creditCard.substr(i, 4));
        }
        return chunks;
    }

    useEffect(() => {
        const chunks = splitCreditCardNumber(creditCard);
        setCard1(chunks[0] || '');
        setCard2(chunks[1] || '');
        setCard3(chunks[2] || '');
        setCard4(chunks[3] || '');
    }, [creditCard]);

    const [card1, setCard1] = useState('');
    const [card2, setCard2] = useState('');
    const [card3, setCard3] = useState('');
    const [card4, setCard4] = useState('');

    const handleChange1 = (event) => {
        const { value: inputValue } = event.target;
        if (inputValue.length <= 4) {
            setCard1(inputValue);
            handleCard();
            props.setCardok(false);
            setCardok(false);
            props.setCardValid(false);
            setCardValid(false);
        } else {
            handleCard();
            props.setCardok(false);
            setCardok(false);
            props.setCardValid(false);
            setCardValid(false);
        }

    };

    const handleChange2 = (event) => {
        const { value: inputValue } = event.target;
        if (inputValue.length <= 4) {
            setCard2(inputValue);
            handleCard();
            props.setCardok(false);
            setCardok(false);
            props.setCardValid(false);
            setCardValid(false);
        } else {
            handleCard();
            props.setCardok(false);
            setCardok(false);
            props.setCardValid(false);
            setCardValid(false);
        }

    };

    const handleChange3 = (event) => {
        const { value: inputValue } = event.target;
        if (inputValue.length <= 4) {
            setCard3(inputValue);
            handleCard();
            props.setCardok(false);
            setCardok(false);
            props.setCardValid(false);
            setCardValid(false);
        } else {
            handleCard();
            props.setCardok(false);
            setCardok(false);
            props.setCardValid(false);
            setCardValid(false);
        }

    };

    const handleChange4 = (event) => {
        const { value: inputValue } = event.target;
        if (inputValue.length <= 4) {
            setCard4(inputValue);
            handleCard();
            props.setCardok(false);
            setCardok(false);
            props.setCardValid(false);
            setCardValid(false);
        } else {
            handleCard();
            props.setCardok(false);
            setCardok(false);
            props.setCardValid(false);
            setCardValid(false);
        }


    };

    return (<React.Fragment>
        <Typography variant="h6" gutterBottom>
            Shipping address
        </Typography>
        <Grid id="adress" item xs={12}>
            <TextField
                required
                id="Name"
                name="Name"
                label="Receiver"
                autoComplete="Name"
                variant="standard"
                value={receiver}
                onChange={handleReceiver}
            />
        </Grid>
        <Grid id="adress" item xs={12}>
            <TextField
                required
                id="Contact"
                name="Contact"
                label="Contact"
                value={contact}
                autoComplete="Contact"
                variant="standard"
                type='number'
                onChange={handleContact}
            />
        </Grid>
        <Grid id="adress" item xs={12}>
            <TextField
                required
                id="address"
                name="address"
                label="Address"
                autoComplete="shipping address-line1"
                variant="standard"
                value={address}
                onChange={handleAddress}
            />
        </Grid>
        <Grid id="adress" item xs={12}>
            <TextField
                required
                id="PostalCode"
                name="PostalCode"
                label="Postal code"
                autoComplete="Postal code"
                variant="standard"
                type='number'
                value={postalcode}
                onChange={handlePostalCodeChange}
            />
        </Grid>

        <Grid id="adress" item xs={12}>
            <span
                required
                id="CreditCard"
                name="CreditCard"
            >Credit Card</span>
        </Grid>



        <Grid id="adress" item xs={12}>

            <Grid id='cred1' item xs={2}>
                <TextField
                    type="number"
                    name="cred1"
                    required
                    value={card1}
                    id="cred1"
                    inputProps={{ maxLength: 4 }}
                    onChange={handleChange1}></TextField>
            </Grid>
            <Grid id='cred2' item xs={2}>
                <TextField
                    required
                    id="cred2"
                    name="cred2"
                    type="number"
                    value={card2}
                    inputProps={{ maxLength: 4 }}
                    onChange={handleChange2}></TextField>
            </Grid>
            <Grid id='cred3' item xs={2}>
                <TextField
                    required
                    id="cred3"
                    name="cred3"
                    type="number"
                    value={card3}
                    inputProps={{ maxLength: 4 }}
                    onChange={handleChange3} ></TextField>
            </Grid>
            <Grid id='cred4' item xs={2}>
                <TextField
                    required
                    id="cred4"
                    name="cred4"
                    type="number"
                    value={card4}
                    inputProps={{ maxLength: 4 }}
                    onChange={handleChange4} ></TextField>
            </Grid>
            <Grid id='cred4' item xs={2}>
                {
                    !cardok && (
                        <button className='Ok2' onClick={OKcardCheck}>ok</button>
                    )
                }

            </Grid>
        </Grid>
        <Grid id="adress" item xs={12}>
            {
                !cardvalid && cardok && (
                    <button className='CardVal' onClick={ValidcardCheck}>Card Validation</button>
                )
            }

        </Grid>

        <Grid id="adress" item xs={12}>
            <TextField
                required
                id="CVC"
                name="CVC"
                label="CVC"
                type="number"
                autoComplete="CVC"
                variant="standard"
                value={cvc}
                onChange={handleCvc}
            />
        </Grid>
    </React.Fragment>);
}
export default Address;
