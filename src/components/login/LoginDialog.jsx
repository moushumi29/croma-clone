import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiShow, BiHide } from "react-icons/bi";


const LoginDialog = ({ open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
  }
  const [userInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    appType: "ecommerce"
  });
  const [showPassword, setShowPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [color, setColor] = useState('');

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...userInfo, [name]: value })
  }
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const fetchLogin = async (userInfo) => {
    const url = "https://academics.newtonschool.co/api/v1/user/login";
    const headers = {
      "projectId": "j7qoo6mywx67",
      "Content-Type": "application/json"
    };
    const body = userInfo;
    try {
      const res = await fetch(url, {

        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      const response = await res.json();
      // console.log("responseData", response);
      if (response.token) {
        toast.success(`Welcome ${(response.data.name).toUpperCase()}`,
      {
        theme: "dark",
      });
      handleClose();
        const accessToken = response.token;
        sessionStorage.setItem("authToken", accessToken);
        sessionStorage.setItem("userInfo", JSON.stringify(response.data));
      } else {
        toast.warning("Something went wrong",
      {
        theme: "dark",
      })
      }
    }
    catch (err) {
      
        console.error("Error:", err);
      
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorValues = Object.values(userInfo);
    const isEmptyVal = errorValues.some((el) => el === '');
    const {email, password} = userInfo;
    if(isEmptyVal){
      setError("All Fields must be filled");
      setColor('red')
    }else if(!email.includes('@gmail.com')){
      setEmailError("Email is invalid");
      setPasswordError('');
      setError("");
      setColor('red')
    }else if(password.length < 4){
      setError('');
      setEmailError('');
      setPasswordError("Password length must be greater than 4.");
      setColor('red');
    }
    else{
      setEmailError('');
      setPasswordError('');
      fetchLogin(userInfo)
    }
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div className='login-container'>
          <div className='header-login'>LOGIN</div>
          <form>
            <label style={{fontSize:"16px"}}>Please enter your Email ID and Password</label>
            <br />
            <input type='email' name='email' placeholder='Enter your Email Id' onChange={handleOnChange} className='input-field'/>
            <br />
            {emailError && <p style={{color: color, fontSize:"14px"}}>{emailError}</p>}
            <div style={{display:"flex", justifyContent:"space-between"}}>
            <input  type={showPassword ? "text" : "password"} name="password" placeholder='Enter your Password' onChange={handleOnChange} className='input-field'/>
            <span
              className="hide"
              style={{ cursor: "pointer"}}
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
            </div>
           
            {passwordError && <p style={{color: color, fontSize:"14px"}}>{passwordError}</p>}
                {error && <p style={{color: color, fontSize:"14px"}}>{error}</p>}
            <p onClick={handleClose} className='new-user'>New to Croma? <NavLink to='/signUpPage'>Create account</NavLink></p>
            <button onClick={handleSubmit} className='btn-login'>Log In</button>
          </form>
        </div>
      </Dialog>

    </div>
  )
}

export default LoginDialog
