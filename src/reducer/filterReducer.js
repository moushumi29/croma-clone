const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => curElem.price);

      const maxPrice = priceArr.reduce((initialVal, curVal) => Math.max(initialVal, curVal), 0)
      // console.log(maxPrice)
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case "GET_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      let newSortData;
      // let tempSortProduct = [...action.payload];

      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }

        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    case "CLEAR_INPUT_VALUE":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
        }
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, subCategory, brand, price } = state.filters;

      if (text) {

        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          if (curElem.name.toLowerCase().includes(text)) {
            return curElem.name.toLowerCase().includes(text);
          } else {
            return curElem.subCategory.toLowerCase().includes(text);
          }
        });
      }



      if (subCategory !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.subCategory.toLowerCase() === subCategory.toLowerCase()
        );
      }

      if (brand !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.brand.toLowerCase() === brand.toLowerCase()
        );
      }

      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price === price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }

      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          subCategory: "all",
          brand: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;