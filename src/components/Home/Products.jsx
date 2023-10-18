import React from 'react'
import Box from '../../Box'
import { products } from '../../data/data'
import { NavLink } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Products = () => {
  // const navigate = useNavigate();
  // const handleProductList = (title) => {
  //   navigate(`/productList/${title}`)
  // }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };
  return (
    <Box>
      
        <Carousel responsive={responsive}>
        {products.map((item)=>{
            return(
              <NavLink to={`/productList/${item.title}`} key={item.id}>
                <div  className='product-container' >
                    <img src={item.url} alt='product'/>
                </div>
                </NavLink>
            )
        })}
        </Carousel>
     
      
    </Box>
  )
}

export default Products
