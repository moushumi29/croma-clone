import React from 'react'
import { NavLink } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from '../../Box';
import { brands } from '../../data/data';

const Brands = () => {
    
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
        <br/>
      <h1>Top Brands</h1>
      <br/>
    <Carousel responsive={responsive}>
    {brands.map((item, i)=>{
        return(
          <NavLink to={`/brandPage/${item.brand}`} key={i}>
            <div  className='product-container' >
                <img src={item.url} alt='product' style={{height:"120px"}}/>
            </div>
            </NavLink>
        )
    })}
    </Carousel>
 
  
</Box>
  )
}

export default Brands
