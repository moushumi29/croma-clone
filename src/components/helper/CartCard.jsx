import React, { useContext } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { formatIndianRupee } from './RandomStars';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogedInUser } from '../../App';

const CartCard = ({cart, setCartData, setTotalPrice }) => {
  const { setCartValue } = useContext(LogedInUser); 
  const navigate = useNavigate();
  const ProjectId = 'j7qoo6mywx67';
    const { _id, name, price, displayImage } = cart.product;
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];
    const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 2);
  const formattedDate = `${twoDaysLater.getDate()} ${monthNames[twoDaysLater.getMonth()]} ${twoDaysLater.getFullYear()}`;


  const deleteAnItemFromCart = async() => {
    const authToken = sessionStorage.getItem('authToken');
    try{
        const res = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${_id}`, {
            method: "DELETE",
            headers: {
                projectId: ProjectId ,
                Authorization: `Bearer ${authToken}`
            },
        })
        const result = await res.json();
        setCartData(result.data.items)
        setTotalPrice(result.data.totalPrice)
        setCartValue((prev) =>{
          if(prev>1){
            return prev-1;
          }else{
            return 0;
          }
        })
    }catch(err){
        console.log(err);
    }
}
  const handleDelete = () => {
    deleteAnItemFromCart();
  }

  //move to wishList
  const moveItemToWishList = async() =>{
    const authToken = sessionStorage.getItem('authToken');
    const body = {
      "productId": `${_id}`
    }
    try{
      const res = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist', {
        method: "PATCH",
        headers: {
            projectId: ProjectId ,
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const result = await res.json();
      if(result.status === "success"){
        toast.success("Item added to Wishlist successfully", {
            theme: "dark",
        })
    }else if(result.status === "fail"){
      toast.warning("Item alredy in wishlist", {
        theme: "dark",
    })
    }
    else{
        toast.error("Something went wrong", {
            theme:"dark",
        })
    }
    }catch(err){
      console.log(err);
    }
  }
  const handleWishList = () => {
    moveItemToWishList();
    deleteAnItemFromCart();
  }
  const handleClick = () => {
    navigate(`/singlePage/${_id}`)
  }
  return (
    <div className='cart-card'>
      <div>
        <img src={displayImage} alt='cart-card' className='image-cart' onClick={handleClick}/>
      </div>
      <div className='name-section-cart'>
        <div onClick={handleClick}>{name}</div>
        <div className='rating-cart'>
        <AiFillStar/>
        <AiFillStar/>
        <AiFillStar/>
        <AiFillStar/>
        <AiFillStar style={{color:"gray"}}/>
        </div>
        <div className='date-delivery'>
            <div>Standard Delivery </div>
            <div>by {formattedDate}</div>
        </div>
        <button className='btn-cart' onClick={handleWishList}>Move to WishList</button>
        <button className='btn-cart' onClick={handleDelete}>Remove</button>
      </div>
      <div className='price-section-cart'>
        <div className='price-cart'>&#x20B9; {formatIndianRupee(price)}</div>
        <div style={{fontSize:"14px", paddingBottom:"6px", borderBottom:"1px solid black"}}>(Incl.all Taxes)</div>
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

export default CartCard
