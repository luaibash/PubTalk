import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/components/ArticleDetails.css';

const ArticleDetails = ({article, large, genreArticle=false}) => {
    const imageFolder = article.title.replace(/[^a-zA-Z0-9]/g, ''); // Grabs name of folder for specified article
    const articleLink = article.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '-'); // Grab article link

    return(
        <Link to={`/articles/${articleLink}?id=${encodeURIComponent(article._id)}`} className='articlePreview' id={genreArticle ? 'GenrePreview' : ''}>
            <img src={require(`../assets/articleImages/${imageFolder}/Cover.png`)} alt="Article Cover" className='thumbnail' id={genreArticle ? 'GenreThumbnail' : ''}/>
            <div className='articleContent' id={large ? 'articleContentLarge' : (genreArticle ? 'GenreContent' : '')}>
                <div className='articleTopContainer'>
                    <div className='articleTitle' id={large ? 'articleTitleLarge' : ''}>{article.title}</div>
                    <div className='articleDescription' id={large ? 'LargeDescription' : (genreArticle ? 'GenreDescription' : '')}>{article.description}</div>
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