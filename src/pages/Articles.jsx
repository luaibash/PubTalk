import React from 'react';
import '../styles/Articles.css';
import '../styles/Boxes.css';
import Books from '../assets/articles/books.png';
import Arrow from '../assets/home/Arrow.png';

const Articles = () => {
    return (
        <div  className='ArticlePanel'>
            <div className='Title' id='ArticleTitle'>
                Explore Our Articles: Find Your Desired
                Topics Here
            </div>
            <div className='SearchContainer'>
                <input type="text" placeholder='Search any topic (e.g. Politics) ' className='Search'/>
            </div>
            <img src={Books} alt="" className='Books'/>
            <div className='Title' id='PanelTwoTitle'>
                Top Articles
                <img src={Arrow} alt="" className='Arrow'/>
            </div>
            <div className='Subtext' id='PanelTwoSubtext'>
                Read into the articles that people are talking
                about more.
            </div>
            <div className='BoxContainer'>
                <div className='BoxRow'>
                    <div className='Box'/>
                    <div className='Box'/>
                    <div className='Box'/>
                    <div className='Box'/>
                </div>
                <div className='BoxRow'>
                    <div className='Box'/>
                    <div className='Box'/>
                    <div className='Box'/>
                    <div className='Box'/>
                </div>
            </div>
            <div className='Title' id='PanelThreeTitle'>
                All Articles
                <img src={Arrow} alt="" className='Arrow'/>
            </div>
            <div className='Subtext' id='PanelThreeSubtext'>
                Read into any article, ordered from most recent to
                least.
            </div>
            <div className='BoxContainer'>
                <div className='BoxRow'>
                    <div className='Box'/>
                    <div className='Box'/>
                    <div className='Box'/>
                    <div className='Box'/>
                </div>
                <div className='BoxRow'>
                    <div className='Box'/>
                    <div className='Box'/>
                    <div className='Box'/>
                    <div className='Box'/>
                </div>
            </div>
        </div>
    );
}

export default Articles;