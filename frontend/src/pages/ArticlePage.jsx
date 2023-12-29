import {React, useEffect, useState} from 'react';
import ArticleDetails from '../components/ArticleDetails';
import NotFound from './NotFound';
import '../styles/home/Home.css';
import '../styles/home/PanelOne.css';
import '../styles/home/PanelTwo.css';
import '../styles/home/PanelThree.css';
import '../styles/home/PanelFour.css';
import '../styles/Boxes.css';

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
        <div className='TeamPanel'>
            <div className='TitleContainer'>  
                <div className='Title'>
                    this is article:
                </div>
                <p1> 
                    {article && <ArticleDetails key={article.title} article={article} />}
                </p1>
            </div>
        </div>
    );
}

export default ArticlePage;