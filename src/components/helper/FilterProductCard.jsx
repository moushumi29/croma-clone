import React from 'react'
import { formatIndianRupee, getRandomDecimal } from './RandomStars';
import { AiFillStar } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const FilterProductCard = ({ product }) => {
    const { name, brand, displayImage, price, sellerTag, _id } = product
    const stars = getRandomDecimal();
    return (
        <NavLink to={`/singlePage/${_id}`} style={{ textDecoration: "none", color: "white" }}>
            <div className='filter-card-wrapper'>
                <div className='card-description-wrapper'>
                    <div>
                        <img src={displayImage} alt='product-list' className='filter-product-image' />
                    </div>
                    <div className='description-section'>
                        <div style={{fontSize:"16px", marginBottom:"10px"}}>{name}</div>
                        <div className='button-type'>
                            <p>{brand}</p>
                            <p>{sellerTag}</p>
                        </div>
                        <div className='rating'>{stars} <AiFillStar /></div>
                        <p className='offer-price'>&#8377; {formatIndianRupee(price)}</p>
                        <p style={{ fontSize: "12px", paddingBottom: "4px" }}>(Inc. all Taxes)</p>
                        <p className='mrp'>MRP: <span></span>
                            <del className='real-price'>
                                &#8377; {formatIndianRupee(price + 3999)}</del>
                            <span> (Save &#8377; 3,999)</span>
                        </p>
                        <div className='location'>
                        <MdLocationOn style={{fontSize:"20px"}}/>
                        <p style={{fontSize:"12px"}}>Delivery At: <span style={{color:"#00e9bf", textDecoration:"underline"}}>Mumbai, 400049</span></p>
                        </div>
                    </div>
                </div>
                <div className='filter-card-heart'><FiHeart /></div>
            </div>
        </NavLink>
    )
}

export default FilterProductCard
