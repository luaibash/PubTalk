import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import RedirectButton from './RedirectButton';
import '../styles/Navbar.css';
import Logo from '../assets/logo/BlackLogo.png';
import Name from '../assets/name/ArticleName.png';

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
                </div>
            </div>
        </div>
    )
}

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

export default Navbar;