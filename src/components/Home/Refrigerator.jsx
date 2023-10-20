import React, { useEffect, useState } from 'react'
import Box from '../../Box'
import Cards from '../helper/Cards';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Refrigerator = () => {
    const [products, setProducts] = useState([]);
    const ProjectId = 'j7qoo6mywx67';

    const fetchProductList = async () => {
        try {
            const res = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&subCategory=refrigerator`, {
                method: 'GET',
                headers: {
                    projectId: { ProjectId }
                },
            })
            const data = await res.json();
            setProducts(data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProductList();
    }, [])
    
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
      }
    };

  return (
    <Box>
    <h2 className="trending-h2">Deals on Refrigerator</h2>
    
    <Carousel responsive={responsive}>
            {products.map((product, index) => {
                return <Cards key={index} product={product} />

            })}
        </Carousel>
</Box>
  )
}

export default Refrigerator
