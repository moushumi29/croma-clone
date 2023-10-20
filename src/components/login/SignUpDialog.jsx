import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpDialog = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    appType : "ecommerce",
  });

  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [color, setColor] = useState('');
    
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    // console.log(userInfo)
  }

  const fetchSignUpInfo = async(userInfo) => {
    const url = "https://academics.newtonschool.co/api/v1/user/signup";
    const headers = {
      "projectId": "j7qoo6mywx67",
      "Content-Type": "application/json"
    };
    const body = userInfo;
  try{
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
      
    })
    const data =await res.json();
    if(data.status === "fail"){
      toast.error('User already exist',
      {
        theme: "dark",
      });
    }else if(data.status === "success"){
      toast.success(`Welcome ${(data.data.user.name).toUpperCase()}`,
      {
        theme: "dark",
      });
      const accessToken = data.token;
      sessionStorage.setItem("authToken", accessToken);
      sessionStorage.setItem("userInfo", JSON.stringify(data.data.user))
      navigate("/");
    }else{
      toast.warning("Something went wrong",
      {
        theme: "dark",
      })
    }
    console.log(data);
  }catch(err){
    console.log(err);
  }
  }
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
      setError("");
      setPasswordError('');
      setColor('red')
    }else if(password.length < 4){
      setEmailError('');
      setError('');
      setPasswordError("Password length must be greater than 4.");
      setColor('red');
    }
    else{
      setEmailError('');
      setPasswordError('');
      fetchSignUpInfo(userInfo)
    }
  }
 
  return (
   
     
      <div className='signup-container'>
         <div style={{margin:"30px 0px", fontSize:"20px"}}>SIGN UP</div>
            <form>
                <div>Please enter your Username, Email ID and Password</div>
                <div className='input-div'>
                <input type='text' name='name' placeholder='Enter your name' onChange={handleOnChange} className='input-field' style={{backgroundColor:"#1d1d1d"}}/>
                </div>
                <div className='input-div'>
                <input type='email' name='email' placeholder='Enter your Email Id' onChange={handleOnChange} className='input-field' style={{backgroundColor:"#1d1d1d"}}/>
                </div>
                {emailError && <p style={{color: color, fontSize:"14px"}}>{emailError}</p>}
                <div className='input-div'>
                <input type='password' name="password" placeholder='Enter your Password' onChange={handleOnChange} className='input-field' style={{backgroundColor:"#1d1d1d"}}/>
                </div>
                {passwordError && <p style={{color: color, fontSize:"14px"}}>{passwordError}</p>}
                {error && <p style={{color: color, fontSize:"14px"}}>{error}</p>}
                <button onClick={handleSubmit} className='btn-login'>Sign Up</button>
            </form>
      </div>

  )
}

export default SignUpDialog
