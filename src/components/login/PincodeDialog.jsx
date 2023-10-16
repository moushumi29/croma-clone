import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const PincodeDialog = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
      }

      const [pinCodeInfo, setPinCodeInfo] = useState({
        pincode: '',
        state: '',
      });
      const [error, setError] = useState('');

      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setPinCodeInfo({ ...pinCodeInfo, [name]: value })
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const errorValues = Object.values(pinCodeInfo);
        const isEmptyVal = errorValues.some((el) => el === '');
        const {pincode} = pinCodeInfo;
        if(isEmptyVal){
          setError("All Fields must be filled");
        }else if(pincode.length !== 6){
            setError("Pincode length must be 6")
        }else{
            sessionStorage.setItem('pincodeInfo', JSON.stringify(pinCodeInfo));
            toast.success("Info changed successfully", {
                theme: "dark",
            })
            handleClose();
        }
      }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
      <div className='login-container' style={{padding:"50px"}}>
         <div style={{fontSize:"20px"}}>SELECT YOUR LOCATION</div>
         <div style={{fontSize:"16px", marginTop:"10px"}}>To Check Products & Delivery Options available at your location</div>
         <form>
         <input type='text' name='pincode' placeholder='Enter Pincode' className='input-field' onChange={handleOnChange}/>
         <br/>
         <input type='text' name='state' placeholder='Enter your state' className='input-field' onChange={handleOnChange}/>
         <br/>
         {error && <p style={{color:"red", fontSize:"14px"}}>{error}</p>}
         <button className='btn-login' onClick={handleSubmit}>Continue</button>
         </form>
        </div>
      </Dialog>
    </div>
  )
}

export default PincodeDialog
