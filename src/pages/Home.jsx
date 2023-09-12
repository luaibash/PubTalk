import React from 'react';
import {useNavigate} from "react-router-dom";
import RedirectButton from '../components/RedirectButton';
import PersonReading from '../assets/home/PersonReading.png';
import Arrow from '../assets/home/Arrow.png'
import BlueBlob from '../assets/home/BlueBlob.png';
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
    let navigate = useNavigate();
    const goToLocation = (location) => {
        navigate(location.toLowerCase());
        window.scrollTo(0,0);
    }

    return (
        <div className='PanelTwo'>
            <div className='Title' id='PanelTwoTitle' onClick={() => goToLocation('Articles')}>
                Top Articles
                <img src={Arrow} alt="" className='Arrow'/>
            </div>
            <div className='Subtext' id='PanelTwoSubtext'>
                Read into the articles that people are talking
                about more.
            </div>
            <div className='PanelTwoArticlesContainer'>
                <div className='PanelTwoMainBoxContainer'/>
                <div className='PanelTwoBoxColumn'>
                    <div className='Box' id='BoxTop'/>
                    <div className='Box'/>
                </div>
                <div className='PanelTwoBoxColumn'>
                    <div className='Box' id='BoxTop'/>
                    <div className='Box'/>
                </div>
                <img src={BlueBlob} alt="" className='BlueBlob'/>
            </div>
        </div>
    );
}

const PanelThree = () => {
    let navigate = useNavigate();
    const goToLocation = (location) => {
        navigate(location.toLowerCase());
        window.scrollTo(0,0);
    }

    return (
        <div className='PanelThree'>
            <div className='Title' id='PanelThreeTitle' onClick={() => goToLocation('Articles')}>
                Most Recent
                <img src={Arrow} alt="" className='Arrow'/>
            </div>
            <div className='Subtext' id='PanelThreeSubtext'>
                Read into the most recent articles, delivering
                fresh news on current politics.
            </div>
            <div className='PanelThreeArticlesContainer'>
                <div className='PanelThreeBoxColumn' id='BoxLeft'>
                    <div className='Box' id='BoxTop'/>
                    <div className='Box'/>
                </div>
                <div className='PanelThreeBoxColumn' id='BoxLeft'>
                    <div className='Box' id='BoxTop'/>
                    <div className='Box'/>
                </div>
                <div className='PanelThreeLongBoxColumn'>
                    <div className='LongBox' id='BoxTop'/>
                    <div className='LongBox'/>
                </div>
            </div>
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