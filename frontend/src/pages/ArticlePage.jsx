import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ArticleDetails from '../components/ArticleDetails';
import NotFound from './NotFound';
import '../styles/home/Home.css';
import '../styles/home/PanelOne.css';
import '../styles/home/PanelTwo.css';
import '../styles/home/PanelThree.css';
import '../styles/home/PanelFour.css';
import '../styles/Boxes.css';

const ArticlePage = () => {
    //articleID is same name as in app.jsx that we set
    const {articleID} = useParams();
    const [article, setArticle] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            // Fetches the API
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

//IT ALL WORKS AND ALL, BUT IM WONDERING IF THE RENDERING WILL BE GOOD ENOUGH, what i mean is, i can go to all articles, then click on 1, and then ill get 
//to the article page and it works, but idk if im able to copy that articlepage link and send it to someone and they click on it and it directs then
//exactly there, or if there will be an error due to rendering not fully getting there fast enough

export default ArticlePage;