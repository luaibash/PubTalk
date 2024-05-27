import {React, useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import RedirectButton from './RedirectButton';
import HamburgerMenu from './HamburgerMenu';
import Logo from '../assets/branding/Logo.png';
import Name from '../assets/branding/Name.png';
import HamburgerMenuIcon from '../assets/hamburgerMenu/HamburgerMenu.svg';
import '../styles/components/Navbar.css';

// The main navbar, holds both the navbar and the hamburger menu together
const MainNavbar = () => {
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);  // Tracks if the hamburger menu should be showing now or not
    const [isSwitching, setIsSwitching] = useState(false);              // Tracks if the hamburger menu is currently closing/opening

    // useEffect to close hamburger menu whenever window is large enough to not need it
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1000) {
                setShowHamburgerMenu(false);
                document.body.style.overflow = 'auto';
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Used to switch hamburger menu from open to close, or close to open. Updates value of showHamburgerMenu and closes/opens it
    const updateHamburgerMenu = () => {
        // If the menu is currently switching, do not allow it to switch again during the animation
        if (isSwitching) return;

        setIsSwitching(true);
        setShowHamburgerMenu(showHamburgerMenu => !showHamburgerMenu);
        SwitchScrollBar();

        // Switching animation takes 0.8 seconds, once animation is done set variable back to not switching
        setTimeout(() => {
            setIsSwitching(false);
        }, 800);
    };

    // Switches scrollbars whenever hamburger menu is opened or closed
    const SwitchScrollBar = () => {
        if (showHamburgerMenu) { // Switching from show to not show, but showHamburgerMenu still true because code has not finished running to update it yet
            document.body.style.overflow = 'auto';
            document.querySelector('#HamburgerMenuActive').style.overflow = 'hidden';
        }
        else {                   // Switching from not show to show, showHamburgerMenu still false for the same idea
            setTimeout(() => {
                document.body.style.overflow = 'hidden';
                document.querySelector('#HamburgerMenuActive').style.overflow = 'auto';
            }, 1);
        }
    };

    return (
        <div>
            <Navbar updateHamburgerMenu={updateHamburgerMenu}/>
            <HamburgerMenu showHamburgerMenu={showHamburgerMenu} updateHamburgerMenu={updateHamburgerMenu}/>
        </div>
    )
}

// The Navbar that is shown at all times
const Navbar = ({updateHamburgerMenu}) => {
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
                    <img src={HamburgerMenuIcon} alt="Hamburger Menu Icon" className='HamburgerMenuIcon' onClick={() => updateHamburgerMenu()}/>
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