import React from 'react';
import '../styles/Home.css';

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
            Panel One
        </div>
    );
}

const PanelTwo = () => {
    return (
        <div className='PanelTwo'>
            Panel Two
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
            Panel Four
        </div>
    );
}

export default Home;