import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Box from '../../Box'
import Cards from '../helper/Cards';

const BrandPage = () => {
  document.body.style.backgroundColor = "#191919";
  document.body.style.color = "white";
    const [products, setProducts] = useState([]);
    const ProjectId = 'j7qoo6mywx67';
    const { brand } = useParams();

    const fetchProductList = async () => {
        try {
          const res = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=80&&brand=${brand}`, {
            method: 'GET',
            headers: {
              projectId: ProjectId
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
  return (
    <div style={{width:"100%"}}>
       <Box>
        <br/>
        <h1 style={{textAlign:"center"}}>Welcome to {brand} store</h1>
          <div className='product-page-wrapper'>
            {products.map((product, i) => {
              return <Cards key={i} product={product} />
            })}
          </div>
        </Box>
    </div>
  )
}

export default BrandPage
