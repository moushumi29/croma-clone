import React from 'react'
import Box from '../../Box'
import { BsBoxSeam } from "react-icons/bs"
import { IoRibbonOutline } from "react-icons/io5"
import { PiHeartStraight } from "react-icons/pi"
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
    document.body.style.backgroundColor = "#191919";
    document.body.style.color = "white";
    const navigate = useNavigate();

    return (
        <div>
            <Box>
                <div className='my-profile-page'>
                    <div className='my-profile-header'>My Account</div>
                    <div className='my-profile-wrapper'>
                        <div className='my-profile-card' onClick={()=>navigate('/myOrdersPage')}>
                            <div className='myProfile-icon'>
                                <BsBoxSeam />
                            </div>
                            <div>
                                <div className='myProfile-card-header'>My Orders</div>
                                <div className='myProfile-desc'>View, track, cancel orders and buy again</div>
                            </div>
                        </div>
                        <div className='my-profile-card' onClick={()=>navigate('/myRewardsPage')}>
                            <div className='myProfile-icon'>
                                <IoRibbonOutline />
                            </div>
                            <div>
                                <div className='myProfile-card-header'>My Rewards</div>
                                <div className='myProfile-desc'>Exclusive offers and loyalty rewards for you</div>
                            </div>
                        </div>
                        <div className='my-profile-card' onClick={()=>navigate('/myWishListPage')}>
                            <div className='myProfile-icon'>
                                <PiHeartStraight />
                            </div>
                            <div>
                                <div  className='myProfile-card-header'>My Wishlist</div>
                                <div className='myProfile-desc'>Have a look at your favourite products</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default MyProfile
