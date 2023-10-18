import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Box from '../../Box';
import FilterProductCard from '../helper/FilterProductCard';

const SubCategory = () => {
    const [products, setProducts] = useState([]);
  const ProjectId = 'j7qoo6mywx67';
  const { title } = useParams();

    const fetchProductList = async (title) => {
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
        fetchProductList(title);
      }, [title])
  return (
    <div>
      <Box>
        <h2 style={{margin:"20px 0px", textTransform:"capitalize"}}>{title=== 'tv' ? "Television" : title}</h2>
       <div className='subcategory-page'>
       {products.map((product, i)=>{
            return <FilterProductCard key={i} product={product} />
        })}
       </div>
      </Box>
    </div>
  )
}

export default SubCategory
