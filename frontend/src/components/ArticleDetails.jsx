import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/components/ArticleDetails.css';

// Component that is an article preview on the home page and articles page
const ArticleDetails = ({article, large, long, genreArticle=false}) => {
    const imageFolder = article.title.replace(/[^a-zA-Z0-9]/g, ''); // Grabs name of folder for specified article
    const articleLink = article.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '-'); // Grab article link

    return(
        <Link to={`/articles/${articleLink}?id=${encodeURIComponent(article._id)}`} className='articlePreview' id={genreArticle ? 'GenrePreview' : ''}>
            <img src={require(`../assets/articleImages/${imageFolder}/Cover.png`)} alt="Article Cover" className='thumbnail' id={genreArticle ? 'GenreThumbnail' : ''}/>
            <div className='articleContent' id={large ? 'articleContentLarge' : (genreArticle ? 'GenreContent' : '')}>
                <div className='articleTopContainer'>
                    <div className='articleTitle' id={large ? 'articleTitleLarge' : (genreArticle ? 'GenreTitle' : '')}>{article.title}</div>
                    <div className='articleDescription' id={large ? 'LargeDescription' : (genreArticle ? 'GenreDescription' : (long ? 'LongDescription' : ''))}>{article.description}</div>
                </div>
                <div className='articleBottomContainer'>
                    <div className='articleAuthor' id={large ? 'articleDetailsLarge' : ''}>{article.author}</div>
                    <div className='articleDuration' id={large ? 'articleDetailsLarge' : ''}>{article.duration} min</div>
                </div>
            </div>
        </Link>
    );
}

export default ArticleDetails;