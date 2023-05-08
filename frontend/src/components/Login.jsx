import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { loginUser } from '../services/authServices';


function Login() {

  const history = useNavigate();

  const [account, setAccount] = useState({
      email: "",
      password: ""
  });
  const [open, setOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("in here");
    loginUser(account).then(() => {
      console.log("in here");
        // Update the route
        history("/adminDash");
    }).catch((err) => console.log(err));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setAccount((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  useEffect(() => { document.body.style.backgroundColor = '#66c1db' }, [])

    // Login screen HTML
    return(
      
      <div style={{height:'100%'}} className="" id="loginScreen">
        <div className="container text-center">
          
        </div>
 
        {/* <form id="loginForm" className='text-center' onSubmit={handleSubmit}> */}
        <div id="loginForm" className='form-container text-center' style={{ height:'100%', opacity:'90%'}}>
          <div style={{paddingBottom: "0.5%"}}>
            <TextField 
                type="email"
                style={{width:'50%', background:'white', marginBottom:'20px'}}
                label="yourname@hhchealth.org"
                name="email"
                value={account.email}
                onChange={handleChange}
                required
          />
            
              
          </div>
          <div id="password" className="mb-3">
            <TextField
                style={{width:'50%', background:'white', marginBottom:'20px'}}
                label="Password"
                name="password"
                type="password"
                value={account.password}
                onChange={handleChange}
                required
              />
              
          </div>
          <div className="login-button" style={{paddingBottom: "0.3%"}}>
            <button type="submit" onClick={handleSubmit} className="btn btn-success" style={{width:'50%',fontFamily: 'Bitter', background:'#d2492a'}}>Login</button>
          </div>
          
          
          
      </div>
    </div>
  )
}

export default Login;