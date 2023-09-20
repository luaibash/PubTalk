import React from 'react';
import '../styles/Articles.css';
import Books from '../assets/articles/books.png';

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
        </div>
    );
}

export default Articles;