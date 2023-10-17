import React, { useEffect, useState } from 'react'
import Box from '../../Box';
import { useNavigate } from 'react-router-dom';
import OrderCard from '../helper/OrderCard';

const MyOrdersPage = () => {
    document.body.style.backgroundColor = "#191919";
    document.body.style.color = "white";
    const navigate = useNavigate();
    const ProjectId = 'j7qoo6mywx67';
    const [orderHistory, setOrderHistory] = useState([]);
    const [numberOfOrders, setOrderNumbers] = useState(0);
    const fetchOrdersHistory = async() => {
        const authToken = sessionStorage.getItem('authToken');
        try{
            const res = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/order/', {
                method: "GET",
                headers: {
                    projectId: { ProjectId },
                    Authorization: `Bearer ${authToken}`
                }
            })
            const result = await res.json();
            if(result.status === "success"){
                setOrderHistory(result.data)
                setOrderNumbers(result.results)
            }
            console.log(result);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchOrdersHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
      <Box>
        <div className='order-page'>
            <div className='order-header-wrapper'>
            <div className='order-header'>My Orders</div>
            <div style={{fontSize:"18px"}}>Total Orders: {numberOfOrders}</div>
            </div>
            {numberOfOrders>0 ?
                orderHistory.map((order, index)=>{
                   return <OrderCard key={index} order={order}/>
                })
             :(<div className='empty-cart'>
                <img src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:No_image.png/Croma%20Assets/UI%20Assets/sshz69afrixwivcsgnpx.svg' alt="empty-cart"/>
                <div style={{fontSize:"18px", fontWeight:"600", margin:"20px"}}>No Order History Available</div>
                <button className='filled-btn' onClick={()=>navigate('/')}>CONTINUE SHOPPING</button>
            </div>)}
        </div>
      </Box>
    </div>
  )
}

export default MyOrdersPage
