import React from 'react';
import '../styles/Navbar.css';
import Logo from '../assets/logo/BlackLogo.png';
import Name from '../assets/name/ArticleName.png';

const Navbar = () => {
    return (
        <div className='NavbarContainer'>
            <div className='Navbar'>
                <div className='NavbarLogoNameContainer'>
                    <img src={Logo} alt="Article Logo" className='NavbarLogo'/>
                    <img src={Name} alt="Article Name" className='NavbarName'/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;