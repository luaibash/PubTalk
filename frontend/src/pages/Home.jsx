import {React, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ArticleDetails from '../components/ArticleDetails';
import RedirectButton from '../components/RedirectButton';
import PanelOneBackground from '../assets/home/PanelOneBackground.png';
import PersonReading from '../assets/home/PersonReading.png';
import Arrow from '../assets/home/Arrow.png'
import BlueBlob from '../assets/home/BlueBlob.png';
import PinkBlob from '../assets/home/PinkBlob.png';
import '../styles/App.css';
import '../styles/home/PanelOne.css';
import '../styles/home/PanelTwo.css';
import '../styles/home/PanelThree.css';
import '../styles/home/PanelFour.css';
import '../styles/Boxes.css';

// Home page that has the landing panel, the most recent/top articles, and a contact redirect
const Home = () => {
    return (
        <div>
            <PanelOne/>
            <PanelTwo/>
            <PanelThree/>
            <PanelFour/>
        </div>
    );
}

// First panel of home page that is the landing panel
const PanelOne = () => {
    return (
        <div className='PanelOne'>
            <div className='PanelOneContainer'>
                <div className='PanelOneTextContainer'>
                    <div className='PanelOneTitle'>
                        Empowering Tomorrow's
                        Voices, Today.
                    </div>
                    <div className='PanelOneSubtext'>
                        Discover different stories and perspectives from
                        students all around the country, offering unique
                        perspectives on crucial global topics.
                    </div>
                    <div className='PanelOneButton'>
                        <RedirectButton title="Start Reading" destination="Articles"/>
                    </div>
                </div>
                <div className='PanelOneImageContainer'>
                    <img src={PersonReading} alt="" className='PanelOneImage'/>
                </div>
            </div>
            <div className='PanelOneDivider'/>
            <img src={PanelOneBackground} alt="Background" className='PanelOneBackground'/>
        </div>
    );
}

// Second panel that shows the 5 top articles 
const PanelTwo = () => {
    const [articles, setArticles] = useState(null)

    useEffect(() => {
        const fetchArticles = async () => {
            // Fetches the API
            const response = await fetch('/api/articles/top?limit=5')
            const json = await response.json()

            if (response.ok) {
                setArticles(json)
            }
        }

        fetchArticles()
    }, [])

    let navigate = useNavigate();
    const goToLocation = (location) => {
        navigate(location.toLowerCase());
        window.scrollTo(0,0);
    }

    return (
        <div className='PanelTwo'>
            <div className='Title' id='PanelTwoTitle' onClick={() => goToLocation('Articles')}>
                Top Articles
                <img src={Arrow} alt="" className='Arrow'/>
            </div>
            <div className='Subtext' id='PanelTwoSubtext'>
                Read into the articles that people are talking
                about more.
            </div>
            <div className='PanelTwoArticlesContainer'>
                <div className='PanelTwoMainBoxContainer'>
                    {articles && articles[0] && <ArticleDetails article={articles[0]} large={true}/>}
                </div>
                <div className='PanelTwoBoxColumn'>
                    <div className='Box' id='BoxTop'>
                        {articles && articles[1] && <ArticleDetails article={articles[1]} />}
                    </div>
                    <div className='Box'>
                        {articles && articles[2] && <ArticleDetails article={articles[2]} />}
                    </div>
                </div>
                <div className='PanelTwoBoxColumn'>
                    <div className='Box' id='BoxTop'>
                        {articles && articles[3] && <ArticleDetails article={articles[3]} />}
                    </div>
                    <div className='Box'>
                        {articles && articles[4] && <ArticleDetails article={articles[4]} />}
                    </div>
                </div>
                <img src={BlueBlob} alt="" className='BlueBlob'/>
            </div>
        </div>
    );
}

// Third panel that shows the 6 most recent articles
const PanelThree = () => {
    const [articles, setArticles] = useState(null)

    useEffect(() => {
        const fetchArticles = async () => {
            // Fetches the API
            const response = await fetch('/api/articles/recent?limit=6')
            const json = await response.json()

            if (response.ok) {
                setArticles(json)
            }
        }

        fetchArticles()
    }, [])

    let navigate = useNavigate();
    const goToLocation = (location) => {
        navigate(location.toLowerCase());
        window.scrollTo(0,0);
    }

    return (
        <div className='PanelThree'>
            <div className='Title' id='PanelThreeTitle' onClick={() => goToLocation('Articles')}>
                Most Recent
                <img src={Arrow} alt="" className='Arrow'/>
            </div>
            <div className='Subtext' id='PanelThreeSubtext'>
                Read into the most recent articles, delivering
                fresh news on current politics.
            </div>
            <div className='PanelThreeArticlesContainer'>
                <div className='PanelThreeBoxColumn' id='BoxLeft'>
                    <div className='Box' id='BoxTop'>
                        {articles && articles[0] && <ArticleDetails article={articles[0]} />}
                    </div>
                    <div className='Box'>
                        {articles && articles[1] && <ArticleDetails article={articles[1]} />}
                    </div>
                </div>
                <div className='PanelThreeBoxColumn' id='BoxLeft'>
                    <div className='Box' id='BoxTop'>
                        {articles && articles[2] && <ArticleDetails article={articles[2]} />}
                    </div>
                    <div className='Box'>
                        {articles && articles[3] && <ArticleDetails article={articles[3]} />}
                    </div>
                </div>
                <div className='PanelThreeLongBoxColumn'>
                    <div className='LongBox' id='BoxTop'>
                        {articles && articles[4] && <ArticleDetails article={articles[4]} long={true}/>}
                    </div>
                    <div className='LongBox'>
                        {articles && articles[0] && <ArticleDetails article={articles[0]} long={true}/>}
                    </div>
                </div>
                <img src={PinkBlob} alt="" className='PinkBlob'/>
            </div>
        </div>
    );
}

// Fourth panel that shows a contact box to redirect to the contact page
const PanelFour = () => {
    return (
        <div className='PanelFour'>
            <div className='PanelFourTextContainer'>
                <div className='Title'>
                    Contact Us.
                </div>
                <div className='Subtext' id='PanelFourSubtext'>
                    Here at Article, we are committed to providing users
                    with constant support, assistance, and a seamless
                    experience.
                </div>
            </div>
            <div className='PanelFourContactContainer'>
                <div className='PanelFourContactBox'>
                    <RedirectButton title="Contact Us" destination="Contact"/>
                </div>
            </div>
        </div>
    );
}

export default Home;