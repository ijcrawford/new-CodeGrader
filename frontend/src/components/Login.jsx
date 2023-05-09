import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import Card from 'react-bootstrap/Card';
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

    useEffect(() => { document.body.style.backgroundColor = '#528AAE' }, [])
    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = () => {
      setIsHover(true);
    };
    const handleMouseLeave = () => {
      setIsHover(false);
    };

    // Login screen HTML
    return(
      <div style={{height:'100%'}} className="" id="loginScreen">
        <div className="container text-center mb-6" style={{alignContent:'center', gravity:'center', paddingTop:'12%',width:'30%'}}>
        <h1 style={{padding:'5%'}}>Code Grader 2.0</h1>
        <Card variant="outlined" className='border border-4 rounded-2' style={{borderColor:'#F58216'}}>
        <div id="loginForm" className='form-container text-center' style={{ height:'100%', opacity:'100%'}}>
            <div style={{padding:'7%'}}>
              <TextField 
                  style={{width:'100%', background:'white'}}
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={account.email}
                  onChange={handleChange}
                  required
                />
            </div>
            <div id="password" className="mb-3" style={{paddingRight:'7%',paddingLeft:'7%'}}>
              <TextField
                  style={{width:'100%', background:'white'}}
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={account.password}
                  onChange={handleChange}
                  required
                />
            </div>
            <div className="login-button" style={{paddingBottom: "7%",paddingTop:'3%'}}>
              <button
                type="submit"
                className="btn btn-dark"
                style={{width:'60%',backgroundColor: isHover ? '#5AAB61' : 'grey'}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleSubmit}
                >Login</button>
            </div>
        </div>
        </Card>
        </div>
      </div>
  )
}

export default Login;