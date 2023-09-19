import React from 'react';
import '../styles/Articles.css';
import Search from '../assets/articles/Search.png';

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
        </div>
    );
}

export default Articles;