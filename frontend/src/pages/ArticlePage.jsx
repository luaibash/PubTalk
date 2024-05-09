import {React, useEffect, useState} from 'react';
import NotFound from './NotFound';
import '../styles/App.css';
import '../styles/ArticlePage.css';

const ArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const imageFolder = (article) ? article.title.replace(/[^a-zA-Z0-9]/g, '') : ""; // Grabs name of folder for specified article

    // Grab id from link
    const queryParams = new URLSearchParams(window.location.search);
    const articleID = queryParams.get('id');

    useEffect(() => {
        const fetchArticle = async () => {
            // Fetches the API and finds article using its id
            const response = await fetch('/api/articles/' + articleID);
            const json = await response.json();

            if (response.ok) setArticle(json);
            else setNotFound(true);
        }

        fetchArticle()
    }, [articleID])

    // If link does not exist, show not found page
    if (notFound) return <NotFound/>;

    // Show article as soon as the article has been pulled from the database
    else if (article) return (
        <div className='ArticlePagePanel'>
            <div className='Title' id='ArticleTitle'>
                {article.title}
            </div>
            <div className='ArticleDetails'>
                {article.author} &#8226; {Date(article.createdAt)} &#8226; {article.duration} Min read
            </div>
            <img src={require(`../assets/articleImages/${imageFolder}/Cover.png`)} alt="Article Cover" className='ArticleCover'/>
            <div className='ArticleBody'>
                <div className='ArticleContent'>

                </div>
                <div className='OtherArticleSuggestions'>

                </div>
            </div>
        </div>
    );
}

export default ArticlePage;