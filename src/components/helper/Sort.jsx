import React from 'react'
import { useFilterContext } from '../../context/filterContext'

const Sort = () => {
    const { sorting} = useFilterContext();
  return (
    <div>
      <form action='#'>
        <label htmlFor='sort'><h5>SORT BY</h5></label>
        <br/>
        <select id='sort' name='sort' className='select-value' onClick={sorting}>
            <option value="#" disabled ></option>
            <option value="lowest" className='option-value'>Price low to high</option>
            <option value="#" disabled ></option>
            <option value="highest" className='option-value'>Price high to low</option>
            <option value="#" disabled ></option>
            <option value="a-z" className='option-value'>Product (a-z)</option>
            <option value="#" disabled ></option>
            <option value="z-a" className='option-value'>Product (z-a)</option>
        </select>
      </form>
    </div>
  )
}

export default Sort
