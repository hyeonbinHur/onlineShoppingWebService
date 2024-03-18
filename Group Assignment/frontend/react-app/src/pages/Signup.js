import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

function SignUp() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [DOB, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [card1, setCard1] = useState('');
    const [card2, setCard2] = useState('');
    const [card3, setCard3] = useState('');
    const [card4, setCard4] = useState('');
    const [card, setCard] = useState('');

    const [nameValid, setnameValid] = useState(false);
    const [passwordValid, setpasswordValid] = useState(false);

    const [emailValid, setemailValid] = useState(false);


    const [usernameValid, setusernameValid] = useState(false);


    const [contactValid, setcontactValid] = useState(false);
    const [dobValid, setdobValid] = useState(false);

    const [okCard, setOkcard] = useState(false);
    const [validCard, setValidcard] = useState(false);

    const [userOverlapping, setuserOverlapping] = useState(false);



    const nameHandler = (event) => {
        setName(event.target.value);
        if (name.length > 3) {
            setnameValid(true);
        } else {
            setnameValid(false);
        }
    };

    const passwordHadler = (event) => {
        setPassword(event.target.value);
        if (password.length > 5) {
            setpasswordValid(true);
        } else {
            setpasswordValid(false);
        }
    };

    const usernameHandler = (event) => {
        setUsername(event.target.value);
        if (username.length > 5) {
            setusernameValid(true);
        } else {
            setusernameValid(false);
        }
    };

    function okCardHandler() {
        const newCard = card1 + card2 + card3 + card4;
        setCard(newCard);
        if (newCard.length == 16) {
            setOkcard(true);
            Swal.fire({
                icon: "success",
                title: "You card is checked! ",
            })
        } else {
            setOkcard(false);
            Swal.fire({
                icon: "warning",
                title: "card number must be 16 length ",
            })
        }

    }
    function validCardHandler() {
        const newCard = card1 + card2 + card3 + card4;
        setCard(newCard);
        if (card.length == 16) {
            setValidcard(true);
            Swal.fire({
                icon: "success",
                title: "You card validated has beed checked! ",
            })
        } else {
            setValidcard(false);
            Swal.fire({
                icon: "warning",
                title: "You card is not valid",
            })
        }
    }



    const contactHandler = (event) => {
        setContactNumber(event.target.value);
        if (contactNumber.length > 7 && contactNumber.length < 13) {
            setcontactValid(true);
        } else {
            setcontactValid(false);
        }
    };
    const dobHandler = (event) => {
        setDOB(event.target.value);
        if (DOB.date !== null && DOB.month !== null && DOB.year < 2016) {
            setdobValid(true);
        } else {
            setdobValid(false);
        }
    };

    const emailHandler = (event) => {
        setEmail(event.target.value);
        if (email.indexOf('@') === -1) {
            setemailValid(false);
        } else {
            setemailValid(true);
        }
    };

    function cardFalse() {
        setOkcard(false);
        setValidcard(false);
    }


    const handleChange1 = (event) => {
        const { value: inputValue } = event.target;
        if (inputValue.length <= 4) {
            setCard1(inputValue);
            cardFalse();
        } else {
            cardFalse();
        }

    };
    const handleChange2 = (event) => {
        const { value: inputValue } = event.target;
        if (inputValue.length <= 4) {
            setCard2(inputValue);
            cardFalse();
        } else {
            cardFalse();
        }
    };

    const handleChange3 = (event) => {
        const { value: inputValue } = event.target;
        if (inputValue.length <= 4) {
            setCard3(inputValue);
            cardFalse();
        } else {
            cardFalse();
        }
    };

    const handleChange4 = (event) => {
        const { value: inputValue } = event.target;
        if (inputValue.length <= 4) {
            setCard4(inputValue);
            cardFalse();
        } else {
            cardFalse();
        }
    };

    const endPoint = "http://localhost:8000/api/auth/signup"
    const submitHandler = async (event) => {
        if (nameValid) {
            if (usernameValid) {
                if (emailValid) {
                    if (passwordValid) {
                        if (password == passwordCheck) {
                            if (contactValid) {
                                if (DOB) {
                                    const date = new Date(DOB);
                                    const year = date.getFullYear();
                                    if (year < 2016) {
                                        if (okCard) {
                                            if (validCard) {
                                                let credit_card_num = card1 + card2 + card3 + card4
                                                let registrant = {
                                                    name: name,
                                                    username: username,
                                                    email: email,
                                                    password: password,
                                                    phone_num: contactNumber,
                                                    gender: gender,
                                                    DoB: DOB,
                                                    credit_card_num: credit_card_num,
                                                    email: email
                                                }
                                                try{
                                                    await axios.post(endPoint, registrant)
                                                    event.preventDefault();
                                                    document.location.href = '/Login'
                                                }catch(error){
                                                    Swal.fire({
                                                        icon: "warning",
                                                        title: username + " Already exist",
                                                    })
                                                }
                                            } else {
                                                Swal.fire({
                                                    icon: "warning",
                                                    title: "You must check your card validation first",
                                                })
                                            }

                                        } else {
                                            Swal.fire({
                                                icon: "warning",
                                                title: "You must check your card first",
                                            })

                                        }


                                    } else {
                                        Swal.fire({
                                            icon: "warning",
                                            title: "You have to be older than 7 years old",
                                        })
                                    }


                                } else {
                                    Swal.fire({
                                        icon: "warning",
                                        title: "Check your date of birth",
                                    })
                                }


                            } else {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Check your CONTACT!!",
                                })
                            }
                        } else {
                            Swal.fire({
                                icon: "warning",
                                title: "your PASSWORD and PASSWORD CHECK are not EQUAL",
                            })
                        }


                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "Check your PASSWORD!!",
                        })
                    }


                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Check your EMAIL!!",
                    })
                }


            }
            else {
                Swal.fire({
                    icon: "warning",
                    title: "Check your ID!!",
                })
            }


        } else {

            Swal.fire({
                icon: "warning",
                title: "Check your NAME!!",
            })
        }

    };

    const cancelSignup = (event) => {
        event.preventDefault();
        document.location.href = '/Login'

    };
    // let age = 0;

    function Sigup() {
        return false;
    }

    return <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: '#32CD32' }}>
                {/* 이미지 넣기 */}
            </Avatar>
            <Typography className="signup-title" component="h1" variant="h5">
                Sign Up
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="Name"
                        label="Name (must be longer than 5 letters)"
                        name="Name"
                        autoComplete="Name"
                        value={name}
                        onChange={nameHandler}
                    />
                    <div className='Login_Error' >
                        {
                            !nameValid && name.length > 0 && (
                                <p>Please write correct name(longer than 5)</p>
                            )
                        }
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="Username"
                        label="Username (must be longer than 7 letters)"
                        name="Username"
                        autoComplete="Username"
                        value={username}
                        onChange={usernameHandler} />
                    <div className='Login_Error' >
                        {
                            !usernameValid && username.length > 0 && (
                                <p>Username have tobe longer than 7</p>
                            )
                        }
                    </div>

                </Grid>
            
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address (must contain @)"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={emailHandler}
                    />
                    <div className='Login_Error' >
                        {
                            !emailValid && email.length > 0 && (
                                <p>Write correct email form</p>

                            )
                        }
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password (must be longer than 7 characters)"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={passwordHadler} />
                    <div className='Login_Error' >
                        {
                            !passwordValid && password.length > 0 && (
                                <p>Password have to be longer than 7</p>

                            )
                        }
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="passwordCheck"
                        label="Password Check"
                        type="password"
                        id="passwordCheck"
                        value={passwordCheck}
                        onChange={(event) => setPasswordCheck(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="contact"
                        label="Contact Number (must be between 9 and 13 digit)"
                        type="number"
                        id="contact"
                        value={contactNumber}
                        onChange={contactHandler}
                    />
                    <div className='Login_Error' >
                        {
                            !contactValid && contactNumber.length > 0 && (
                                <p>Write correct phone number</p>

                            )
                        }
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="dob"
                        label="Date of Birth"
                        type="text"
                        id="dob"
                        className="dob"
                        value={DOB}
                        onChange={(event) => setDOB(event.target.value)}
                        onFocus={(e) => e.currentTarget.type = 'date'} />
                </Grid>
                <Grid item xs={12} sx={{ mb: 3 }}>
                    <select className="GenderSelector" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male" >Male</option>
                        <option value="female">Female</option>
                    </select>
                </Grid>
                <Grid item xs={12}>
                    Credit card (please enter a valid one)
                </Grid>
                <Grid id="adress" item xs={12}>
                    <Grid item xs={2} sm={3}>
                        <TextField
                            type="number"
                            name="cred1"
                            required
                            fullWidth
                            value={card1}
                            id="cred1"
                            placeholder="****"
                            inputProps={{ maxLength: 4 }}

                            onChange={handleChange1}
                        />
                    </Grid>
                    <Grid item xs={2} sm={3}>
                        <TextField
                            required
                            fullWidth
                            id="cred2"
                            name="cred2"
                            type="number"
                            value={card2}
                            placeholder="****"
                            inputProps={{ maxLength: 4 }}
                            style={{ marginLeft: '1rem' }}
                            onChange={handleChange2}
                        />
                    </Grid>
                    <Grid item xs={2} sm={3}>
                        <TextField
                            required
                            fullWidth
                            id="cred3"
                            placeholder="****"
                            name="cred3"
                            type="number"
                            value={card3}
                            inputProps={{ maxLength: 4 }}
                            style={{ marginLeft: '2rem' }}
                            onChange={handleChange3}
                        />
                    </Grid>
                    <Grid item xs={2} sm={3}>
                        <TextField
                            required
                            fullWidth
                            placeholder="****"
                            id="cred4"
                            name="cred4"
                            type="number"
                            value={card4}
                            inputProps={{ maxLength: 4 }}
                            style={{ marginLeft: '3rem' }}
                            onChange={handleChange4}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div>
                            {
                                !okCard && (
                                    <button 
                                        style={{ marginLeft: '4rem' }}
                                        onClick={okCardHandler}
                                        className="Ok">
                                        
                                        ok
                                    </button>
                                )
                            }
                        </div>

                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <div className="ValCon">
                        {
                            okCard && !validCard && (
                                <button
                                className="CardVal"
                                    onClick={validCardHandler}>
                                    Valid
                                </button>
                            )
                        }
                    </div>

                </Grid>


            </Grid>
            <Button
                onClick={submitHandler}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>

            <Button
                onClick={cancelSignup}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Go Back to Login page
            </Button>

        </Box>

    </Container>;

}
export default SignUp;
