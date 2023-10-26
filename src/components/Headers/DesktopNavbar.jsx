import React, { useContext, useState } from 'react'
import Box from '../../Box'
import logo from "../../assests/logo-croma.svg";
import { IoMenuOutline, IoPencil } from "react-icons/io5";
import { CiSearch } from "react-icons/ci"
import { MdLocationOn } from "react-icons/md"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import LoginDialog from '../login/LoginDialog';
import { useFilterContext } from '../../context/filterContext';
import { useNavigate } from 'react-router-dom';
import { LogedInUser } from '../../App';
import Menu from './Menu';
import { Modal } from '@mui/material';
import PincodeDialog from '../login/PincodeDialog';

const DesktopNavbar = () => {
    const navigate = useNavigate();

    const { logedIn, setLogedIn, cartValue } = useContext(LogedInUser);
    if (sessionStorage.getItem('userInfo')) {
        setLogedIn(true);
    }

    const [open, setOpen] = useState(false);
    const [openPinCode, setOpenPincode] = useState(false);
    const [openMenuModal, setOpenMenuModal] = useState(false);

    const openDialog = () => {
        if (logedIn) {
            navigate('/myProfilePage')
        } else {
            setOpen(true);
        }

    }
    const openPinCodeDialog = () =>{
        setOpenPincode(true);
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

    const pincode = sessionStorage.getItem('pincodeInfo');
    const info = JSON.parse(pincode);

    return (

        <Box>
            <div className='desktop-navbar'>
                <div className='left-side'>
                    <div className='image-container' onClick={()=> navigate('/')}>
                        <img src={logo} alt='croma-logo' />
                    </div>
                    <div className='menu-container' onClick={() => setOpenMenuModal(true)}>
                        <IoMenuOutline style={{ fontSize: "30px" }} />
                        <p className='p-small'>Menu</p>
                    </div>
                    <Modal open={openMenuModal} onClose={() => setOpenMenuModal(false)} sx={{ top: '60px', left: "15%" }}>
                        <Menu />
                    </Modal>
                    <div className='search-container'>
                        <form onSubmit={handleFormSubmit}>
                            <input type='text' placeholder='What are you looking for ?' name="text" value={text}
                                onChange={updateFilterValue}
                                onClick={clearInput}
                            // onBlur={clearInput}
                            />
                        </form>
                        <CiSearch className='search-icon' />
                    </div>
                </div>
                <div className='right-side'>
                    <div className='location' onClick={openPinCodeDialog}>
                        <MdLocationOn style={{ fontSize: "24px" }} />
                        {info ? <p>{info.state}, {info.pincode}</p> :
                        <p>Mumbai, 400019</p>}

                        <IoPencil style={{ fontSize: "12px" }} />
                    </div>
                    <div style={{cursor:"pointer"}}>
                        <FaUser style={{ fontSize: "22px" }} onClick={openDialog} />
                    </div>
                    <div className='cart'>
                        <FaShoppingCart style={{ fontSize: "22px" }} onClick={() => navigate('/cartPage')} />
                        <p>{cartValue}</p>
                    </div>
                </div>
            </div>
            <LoginDialog open={open} setOpen={setOpen} />
            <PincodeDialog open={openPinCode} setOpen={setOpenPincode}/>
        </Box>

    )
}

export default DesktopNavbar
