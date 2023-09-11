import React from 'react';
import RedirectButton from '../components/RedirectButton';
import PersonReading from '../assets/home/PersonReading.png';
import '../styles/home/Home.css';
import '../styles/home/PanelOne.css';
import '../styles/home/PanelTwo.css';
import '../styles/home/PanelThree.css';
import '../styles/home/PanelFour.css';

const Home = () => {
    return (
        <div>
            <PanelOne/>
            <PanelTwo/>
            <PanelThree/>
            <PanelFour/>
        </div>
    );
}

const PanelOne = () => {
    return (
        <div className='PanelOne'>
            <div className='PanelOneContainer'>
                <div className='PanelOneTextContainer'>
                    <div className='Title' id='PanelOneTitle'>
                        Empowering Tomorrow's
                        Voices, Today.
                    </div>
                    <div className='Subtext' id='PanelOneSubtext'>
                        Discover different stories and perspectives from
                        students all around the country, offering unique
                        perspectives on crucial global topics.
                    </div>
                    <div className='PanelOneButton'>
                        <RedirectButton title="Start Reading" destination="Articles"/>
                    </div>
                </div>
                <div className='PanelOneImageContainer'>
                    <img src={PersonReading} alt="" className='PanelOneImage'/>
                </div>
            </div>
            <div className='PanelOneDivider'/>
        </div>
    );
}

const PanelTwo = () => {
    return (
        <div className='PanelTwo'>
            <div className='Title'>
                Top Articles
            </div>
            <div className='Subtext' id='PanelTwoSubtext'>
                Read into the articles that people are talking
                about more.
            </div>
        </div>
    );
}

const PanelThree = () => {
    return (
        <div className='PanelThree'>
            Panel Three
        </div>
    );
}

const PanelFour = () => {
    return (
        <div className='PanelFour'>
            <div className='PanelFourTextContainer'>
                <div className='Title'>
                    Contact Us.
                </div>
                <div className='Subtext' id='PanelFourSubtext'>
                    Here at Article, we are committed to providing users
                    with constant support, assistance, and a seamless
                    experience.
                </div>
            </div>
            <div className='PanelFourContactContainer'>
                <div className='PanelFourContactBox'>
                    <RedirectButton title="Contact Us" destination="Contact"/>
                </div>
            </div>
        </div>
    );
}

export default Home;