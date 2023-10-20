import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Box from '../../Box'
import banner from "../../assests/products-banner.jpg"
import Cards from '../helper/Cards';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const ProjectId = 'j7qoo6mywx67';
  const { title } = useParams();

  const fetchProductList = async () => {
    try {
      const res = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=80&&subCategory=${title}`, {
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
    <>
      <div className='product-page-container'>
        <div className='header-product-page'>{title==='tv' ? "television" : title}</div>
        <div>
        <img src={banner} alt={title} className='product-banner'/>
        </div>
        <Box>
          <div className='product-page-wrapper'>
            {products.map((product, i) => {
              return <Cards key={i} product={product} />
            })}
          </div>
        </Box>
      </div>
    </>
  )
}

export default ProductPage
