import {React} from 'react';
import {useNavigate} from 'react-router-dom';
import CloseIcon from '../assets/hamburgerMenu/CloseIcon.png';
import HomeIcon from '../assets/hamburgerMenu/HomeIcon.png';
import ArticlesIcon from '../assets/hamburgerMenu/ArticlesIcon.png';
import TeamIcon from '../assets/hamburgerMenu/TeamIcon.png';
import ContactIcon from '../assets/hamburgerMenu/ContactIcon.png';
import RightArrow from '../assets/hamburgerMenu/RightArrow.svg';
import '../styles/components/HamburgerMenu.css';

// The menu that is on the navbar when the screen is too small, that when clicked, expands to show all pages to redirect to
const HamburgerMenu = ({showHamburgerMenu, updateHamburgerMenu}) => {
    return (
        <div className='OverlayAndHamburgerMenu'>
            <div className='DarkOverlay' id={showHamburgerMenu ? 'DarkOverlayActive' : ''} onClick={() => updateHamburgerMenu()}/>
            <div className='HamburgerMenuContainer' id={showHamburgerMenu ? 'HamburgerMenuActive' : 'HamburgerMenuInactive'}>
                <div className='HamburgerMenuTop'>
                    <img src={CloseIcon} alt="Close Icon" className='CloseIcon' onClick={() => updateHamburgerMenu()}/>
                </div>
                <div className='HamburgerPages'>
                    <HamburgerPage showPage={showHamburgerMenu} text={'Home'} pageNumber={0} destination="/" icon={HomeIcon} hamburgerMenu={showHamburgerMenu} setHamburgerMenu={updateHamburgerMenu}/>
                    <HamburgerPage showPage={showHamburgerMenu} text={'Articles'} pageNumber={1} destination="/articles" icon={ArticlesIcon} hamburgerMenu={showHamburgerMenu} setHamburgerMenu={updateHamburgerMenu}/>
                    <HamburgerPage showPage={showHamburgerMenu} text={'Team'} pageNumber={2} destination="/team" icon={TeamIcon} hamburgerMenu={showHamburgerMenu} setHamburgerMenu={updateHamburgerMenu}/>
                    <HamburgerPage showPage={showHamburgerMenu} text={'Contact'} pageNumber={3} destination="/contact" icon={ContactIcon} hamburgerMenu={showHamburgerMenu} setHamburgerMenu={updateHamburgerMenu}/>
                </div>
            </div>
        </div>
    )
}

// Defines one of each page listed on the hamburger menu
const HamburgerPage = ({showPage, text, pageNumber, destination, icon, setHamburgerMenu}) => {
    // Variables used to calculate the delay of each page animating into the menu, as they each happen one after another
    const maxPage = 5; const interval = 0.05; const maxTime = maxPage*interval;
    const delay = (showPage) ? (0.5 + pageNumber*interval) : (maxTime - pageNumber*interval);

    // Dynamic styling is used here since delay varies on the pageNumber, this is applied with style={pageStyle} on the div
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
            <div className='HamburgerTitleAndIcon'>
                <img src={icon} alt="Page Icon" className='HamburgerPageIcon'/>
                {text}
            </div>
            <img src={RightArrow} alt="Arrow" className='HamburgerArrow'/>
        </div>
    );
};

export default HamburgerMenu;