import React, { useContext, useState } from 'react'
import logo from "../../assests/logo-croma.svg";
import { IoMenuOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { useFilterContext } from '../../context/filterContext';
import LoginDialog from '../login/LoginDialog';
import { LogedInUser } from '../../App';
import { Modal } from '@mui/material';
import Menu from './Menu';

const MobileNavbar = () => {
  const navigate = useNavigate();
  const { logedIn } = useContext(LogedInUser)
  const [open, setOpen] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);

  const openDialog = () => {
    if (logedIn) {
        navigate('/myProfilePage')
    } else {
        setOpen(true);
    }

}

  const {
    filters: { text },
    updateFilterValue,
    clearInput,
  } = useFilterContext();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/searchPage')
  }
  return (
    <div className='mobile-navbar'>
      <div className="first-div">
        <div className="left-side-mobile">
          <div className='menu-container' onClick={() => setOpenMenuModal(true)}>
            <IoMenuOutline style={{ fontSize: "30px" }} />

          </div>
          <Modal open={openMenuModal} onClose={() => setOpenMenuModal(false)} sx={{ top: '60px', left: "0%" }}>
            <Menu />
          </Modal>
          <div className='image-container-mobile'>
            <img src={logo} alt='croma-logo' />
          </div>
        </div>
        <div className="right-side-mobile">
          <div>
            <FaUser style={{ fontSize: "18px" }} onClick={openDialog} />
          </div>
          <div className='cart'>
            <FaShoppingCart style={{ fontSize: "18px" }} />
            <p>0</p>
          </div>
        </div>
      </div>
      <div className="second-div">
        <div className='search-container-mobile'>
          <form onSubmit={handleFormSubmit}>
            <input type='text' placeholder='What are you looking for ?' name="text" value={text}
              onChange={updateFilterValue} onClick={clearInput} />
            <CiSearch className='search-icon' />
          </form>
        </div>
      </div>
      <LoginDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default MobileNavbar
