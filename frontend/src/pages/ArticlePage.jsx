import {React, useEffect, useState} from 'react';
import ArticleDetails from '../components/ArticleDetails';
import NotFound from './NotFound';
import '../styles/App.css';
import '../styles/ArticlePage.css';

const ArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [notFound, setNotFound] = useState(false);

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

    if (notFound) return <NotFound/>;

    return (
        <div className='ArticlePagePanel'>
            <div className='Title' id='ArticleTitle'>
                The Rise of NFTs: Exploring the Digital Art Revolution
            </div>
            <div className='ArticleDetails'>
                Luai Bashar &#8226; May 9th, 2024 &#8226; 5 Min read
            </div>
        </div>
    );
}

export default ArticlePage;