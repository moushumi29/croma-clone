import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer"


const AppContext = createContext();

const API = "https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=672";

const initialState =  {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: []
};

const AppProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async(url) => {
        dispatch({type: "SET_LOADING" });
        try{
            const res = await axios.get(url, {
                headers: {
                    projectId: 'j7qoo6mywx67'
                  },
            });
            const products = await res.data.data;
            // console.log(products)
            dispatch({ type: "SET_API_DATA", payload: products});
        }catch(error){
            dispatch({ type: "API_ERROR"});
        }
    }

    useEffect(()=>{
        getProducts(API);
    }, []);

    return (
        <AppContext.Provider value={{ ...state }}>
            {children}
        </AppContext.Provider>
    )
}

const useProductContext = () => {
    return useContext(AppContext);
}

export { AppProvider, AppContext, useProductContext };