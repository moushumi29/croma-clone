import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '../../Box';

const BuyNow = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const ProjectId = 'j7qoo6mywx67';
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

    const buyNow = async() => {
        const authToken = sessionStorage.getItem('authToken');
        const body = {
            productId : `${_id}`,
            quantity : 1,
            addressType : "HOME",
            address: {
             ...addressInfo
            }
        }
        try{
            const res = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/order',{
                method: "POST",
                body: JSON.stringify(body),
                headers:{
                    projectId: ProjectId,
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                },
                
                
            })
            const result = await res.json();
            console.log(result)
            if(result.status === "success"){
                toast.success("Order Placed", {
                    theme: "dark",
                })
            }else{
                toast.error("Something went wrong", {
                    theme:"dark",
                })
            }
        }catch(err){
            console.log(err);
        }
    }
    const validateForm = () => {
        const newErrors = {};

        if (!cardNumber.match(/^\d{16}$/)) {
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
        if (name === 'cardNumber') {
            setCardNumber(value);
        } else if (name === 'expiryDate') {
            setExpiryDate(value);
        } else if (name === 'cvv') {
            setCvv(value);
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
    }

    const handleBuyNow = (e) => {
        e.preventDefault();
        if(validateForm()){
            buyNow();
            navigate('/thankyouPage');
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
                    <input id='street' type='' placeholder='Enter your street' name='street' onChange={handleOnChange} className='input-checkout'/>
                    <br />
                    <label htmlFor='city' className='label-checkout'>City: </label>
                    <input id='city' type='' placeholder='Enter your city' name='city' onChange={handleOnChange} className='input-checkout'/>
                    <br />
                    <label htmlFor='state' className='label-checkout'>State: </label>
                    <input id='state' type='' placeholder='Enter your state' name='state' onChange={handleOnChange} className='input-checkout'/>
                    <br />
                    <label htmlFor='country' className='label-checkout'>Country: </label>
                    <input id='country' type='' placeholder='Enter your country' name='country' onChange={handleOnChange} className='input-checkout'/>
                    <br />
                    <label htmlFor='zipCode' className='label-checkout'>Zipcode: </label>
                    <input id='zipCode' type='' placeholder='Enter your Zipcode' name='zipCode' onChange={handleOnChange} className='input-checkout'/>
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
                        />
                        {errors.expiryDate && <div className="error">{errors.expiryDate}</div>}
                    </div>
                    <div>
                        <label htmlFor="cvv" className='label-checkout'>CVV:</label>
                        <input type="text" id="cvv" placeholder="000" name="cvv" value={cvv} onChange={handleInputChange} className='input-checkout' />
                        {errors.cvv && <div className="error">{errors.cvv}</div>}
                    </div>
                    <button className='checkout-btn' type="submit" onClick={handleBuyNow}>Pay Now</button>
                </form>
            </div>
            <div>
            {/* <div className='total-price' style={{backgroundColor:"#1d1d1d", color:"white"}}>
                <h3 style={{ marginBottom: "10px" }}>Order Summary</h3>
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
            </div> */}
            </div>
        </div>
    </Box>
</div>
  )
}

export default BuyNow
