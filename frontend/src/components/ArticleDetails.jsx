import React from 'react';
import '../styles/ArticleDetails.css';
import Test from '../assets/branding/Logo.png';

const ArticleDetails = ({article, large}) => {
    return(
        <div className='articlePreview'>
            <img src={Test} alt="Test" className='thumbnail'/>
            <div className='articleContent'>
                <div className='articleTitle'>{article.title}</div>
                {large && <div className='articleDescription'>{article.description}</div>}
                <div className='articleBottomContainer'>
                    <div className='articleAuthor'>{article.author}</div>
                    <div className='articleDuration'>{article.duration} min</div>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetails