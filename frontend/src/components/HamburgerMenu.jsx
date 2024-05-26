import {React} from 'react';
import {useNavigate} from 'react-router-dom';
import CloseIcon from '../assets/hamburgerMenu/CloseIcon.png';
import RightArrow from '../assets/hamburgerMenu/RightArrow.svg';
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
                <div className='HamburgerPages'>
                    <HamburgerPage showPage={showHamburgerMenu} text={'Home'} pageNumber={0} destination="/" hamburgerMenu={showHamburgerMenu} setHamburgerMenu={updateHamburgerMenu}/>
                    <HamburgerPage showPage={showHamburgerMenu} text={'Articles'} pageNumber={1} destination="/articles" hamburgerMenu={showHamburgerMenu} setHamburgerMenu={updateHamburgerMenu}/>
                    <HamburgerPage showPage={showHamburgerMenu} text={'Team'} pageNumber={2} destination="/team" hamburgerMenu={showHamburgerMenu} setHamburgerMenu={updateHamburgerMenu}/>
                    <HamburgerPage showPage={showHamburgerMenu} text={'Contact'} pageNumber={3} destination="/contact" hamburgerMenu={showHamburgerMenu} setHamburgerMenu={updateHamburgerMenu}/>
                </div>
            </div>
        </div>
    )
}

// Defines one of each page listed on the hamburger menu
const HamburgerPage = ({showPage, text, pageNumber, destination, setHamburgerMenu}) => {
    const maxPage = 5; const interval = 0.05; const maxTime = maxPage*interval;
    const delay = (showPage) ? (0.5 + pageNumber*interval) : (maxTime - pageNumber*interval);
    const pageStyle = {
        transition: `padding-left 0.5s, color 0.5s, opacity 0.2s ease-out ${delay}s, margin-top 0.2s ease-out ${delay}s`,
    };

    // Used to go to location of page clicked on
    const navigate = useNavigate();
    const goToLocation = (location) => {
        navigate(location);
        window.scrollTo(0,0);
        setHamburgerMenu(showHamburgerMenu => !showHamburgerMenu);
    }

    return (
        <div className='HamburgerPage' id={showPage ? 'HamburgerPageActive' : 'HamburgerPageInactive'} style={pageStyle} onClick={() => goToLocation(destination)}>
            {text}
            <img src={RightArrow} alt="Arrow" className='HamburgerArrow'/>
        </div>
    );
};

export default HamburgerMenu;