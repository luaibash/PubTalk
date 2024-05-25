import {React} from 'react';
import '../styles/components/HamburgerMenu.css';

// The menu that is on the navbar when the screen is too small, that when clicked, expands to show all pages to redirect to
const HamburgerMenu = ({showHamburgerMenu, updateHamburgerMenu}) => {
    return (
        <div className='HamburgerMenuContainer' id={showHamburgerMenu ? 'HamburgerMenuActive' : 'HamburgerMenuInactive'}>
            <div className='HamburgerMenu'>
                Test
            </div>
        </div>
    )
}

export default HamburgerMenu;