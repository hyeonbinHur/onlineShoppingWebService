import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./footer";
import Step from '@mui/material/Step';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Buyiteminfo from './buyiteminfo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckoutConfirm from './checkoutconfirm';
import Address from './address';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from "sweetalert2";

function Checkout() {
  const data = localStorage.getItem('user');
  const user = JSON.parse(data);
  const steps = ['Item information', 'Shipping Address'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [posts, setPosts] = useState([]);
  const [postalCode, setPostalCode] = useState('');
  const [cvc, setCvc] = useState('');

  const [receiver, setReceiver] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [contact, setContact] = useState(user.phone_num);
  const [card, setCard] = useState(user.credit_card_num);

  const [cardOk, setCardok]=useState(false);
  const [cardValid, setCardValid]=useState(false);
  const theme = createTheme();
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (receiver.length > 3){
          if(contact.length > 8 && contact.length < 13){
            if(address.length>8){
              if (postalCode.length > 5) {
                if(cardOk){
                  console.log(card.length);
                  if(cardValid){
                    if(cvc.length == 3){
                      purchaseItem();
                      setActiveStep(activeStep + 1);
                    }else{
                      Swal.fire({
                        icon: "warning",
                        title: "cvc must be 3 numbers",
                      })
                    }
                  }else{
                    Swal.fire({
                      icon: "warning",
                      title: "check your card validation",
                    })
                  }
                }else{
                  console.log(card.length);
                  Swal.fire({
                    icon: "warning",
                    title: "check your card first",
                  })

                }
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "check the postal code  <br/>(longer than 6)",
                })
              }

            }else{
              Swal.fire({
                icon: "warning",
                title: "check the Receiver's address  <br/>(longer than 10 length)",
              })

            }
          }else{
            Swal.fire({
              icon: "warning",
              title: "check the Receiver's phone number  <br/>(longer than 10)",
            })

          }
      }else{
        console.log(receiver);
        Swal.fire({
          icon: "warning",
          title: "check the Receiver's name <br/>(longer than 3)",
        })
      }
     
    }else{
      setActiveStep(activeStep + 1);
    }
   
    
  };


  async function purchaseItem() {
  
 
    const newInfo = {
      bought_posts: [...user.bought_posts, posts._id]
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
        RefreshLocalStorage();
      } else {
        console.log("update error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  async function RefreshLocalStorage() {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/${user._id}`);

      if (response.status === 200) {
        console.log(response.data);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(response.data));

        const ItemSold = {
          boughtPerson: user._id,
          post_status: false
        };
        updateItem(itemId, ItemSold);
      } else {

      }
    } catch (error) {
      console.error(error);
    }
  }
  ///////////ERROR
  const updateItem = async (itemId, ItemSold) => {
    console.log("Start updating");
    try {
      const response = await axios.put(
        `http://localhost:8000/api/post/update/${itemId}`,
        ItemSold
      );
      if (response.status === 200) {
        console.log("update done");
      } else {
        console.log("update error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1);
    } else if (activeStep === 0) {
      document.location.href = '/Main'
    }
  };

  function getStepContent(step) {
  
    switch (step) {
      case 0:
        return <Buyiteminfo
          key={posts._id}
          id={posts._id}
          title={posts.title}
          status={posts.condition}
          size={posts.size}
          content={posts.content}
          price={posts.price}
          img={posts.img}
        />;
      case 1:
        return <Address 
        setPostalCode={setPostalCode} 
        setCvc={setCvc} 
        setReceiver={setReceiver} 
        setContact={setContact} 
        setAddress={setAddress} 
        setCard={setCard} 
        setCardok={setCardok} 
        setCardValid={setCardValid} 
        />;
      case 2: if (postalCode.length < 5) {
        return <Address 
        setPostalCode={setPostalCode} 
        setCvc={setCvc} 
        setReceiver={setReceiver} 
        setContact={setContact} 
        setAddress={setAddress} 
        setCard={setCard}
        setCardok={setCardok} 
        setCardValid={setCardValid}   />;
      } else {
        return <CheckoutConfirm />;
      }

      default:
        throw new Error('Unknown step');
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("id");
  const endPoint = "http://localhost:8000/api/post/getPost/" + itemId;

  async function LoadData() {
    try {
      const response = await axios.get(endPoint);
      if (response.status === 200) {
        if (response.data) {
          setPosts(response.data); //item data in posts
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
    LoadData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep < 3 && (
          <React.Fragment>
            {getStepContent(activeStep)}
          </React.Fragment>
        )}

        {(activeStep > 0 && activeStep < 2) && (
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
        )}

        {(activeStep > 0 && activeStep < 2) && (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 3, ml: 1 }}
          >
            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
          </Button>
        )}

        {activeStep === 0 && (
          <React.Fragment>
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
            </Button>
          </React.Fragment>
        )}

        {activeStep === 0 && <Footer />}
      </Container>
    </ThemeProvider>
  );
}

export default Checkout;
