import React from 'react'
import { useNavigate } from 'react-router-dom'

const MyRewardPage = () => {
    const navigate = useNavigate();
    return (
        <div className='empty-cart'>
            <div style={{fontSize:"28px", textAlign:"center", marginBottom:"40px", fontWeight:"600"}}>My Reward</div>
            <img src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:No_image.png/Croma%20Assets/UI%20Assets/sshz69afrixwivcsgnpx.svg' alt="empty-cart" />
            <div style={{ fontSize: "18px", fontWeight: "700", margin: "20px", textAlign: "center" }}>
                <div>Oops! Your have not earned any reward</div>
                <div style={{ fontSize: "15px", color: "gray", textAlign: "center", padding: "10px 0px" }}>
                    <div>Coming Soon with Reward Features &</div>
                    <div>share with your friends and loved ones!</div>
                </div>
            </div>
            <button className='filled-btn' onClick={() => navigate('/')}>CONTINUE SHOPPING</button>
        </div>
    )
}

export default MyRewardPage
