import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducer/filterReducer"

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    sorting_value: "lowest",
    filters: {
        text: "",
        subCategory: "all",
        brand: "all",
        maxPrice: 0,
        price: 0,
        minPrice: 0,
    },
};

export const FilterContextProvider = ({ children }) => {
    const { products } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    //sorting according to input
    const sorting = (event) => {
        let userValue = event.target.value;
        dispatch({ type: "GET_SORT_VALUE", payload: userValue });
    }

    //update the filter values
    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;


        dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
        event.target.value = '';
    }

    //to clear the filters
    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" });
    };
    // Update the input value to an empty string
    const clearInput = () => {
        dispatch({ type: 'CLEAR_INPUT_VALUE', payload:"" }); 
    };
    //to sort the product
    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" })
        dispatch({ type: "SORTING_PRODUCTS" })
        
    }, [products, state.sorting_value, state.filters])

    

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }, [products])

    return (
        <FilterContext.Provider value={{
            ...state,
            sorting,
            updateFilterValue,
            clearFilters,
            clearInput,
        }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}