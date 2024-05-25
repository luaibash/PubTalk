import {React} from 'react';
import '../styles/components/HamburgerMenu.css';

// The menu that is on the navbar when the screen is too small, that when clicked, expands to show all pages to redirect to
const HamburgerMenu = ({showHamburgerMenu, updateHamburgerMenu}) => {
    return (
        <div className='OverlayAndHamburgerMenu'>
            <div className='DarkOverlay' id={showHamburgerMenu ? 'DarkOverlayActive' : 'DarkOverlayInactive'}/>
            <div className='HamburgerMenuContainer' id={showHamburgerMenu ? 'HamburgerMenuActive' : 'HamburgerMenuInactive'} onClick={() => updateHamburgerMenu()}>
                <div className='HamburgerMenu'>

                </div>
            </div>
        </div>
    )
}

export default HamburgerMenu;