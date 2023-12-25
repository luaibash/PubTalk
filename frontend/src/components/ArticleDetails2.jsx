import React from 'react';
import '../styles/ArticleDetails.css';

import {Link} from 'react-router-dom';

const ArticleDetails2 = ({article, large}) => {
    const imageFolder = article.title.replace(/[^a-zA-Z0-9]/g, ''); // Grabs name of folder for specified article

    return(
        <div className='articlePreview'>
            <img src={require(`../assets/articleImages/${imageFolder}/Cover.png`)} alt="Article Cover" className='thumbnail'/>
            <div className='articleContent' id={large ? 'articleContentLarge' : ''}>
                <div className='articleTopContainer'>
                    <div className='articleTitle' id={large ? 'articleTitleLarge' : ''}> <Link to={`/articlepage/${article._id}`}>{article.title}</Link></div>
                    {large && <div className='articleDescription'>{article.description}</div>}
                </div>
                <div className='articleBottomContainer'>
                    <div className='articleAuthor' id={large ? 'articleDetailsLarge' : ''}>{article.author}</div>
                    <div className='articleDuration' id={large ? 'articleDetailsLarge' : ''}>{article.duration} min</div>
                </div>
            </div>
        </div>
    );
}

//The difference between articleDetails and articleDetails 2 is that i added the LINK function

export default ArticleDetails2