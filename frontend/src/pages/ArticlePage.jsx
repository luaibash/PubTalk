import {React, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ArticleDetails from '../components/ArticleDetails'
import RedirectButton from '../components/RedirectButton';
import PersonReading from '../assets/home/PersonReading.png';
import Arrow from '../assets/home/Arrow.png'
import BlueBlob from '../assets/home/BlueBlob.png';
import PinkBlob from '../assets/home/PinkBlob.png';
import '../styles/home/Home.css';
import '../styles/home/PanelOne.css';
import '../styles/home/PanelTwo.css';
import '../styles/home/PanelThree.css';
import '../styles/home/PanelFour.css';
import '../styles/Boxes.css';

//routers
import {useParams} from 'react-router-dom';

const ArticlePage = () => {
    return (
        <div>
            <Stuff/>
        </div>
    );
}

const Stuff = () => {
    //articleID is same name as in app.jsx that we set
    const {articleID} = useParams()

    const [article, setArticle] = useState(null)

    useEffect(() => {
        const fetchArticle = async () => {
            // Fetches the API
            const response = await fetch('/api/articles/' + articleID)
            const json = await response.json()

            if (response.ok) {
                setArticle(json)
            }
        }

        fetchArticle()
    }, [])

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