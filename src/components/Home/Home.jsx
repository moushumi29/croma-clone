import React from 'react'
import Banner from './Banner'
import BankBanner from './BankBanner'
import Products from './Products'
import TrendingProduct from './TrendingProduct'
import TopRated from './TopRated'
import KitchenAppliances from './KitchenAppliances'
import ItemBanner from './ItemBanner'
import Mobile from './Mobile'
import Audio from './Audio'
import Brands from './Brands'
import Laptop from './Laptop'
import Refrigerator from './Refrigerator'

const Home = () => {
  return (
    <div className='home-container'>
      <Banner/>
      <BankBanner/>
      <br/>
      <Products/>
    
      <TrendingProduct/>
      <TopRated/>
      <KitchenAppliances/>
      <br/>
      <ItemBanner/>
      <Mobile/>
      <Audio/>
      <Brands/>
      <Laptop/>
      <Refrigerator/>
      <footer style={{height:"50px", backgroundColor:"#1d1d1d", marginTop:"14px"}}>

      </footer>
      
    </div>
  )
}

export default Home
