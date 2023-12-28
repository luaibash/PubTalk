import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/ArticleDetails.css';

const ArticleDetails = ({article, large}) => {
    const imageFolder = article.title.replace(/[^a-zA-Z0-9]/g, ''); // Grabs name of folder for specified article
    //const name = article.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-');


    return(
        <Link to={`/articles/page/${article.link}`} className='articlePreview'>
            <img src={require(`../assets/articleImages/${imageFolder}/Cover.png`)} alt="Article Cover" className='thumbnail'/>
            <div className='articleContent' id={large ? 'articleContentLarge' : ''}>
                <div className='articleTopContainer'>
                    <div className='articleTitle' id={large ? 'articleTitleLarge' : ''}>{article.title}</div>
                    {large && <div className='articleDescription'>{article.description}</div>}
                </div>
                <div className='articleBottomContainer'>
                    <div className='articleAuthor' id={large ? 'articleDetailsLarge' : ''}>{article.author}</div>
                    <div className='articleDuration' id={large ? 'articleDetailsLarge' : ''}>{article.duration} min</div>
                </div>
            </div>
        </Link>
    );
}

export default ArticleDetails