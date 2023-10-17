import React, { useContext } from 'react'
import { formatIndianRupee } from './RandomStars';
import { AiFillStar } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { LogedInUser } from '../../App';

const WishListCard = ({ wishList, setWishListData }) => {
    const { setCartValue } = useContext(LogedInUser);
    const { displayImage, name, price, _id } = wishList.products;
    const ProjectId = 'j7qoo6mywx67';

    const deleteItemfronCart = async() => {
        const authToken = sessionStorage.getItem('authToken');
        try{
            const res = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${_id}`, {
                method: "DELETE",
                headers: {
                    projectId: ProjectId,
                    Authorization: `Bearer ${authToken}`
                }
            })
            const result = await res.json();
            if(result.status === "success"){
                setWishListData(result.data.items)
                toast.success("Item removed successfully", {
                    theme: "dark",
                })
            }
            console.log(result);
        }catch(err){
            console.log(err);
        }
    }
    const handleDeletClick = () => {
        deleteItemfronCart();
    }

    //Add to cart
    const addToCart = async() => {
        const authToken = sessionStorage.getItem('authToken');
        const body= {
          quantity : 1
        }
        try{
          const res = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${_id}`,{
            method: "PATCH",
            headers: {
              projectId: { ProjectId },
              Authorization : `Bearer ${authToken}`
            },
            body: JSON.stringify(body)
          })
          const result = await res.json()
          if(result.status === "success"){
          toast.success(`${result.message}`, {
            theme: "dark",
          })
          setCartValue((prev) => prev+1)
          console.log(result);
        }else{
          toast.warning("Item already in cart",{
            theme: "dark",
          })
        }
        }
        catch(err){
          console.log(err);
        }
      }
      const handleAddtoCart = () => {
        addToCart();
        deleteItemfronCart();
      }
    return (
        <div className='wishlist-wrapper'>
            <div>
                <img src={displayImage} alt={name} className='order-image' />
            </div>
            <div>
                <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
                  {name.length > 50 ? 
                <span>{name.slice(0, 50)}...</span> : 
                <span>{name}</span> } 
                </div>
                <div style={{marginBottom:"20px"}}>
                    <span className='price-cart'>&#x20B9; {formatIndianRupee(price)}</span>

                    <span  style={{color:"gray"}}>
                        <del>
                            MRP &#x20B9; {formatIndianRupee(price + 3000)}
                        </del>
                    </span>
                </div>
                <div className='rating-cart' style={{fontSize:"16px"}}>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar style={{ color: "gray" }} />
                </div>
            </div>
            <div  className='wishlist-buttons'>
                <button className='addToCart-btn' onClick={handleAddtoCart}>Add to Cart</button>
                <button className='deleteCart-btn' onClick={handleDeletClick}>Delete</button>
            </div>
        </div>
    )
}

export default WishListCard
