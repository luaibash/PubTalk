import {React} from 'react';
import CloseIcon from '../assets/hamburgerMenu/CloseIcon.png';
import '../styles/components/HamburgerMenu.css';

// The menu that is on the navbar when the screen is too small, that when clicked, expands to show all pages to redirect to
const HamburgerMenu = ({showHamburgerMenu, updateHamburgerMenu}) => {
    return (
        <div className='OverlayAndHamburgerMenu'>
            <div className='DarkOverlay' id={showHamburgerMenu ? 'DarkOverlayActive' : ''}/>
            <div className='HamburgerMenuContainer' id={showHamburgerMenu ? 'HamburgerMenuActive' : 'HamburgerMenuInactive'}>
                <div className='HamburgerMenuTop'>
                    <img src={CloseIcon} alt="Close Icon" className='CloseIcon' onClick={() => updateHamburgerMenu()}/>
                </div>
            </div>
        </div>
    )
}

export default HamburgerMenu;