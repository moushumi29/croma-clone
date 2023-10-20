import React from 'react'
import { NavLink } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { formatIndianRupee } from './RandomStars';

const Cards = ({product}) => {
    const {_id, displayImage, name, price } = product;
    const productName = name;
    // const ratingStar = Array.from({ length: 5 }, (elem, index)=>{
    //   let num = index;

    //   return (
    //     <span key={index}>
    //       {stars >= index+1 ? <AiFillStar/> : <AiOutlineStar}
    //     </span>
    //   )
    // })
  return (
    <NavLink to = {`/singlePage/${_id}`} style={{textDecoration:"none"}}>
    <div className='product-card'>
       {/* <div className='heart'><FiHeart /></div> */}
      <img src={displayImage} alt='product' />
      <div className='product-name'>{productName.length > 50 ? `${productName.slice(0, 45)}...`: productName}</div>
      <div className='product-price'>&#8377; {formatIndianRupee(price)}</div>
      <div className='rating'>
        <AiFillStar/>
        <AiFillStar/>
        <AiFillStar/>
        <AiFillStar/>
        <AiFillStar/>
      </div>
    </div>
    </NavLink>
  )
}

export default Cards
