import React from 'react'
import { HiBadgeCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const ThankyouPage = () => {
    const navigate = useNavigate();
  return (
    <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", marginTop:"170px", gap:"10px"}}>
        <HiBadgeCheck color='#00e9bf' style={{fontSize:"28px"}}/>
        <div style={{fontSize:"20px", fontWeight:"600"}}>Your order has been place</div>
        <div style={{fontWeight:"600", color:"gray"}}>Thank you for Shopping</div>
        <br/>
        <div>
            <button onClick={()=> navigate('/')} style={{ fontSize: "15px", color: "black", fontWeight:"600",marginRight:"20px", padding: "10px 10px", border:"none", borderRadius:"7px", backgroundColor:"#00e9bf" }}>Go to Home</button>
            <button onClick={()=> navigate('/cartPage')} style={{ fontSize: "15px", color: "black", fontWeight:"600",marginRight:"20px", padding: "10px 10px", border:"none", borderRadius:"7px", backgroundColor:"#00e9bf" }}>Go to Cart</button>
        </div>
    </div>
  )
}

export default ThankyouPage
