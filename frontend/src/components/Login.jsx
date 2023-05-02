import React, { useState } from 'react'

//import TextField from "@mui/material/TextField";
import Button from 'react-bootstrap/Button';

import { useEffect } from 'react';


function Login() {

    //useEffect(() => { document.body.style.backgroundColor = '#66c1db' }, [])

    // Login screen HTML
    return(
      
      <div style={{height:'100%'}} className="" id="loginScreen">
        <div className="container text-center">
          
        </div>
 
        {/* <form id="loginForm" className='text-center' onSubmit={handleSubmit}> */}
        <div id="loginForm" className='form-container text-center' style={{ height:'100%', opacity:'90%'}}>
          <div style={{paddingBottom: "0.5%"}}>
            {/*

            <TextField 
                style={{width:'50%', background:'white'}}
                label="yourname@hhchealth.org"
                name="email"
              
              />
            */ }
              
          </div>
          <div id="password" className="mb-3">
            {/* 
            
            <TextField
                style={{width:'50%', background:'white'}}
                label="Password"
                name="password"
                type="password"
                
              />*/}
              
          </div>
          <div className="login-button" style={{paddingBottom: "0.3%"}}>
            <button type="submit" className="btn btn-success" style={{width:'50%',fontFamily: 'Bitter', background:'#d2492a'}}>Login</button>
          </div>
          
          
          
      </div>
    </div>
  )
}

export default Login;