import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import Box from "../../Box"
import ImageSlide from '../helper/ImageSlide'
import HandleResponse from '../helper/HandleResponse'
import { getRandomDecimal } from '../helper/RandomStars'
import { toast } from 'react-toastify'
import { LogedInUser } from '../../App'

const SinglePage = () => {
  const navigate = useNavigate();
  document.body.style.backgroundColor = "#191919";
  document.body.style.color = "white";
  const { logedIn, setLogedIn,setCartValue } = useContext(LogedInUser);
  if(sessionStorage.getItem('userInfo')){
    setLogedIn(true);
  }
  const { _id } = useParams();
  const ProjectId = 'j7qoo6mywx67';
  const [singleProduct, setSingleProduct] = useState({});

  const fetchSingLeProduct = async () => {
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${_id}`,
        {
          headers: {
            projectId: { ProjectId }
          },
        })
      const data = await res.json()
      setSingleProduct(data.data)
      console.log(data.data)
    } catch (err) {
      console.log(err);
    }
  }

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
      // console.log(result);
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

  useEffect(() => {
    fetchSingLeProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCartAddition = () => {
    if(!logedIn){
      toast.error("Log In first",{
        theme: "dark",
      })
    }else{
      addToCart();
    }
  }

  const { name, price, features, images, description, brand, sellerTag, displayImage, } = singleProduct
  const stars = getRandomDecimal(); 
  return (
    <>
      <Box>
        <div className="single-product-page">
          <div className='image-section'>
            <ImageSlide img={images} mainImage={displayImage} _id={_id} />
          </div>
          <div className='product-detail-section'>
            <h3>{name}</h3>
            <div className='button-type'>
              <p>{brand}</p>
              <p>{sellerTag}</p>
            </div>
            <div className='rating'>{stars} <AiFillStar /></div>
            <p className='offer-price'>&#8377; {price}</p>
            <p style={{ fontSize: "12px", borderBottom: "1px solid gray", paddingBottom: "4px" }}>(Inc. all Taxes)</p>
            <p className='mrp'>MRP: <span></span>
              <del className='real-price'>
                &#8377; {price + 3000}</del>
              <span> (Save &#8377; 3,000)</span>
            </p>
            <div className='features'>
              <p>Key Features</p>
              <ul className='feature-list'>
                {features && features.map((feature, i) => {
                  return (<li key={i}>{feature}</li>)
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className='description'>
          <h3>Overview</h3>
          <HandleResponse htmlContent={description} />
        </div>

      </Box>

      <footer style={{backgroundColor:"#1d1d1d", padding:'10px 0px', position:"sticky", bottom:"0px", boxhadow: "0 -5px 5px rgba(0, 0, 0, 0.5)"}}>
        <Box>
          <div className='single-product-page-footer'>
            <div className='image-footer-section'>
              <img src={displayImage} alt='footer' className='footer-image' />
              <h5>{name}
              <div>&#8377; {price}</div>
              </h5>
            </div>
            <div className='footer-btn'>
              <button className='filled-btn' onClick={()=>navigate(`/buyNowPage/${_id}`)}>Buy Now</button>
              <button className='outline-btn' onClick={handleCartAddition}>Add to Cart</button>
            </div>
          </div>
        </Box>
      </footer>
    </>
  )
}

export default SinglePage
