import React from 'react'
import { formatIndianRupee } from './RandomStars'
import { AiFillStar } from 'react-icons/ai'

const OrderCard = ({ order }) => {
    const { displayImage, name, price } = order.order.items[0].product
    const timestamp = order.createdAt;
    const date = new Date(timestamp);
  
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  return (
    <div className='order-wrapper'>
      <div>
        <img src={displayImage} alt={name} className='order-image'/>
      </div>
      <div>
        <div style={{fontSize:"18px", fontWeight:"600", marginBottom:"0px"}}>{name}</div>
        <div className='rating-cart'>
        <AiFillStar/>
        <AiFillStar/>
        <AiFillStar/>
        <AiFillStar/>
        <AiFillStar style={{color:"gray"}}/>
        </div>
        <div className='date-delivery'>
            <div>Order Placed </div>
            <div style={{fontSize:"16px", color:"lightgray", fontWeight:"600"}}>on {formattedDate}</div>
        </div>
        <div className='price-cart'>&#x20B9; {formatIndianRupee(price)}</div>
        <div style={{fontSize:"14px", paddingBottom:"6px", borderBottom:"1px solid gray"}}>(Incl.all Taxes)</div>
        <div style={{margin:"6px 0px"}}>
        <del>
            MRP &#x20B9; {formatIndianRupee(price+3000)}
        </del>
        <div style={{fontSize:"12px", color:"gray"}}>(Save &#x20B9; 3,000.00)</div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
