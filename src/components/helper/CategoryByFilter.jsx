import React from 'react'
import { useFilterContext } from '../../context/filterContext';

const CategoryByFilter = () => {
    const { filters : {text, category} } = useFilterContext();
  return (
    <div>
      
    </div>
  )
}

export default CategoryByFilter
