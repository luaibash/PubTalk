import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Logo from '../assets/branding/Logo.png';
import Name from '../assets/branding/Name.png';
import '../styles/components/Footer.css';

// Footer at the bottom of the page
const Footer = () => {
    return (
        <div className='FooterContainer'>
            <div className='Footer'>
                <div className='FooterLogoName'>
                    <img src={Logo} alt="Article Logo" className='NavbarLogo'/>
                    <img src={Name} alt="Article Name" className='NavbarName'/>
                </div>
                <div className='FooterPages'>
                    <FooterPageItem pageName='Home'/>
                    |
                    <FooterPageItem pageName='Articles'/>
                    |
                    <FooterPageItem pageName='Team'/>
                    |
                    <FooterPageItem pageName='Contact'/>
                </div>
                <div className='Credits'>
                    Developed by Luai Bashar and Gabriel Hernandez   
                </div>
            </div>
        </div>
    )
}

// Component for the different featured pages on the footer, such as home, articles, team, contact
const FooterPageItem = ({ pageName }) => {
    const destination = (pageName !== 'Home') ? "/" + pageName.toLowerCase() : '/';
    const location = useLocation();
    const navigate = useNavigate();
    const goToLocation = (location) => {
        navigate(location);
        window.scrollTo(0,0);
    };

    return (
        <div
            className='FooterPage'
            id={location.pathname.toLowerCase() === destination ? "FooterPageActive" : "FooterPageInactive"}
            onClick={() => goToLocation(destination)}
        >
            {pageName}
        </div>
    );
};

export default Footer;