import React, { useEffect, useState } from 'react'
import Box from '../../Box';
import CartCard from '../helper/CartCard';
import { formatIndianRupee } from '../helper/RandomStars';
import emptycart from "../../assests/emptyCart.webp"
import { NavLink, useNavigate } from 'react-router-dom';

const CartPage = () => {
    document.body.style.backgroundColor = "rgb(250, 244, 244)";
    document.body.style.color = "black";

    const navigate = useNavigate();

    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const ProjectId = 'j7qoo6mywx67';

    const fetchCartItems = async () => {
        const authToken = sessionStorage.getItem('authToken');
        try {
            const res = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart`, {
                method: "GET",
                headers: {
                    projectId: { ProjectId },
                    Authorization: `Bearer ${authToken}`
                }
            })
            const result = await res.json();
            setCartData(result.data.items)
            setTotalPrice(result.data.totalPrice)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCartItems();
    }, [])

    const handleCheckOut = () => {
        navigate('/checkOutPage')
    }
    return (
        <div className='cart-page'>
            <Box>
                <div className='heading-cart'>YOUR CART</div>
                {cartData.length > 0 ? (<div className='cart-wrapper'>
                    <div className='cart-items'>
                        {cartData.map((cart, i) => {
                            return <CartCard key={i} cart={cart} setCartData={setCartData} setTotalPrice={setTotalPrice} />
                        })
                        }
                    </div>
                    <div className='total-price'>
                        <h3 style={{ marginBottom: "10px" }}>Order Summary ( {cartData.length} items)</h3>
                        <div className='order-summary'>
                            <div>Original Price</div>
                            <div>&#8377; {formatIndianRupee(totalPrice)}.00</div>
                        </div>
                        <div className='order-summary'>
                            <div>Savings</div>
                            <div>-&#8377;  0.00 </div>
                        </div>
                        <div className='order-summary'>
                            <div>Delivery</div>
                            <div>Free</div>
                        </div>
                        <div className='order-summary'>
                            <div>Total</div>
                            <div>&#8377; {formatIndianRupee(totalPrice)}.00</div>
                        </div>
                        <button className='check-out' onClick={handleCheckOut}>Checkout</button>
                    </div>
                </div>) : (<div>
                    <div className='empty-cart'>
                        <img src={emptycart} alt="empty-cart" style={{width:"300px", height:"300px"}}/>
                        <div style={{ fontSize: "18px", fontWeight: "700", margin: "20px", textAlign: "center" }}>
                            <div>Oops! Your cart is empty</div>
                            <div style={{ fontSize: "15px", color: "gray", textAlign: "center", padding: "10px 0px" }}>
                            Add to cart from your wishlist or <NavLink to='/' style={{color:"#03b695"}}>Continue Shopping</NavLink>
                            </div>
                        </div>
                    </div>
                </div>)}
            </Box>
        </div>
    )
}

export default CartPage
