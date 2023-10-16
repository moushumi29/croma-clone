import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '../../Box';
import WishListCard from '../helper/WishListCard';

const MyWishLIstPage = () => {
    const navigate = useNavigate();
    const ProjectId = 'j7qoo6mywx67';
    const [wishListData, setWishListData] = useState([]);

    const fetchWishList = async() => {
        const authToken = sessionStorage.getItem('authToken');
        try{
            const res = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist', {
                method: "GET",
                headers: {
                    projectId: { ProjectId },
                    Authorization: `Bearer ${authToken}`
                }
            })
            const result = await res.json();
            if(result.status === "success"){
                setWishListData(result.data.items)
            }
            console.log(result.data.items);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchWishList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 

    return (
        <Box>
            <div className='order-page'>
                <div className='order-header'>My Wishlist</div>
                {wishListData.length >0 ? 
                wishListData.map((wishList, index)=>{
                    return <WishListCard key={index} wishList={wishList} setWishListData={setWishListData}/>
                }) 
                : (<div className='empty-cart'>
                    <img src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:No_image.png/Croma%20Assets/UI%20Assets/sshz69afrixwivcsgnpx.svg' alt="empty-cart" />
                    <div style={{ fontSize: "18px", fontWeight: "700", margin: "20px", textAlign: "center" }}>
                        <div>Oops! Your wishlist looks empty</div>
                        <div style={{ fontSize: "15px", color: "gray", textAlign: "center", padding: "10px 0px" }}>
                            <div>Create your own wishlist with your favourites &</div>
                            <div>share with your friends and loved ones!</div>
                        </div>
                    </div>
                    <button className='filled-btn' onClick={() => navigate('/')}>CONTINUE SHOPPING</button>
                </div>)}
            </div>
        </Box>
    )
}

export default MyWishLIstPage
