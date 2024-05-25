import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import RedirectButton from './RedirectButton';
import HamburgerMenu from './HamburgerMenu';
import Logo from '../assets/branding/Logo.png';
import Name from '../assets/branding/Name.png';
import HamburgerMenuIcon from '../assets/hamburgerMenu/HamburgerMenu.svg';
import '../styles/components/Navbar.css';

// The main navbar, holds both the navbar and the hamburger menu together
const MainNavbar = () => {
    return (
        <div>
            <Navbar/>
            <HamburgerMenu/>
        </div>
    )
}

// The Navbar that is shown at all times
const Navbar = () => {
    return (
        <div className='NavbarContainer'>
            <div className='Navbar'>
                <div className='NavbarLeft'>
                    <img src={Logo} alt="Article Logo" className='NavbarLogo'/>
                    <img src={Name} alt="Article Name" className='NavbarName'/>
                </div>
                <div className='NavbarRight'>
                    <NavbarPageItem pageName="Home"/>
                    <NavbarPageItem pageName="Team"/>
                    <NavbarPageItem pageName="Contact"/>
                    <div className='NavbarButtonContainer'>
                        <RedirectButton title="Read More" destination="Articles"/>
                    </div>
                    <img src={HamburgerMenuIcon} alt="Hamburger Menu Icon" className='HamburgerMenuIcon'/>
                </div>
            </div>
        </div>
    )
}

// Different pages on the navbar that when clicked, redirects to their respected page
const NavbarPageItem = ({ pageName }) => {
    const destination = (pageName !== 'Home') ? "/" + pageName.toLowerCase() : '/';
    const location = useLocation();
    const navigate = useNavigate();
    const goToLocation = (location) => {
        navigate(location);
        window.scrollTo(0,0);
    };

    return (
        <div
            className='NavbarPage'
            id={location.pathname.toLowerCase() === destination ? "NavbarPageActive" : "NavbarPageInactive"}
            onClick={() => goToLocation(destination)}
        >
            {pageName}
        </div>
    );
};

export default MainNavbar;