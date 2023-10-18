import React, { createContext, useState } from 'react';
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Headers/Header';
import Home from './components/Home/Home';
import { Routes, Route } from "react-router-dom";
import ProductPage from './components/page/ProductPage';
import SinglePage from './components/page/SinglePage';
import SignUpDialog from './components/login/SignUpDialog';
import FilteredPage from './components/page/FilteredPage';
import CartPage from './components/page/CartPage';
import CheckOutPage from './components/page/CheckOutPage';
import BuyNow from './components/page/BuyNow';
import MyProfile from './components/page/MyProfile';
import MyOrdersPage from './components/page/MyOrdersPage';
import MyRewardPage from './components/page/MyRewardPage';
import MyWishLIstPage from './components/page/MyWishLIstPage';
import BrandPage from './components/page/BrandPage';
import ThankyouPage from './components/page/ThankyouPage';
import SubCategory from './components/page/SubCategory';

export const LogedInUser =  createContext();

const App = () => {
const [logedIn, setLogedIn] = useState(false);
const [cartValue, setCartValue] = useState(0);
return (
  <LogedInUser.Provider value={{logedIn, setLogedIn, cartValue, setCartValue}}>
    <Header />
    <ToastContainer position="top-center" theme="dark" />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/productList/:title' element={<ProductPage />} />
      <Route path='/subCategory/:title' element={<SubCategory />} />
      <Route path='/brandPage/:brand' element={<BrandPage/>} />
      <Route path='/singlePage/:_id' element={<SinglePage />} />
      <Route path='/signUpPage' element={<SignUpDialog />} />
      <Route path='/searchPage' element={<FilteredPage />} />
      <Route path='/cartPage' element={<CartPage/>} />
      <Route path='/checkOutPage' element={<CheckOutPage/>} />
      <Route path='/buyNowPage/:_id' element={<BuyNow/>} />
      <Route path='/myProfilePage' element={<MyProfile/>} />
      <Route path='/myOrdersPage' element={<MyOrdersPage/>}/>
      <Route path='/myRewardsPage' element={<MyRewardPage/>}/>
      <Route path='/myWishListPage' element={<MyWishLIstPage/>}/>
      <Route path='/thankyouPage' element={<ThankyouPage/>} />
    </Routes>

  </LogedInUser.Provider>
)
}

export default App
