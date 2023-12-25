import {React, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ArticleDetails2 from '../components/ArticleDetails2'
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

const Testing = () => {
    return (
        <div>
            <Stuff/>
        </div>
    );
}

const Stuff = () => {

    const [articles, setArticles] = useState(null)

    useEffect(() => {
        const fetchArticles = async () => {
            // Fetches the API
            const response = await fetch('/api/articles/recent')
            const json = await response.json()

            if (response.ok) {
                setArticles(json)
            }
        }

        fetchArticles()
    }, [])

    return (
        <div className='TeamPanel'>
            <div className='TitleContainer'>  
                <div className='Title'>
                    List of articles
                </div>
                <div className='Subtext' id='TeamSubtext'>
                    starting here:
                </div>
                <p1> 
                    {articles && articles.map((article) => (
                        <ArticleDetails2 key={article.title} article={article} />
                    ))}

                </p1>
            </div>
        </div>
    );
}


export default Testing;