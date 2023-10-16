import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const buttonStyles = {
    color: 'white',
    backgroundColor: 'black',
    fontWeight: '200',
    fontSize: '16px',
    width: '100%',
    p: '8px 20px',
    justifyContent: 'flex-start',
    textAlign: 'left',
    textTransform: 'inherit',
    ':hover': {
      backgroundColor: '#00e9bf',
      color:"black"
    }
  
  }

const Menu = () => {
    const navigate = useNavigate();
  return (
    <Box sx={{ borderRadius: '4px',width:'340px', backgroundColor:'black'}}>
    <Box sx={{ py: '10px' }}>
        <Box sx={{backgroundColor: 'black',width: '100%', p: '10px 20px', fontWeight:"700", fontSize:"20px" }}>
            Shop by Category
        </Box>
    <Box>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/mobile')}>Mobile Phones</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/tv')}>Television</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/refrigerator')}>Refrigerator</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/tablet')}>Computer & Tablets</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/kitchenappliances')}>Kitchen Appliances</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/health')}>Health & Grooming</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/laptop')}>Laptop</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/travel')}>Accessories</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/audio')}>Home Theaters & Sound Bars</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/ac')}>Air Conditioners</Button>
      <Button sx={buttonStyles} onClick={()=> navigate('/productList/washingMachine')}>Washing Machine</Button>
    </Box>
  </Box>
  </Box>
  )
}

export default Menu
