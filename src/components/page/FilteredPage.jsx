import React, { useState } from 'react'
import Box from '../../Box'
import { useFilterContext } from '../../context/filterContext'
import FilterProductCard from '../helper/FilterProductCard'
import Sort from '../helper/Sort'

const FilteredPage = () => {
  document.body.style.backgroundColor = "#191919";
  document.body.style.color = "white";
  const { filter_products,
    filters: {
      text, price, maxPrice, minPrice
    },
    all_products,
    updateFilterValue,
  clearFilters,
 } = useFilterContext()
  // console.log(filter_products)
  const [showAll, setShowAll] = useState(false);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const toggleShowAllCategory = () => {
    setShowAllCategory(!showAllCategory);
  }

  const getUniqueData = (data, attr) => {
    let newVal = data.map((currElem) => {
      return currElem[attr];
    });

    return (newVal = ["all", ...new Set(newVal)]);
  }
  // console.log("all products", all_products)
  const categoryData = getUniqueData(all_products, "subCategory");
  const companyData = getUniqueData(all_products, "brand");

  // console.log(companyData)
  return (
    <Box>
      <div className='filter-page'>
        <div className='filter-section'>
          <Sort />
          <h5 className='heading-filter-by'>FILTER BY</h5>
          <h5 className='different-type'>CATEGORIES</h5>
          <div>
            {categoryData.slice(0, showAllCategory ? categoryData.length : 4).map((currElem, i) => {
              return (
                <button key={i} type='button' name='subCategory' value={currElem} onClick={updateFilterValue} className='filter-btn'>
                  {currElem}
                </button>
              )
            })}
             <button onClick={toggleShowAllCategory} className='see-more'>
              {showAllCategory ? 'See Less -' : 'See More +'}
            </button>
          </div>

          <div>
            <h5 className='different-type'>BRAND</h5>
            {companyData.slice(0, showAll ? companyData.length : 4).map((currElem, i) => {
              return (
                <button key={i} type='button' name='brand' value={currElem} onClick={updateFilterValue} className='filter-btn'>
                  {currElem}
                </button>
              )
            })}
            <button onClick={toggleShowAll} className='see-more'>
              {showAll ? 'See Less -' : 'See More +'}
            </button>
          </div>

          <div>
            <div className='price-heading'>
            <h5 className='different-type'>PRICE</h5>
            <div>{price}</div>
            </div>
        
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>

      <div>
        <button onClick={clearFilters} className='clear-filter'>
          Clear Filters
        </button>
      </div>
        </div>
        <div className='items-container'>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className='heading'>{`Results for "${text}"`}</div>
            <div>{filter_products.length} Products found</div>
          </div>
          {filter_products.map((currElem, i) => {
            return (
              <FilterProductCard key={i} product={currElem} />
            )
          })}
        </div>
      </div>
    </Box>
  )
}

export default FilteredPage
