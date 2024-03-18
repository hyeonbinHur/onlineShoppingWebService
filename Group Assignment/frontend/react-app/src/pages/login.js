// import logo from './logo.svg';
// import './login.css';
import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { alignProperty } from '@mui/material/styles/cssUtils';
import axios from 'axios';
import Swal from "sweetalert2";



function Login() {
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');
  const [idValid, setidValid] = useState(false);
  const [passwordValid, setpasswordValid] = useState(false);

  const endPoint = "http://localhost:8000/api/auth/login"
  const submitHandler = async (event) => {
    event.preventDefault();
    
    if (idValid && passwordValid) {
      try {
        const response = await axios.post(endPoint, {
          username: id,
          password: password,
        });
        console.log('Response:', response);
        if (response.status === 200) {
          const user = response.data;
          localStorage.setItem('user', JSON.stringify(user));
          document.location.href = '/Main';
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
    } else {
      Swal.fire({
        icon: "warning",
        title: "ID and Password should be loger than 7",
    })
    }
  };

  const idHandler = (event) => {
    setid(event.target.value);
    if (id.length > 5) {
      setidValid(true);
    } else {
      setidValid(false);
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

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          label="Username"
          required fullWidth
          name=
          "username"
          autoComplete="email"
          autoFocus
          margin="normal"
          value={id}
          onChange={idHandler} />
        <div className='Login_Error'>
          {
            !idValid && id.length > 0 && (
              <p>Please write correct id</p>
            )
          }
        </div>

        <TextField
          label="Password"
          type="password"
          required fullWidth
          margin="normal"
          value={password}
          onChange={passwordHadler}
        />
        <div className='Login_Error' >
        {
            !passwordValid && password.length > 0 && (
              <p>Please write correct password</p>
            )
          }
          </div>
        <Grid container>
          <Button
            onClick={submitHandler}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>Sign In
          </Button>
          <Link to="/SignUp" variant="body2">
            {"Sign Up"}
          </Link>
        </Grid>
      </Box>

    </Container>

  );
}

export default Login;
