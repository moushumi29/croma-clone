import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Box from '../../Box';
import { LogedInUser } from '../../App';
import { formatIndianRupee } from '../helper/RandomStars';
import { useNavigate } from 'react-router-dom';

const CheckOutPage = () => {
    document.body.style.backgroundColor = "#191919";
    document.body.style.color = "white";
    const navigate = useNavigate();
    const { setCartValue } = useContext(LogedInUser);
    const ProjectId = 'j7qoo6mywx67';
    const [checkOutData, setCheckOutDtaa] = useState([]);
    const [totalPrice, setTotalAmount] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [addressInfo, setAddressInfo] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo({ ...addressInfo, [name]: value })
        console.log(addressInfo);
    }


    const fetchCartItems = async () => {
        const authToken = sessionStorage.getItem('authToken');
        try {
            const res = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart`, {
                method: "GET",
                headers: {
                    projectId: ProjectId,
                    Authorization: `Bearer ${authToken}`,
                }
            })
            const result = await res.json();
            setCheckOutDtaa(result.data.items)
            setTotalAmount(result.data.totalPrice)
            console.log(result.data.items)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        fetchCartItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteCart = async () => {
        const authToken = sessionStorage.getItem('authToken');
        try {
            const res = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/cart/', {
                method: "DELETE",
                headers: {
                    projectId: { ProjectId },
                    Authorization: `Bearer ${authToken}`
                },
            })
            const result = await res.json();
            setCartValue(0);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }

    const buyNow = async (_id) => {
        const authToken = sessionStorage.getItem('authToken');
        const body = {
            productId: `${_id}`,
            quantity: 1,
            addressType: "HOME",
            address: {
                ...addressInfo
            }
        }
        console.log(body)
        try {
            const res = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/order', {
                method: "POST",
                headers: {
                    projectId: ProjectId,
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)

            })
            const result = await res.json();
            if (result.status === "success") {
                toast.success("Order Placed", {
                    theme: "dark",
                })
            } else {
                toast.error("Something went wrong", {
                    theme: "dark",
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!cardNumber.match(/^\d{4} \d{4} \d{4} \d{4}$/)) {
            newErrors.cardNumber = 'Enter a valid 16-digit card number.';
        }

        if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
            newErrors.expiryDate = 'Enter a valid expiry date in MM/YY format.';
        }

        if (!cvv.match(/^\d{3}$/)) {
            newErrors.cvv = 'Enter a valid 3-digit CVV.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const numericValue = value.replace(/\D/g, '');
        let formattedValue = ''

        if (name === 'cardNumber') {
            for (let i = 0; i < numericValue.length; i += 4) {
                formattedValue += numericValue.slice(i, i + 4) + ' ';
                
              }
              // Remove the extra space at the end
         
                formattedValue = formattedValue.trim();
            
              
              
            setCardNumber(formattedValue);
            console.log(formattedValue);
              
        } else if (name === 'expiryDate') {
            setExpiryDate(value);
        } else if (name === 'cvv') {
            setCvv(numericValue);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorValues = Object.values(addressInfo);
        const isEmptyVal = errorValues.some((el) => el === '');
        if(isEmptyVal){
          setError("All Fields must be filled");
        }else{
            toast.success("Address Saved",{
                theme:"dark"
            })
        }
        return error.length === 0;
    }
        

    const handleBuyNow = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Perform form submission logic here
            checkOutData.forEach((item) => {
                const { _id } = item.product;
                console.log(_id)
                buyNow(_id)
            })
            deleteCart();
            console.log('Form submitted successfully');
            navigate('/thankyouPage')
        }
        
    }
    return (
        <div>
            <Box>
                <div className='checkout-page'>
                    <div>
                        <h2>Enter your address</h2>

                        <form>
                            <label htmlFor='street' className='label-checkout'>Street: </label>
                            <input id='street' type='text' placeholder='Enter your street' name='street' onChange={handleOnChange} className='input-checkout'/>
                            <br />
                            <label htmlFor='city' className='label-checkout'>City: </label>
                            <input id='city' type='text' placeholder='Enter your city' name='city' onChange={handleOnChange} className='input-checkout'/>
                            <br />
                            <label htmlFor='state' className='label-checkout'>State: </label>
                            <input id='state' type='text' placeholder='Enter your state' name='state' onChange={handleOnChange} className='input-checkout'/>
                            <br />
                            <label htmlFor='country' className='label-checkout'>Country: </label>
                            <input id='country' type='text' placeholder='Enter your country' name='country' onChange={handleOnChange} className='input-checkout'/>
                            <br />
                            <label htmlFor='zipCode' className='label-checkout'>Zipcode: </label>
                            <input id='zipCode' type='text' placeholder='Enter your Zipcode' name='zipCode' onChange={handleOnChange} className='input-checkout'/>
                            <br />
                            {error && <div className='error'>{error}</div>}
                            <button className='checkout-btn' onClick={handleSubmit}>Save Address</button>
                        </form>
                    </div>
                    <div>
                        <h2>Enter Credit Card Details</h2>
                        {/* <img src={credit} alt='credit' className='credit-card' /> */}
                        <form>
                            <div>
                                <label htmlFor="cardNumber" className='label-checkout'>Card Number:</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={cardNumber}
                                    placeholder='0000-0000-0000-0000'
                                    onChange={handleInputChange}
                                    className='input-checkout'
                                    maxLength={19}
                                />
                                {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
                            </div>
                            <div>
                                <label htmlFor="expiryDate" className='label-checkout'>Expiry Date (MM/YY):</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    placeholder='mm/yy'
                                    value={expiryDate}
                                    onChange={handleInputChange}
                                    className='input-checkout'
                                    maxLength={5}
                                />
                                {errors.expiryDate && <div className="error">{errors.expiryDate}</div>}
                            </div>
                            <div>
                                <label htmlFor="cvv" className='label-checkout'>CVV:</label>
                                <input type="text" id="cvv" placeholder="000" name="cvv" value={cvv} onChange={handleInputChange} className='input-checkout' maxLength={3}/>
                                {errors.cvv && <div className="error">{errors.cvv}</div>}
                            </div>
                            <button className='checkout-btn' type="submit" onClick={handleBuyNow}>Pay Now</button>
                        </form>
                    </div>
                    <div>
                    <div className='total-price' style={{backgroundColor:"#1d1d1d", color:"white"}}>
                        <h3 style={{ marginBottom: "10px" }}>Order Summary ( {checkOutData.length} items)</h3>
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
                    </div>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default CheckOutPage
