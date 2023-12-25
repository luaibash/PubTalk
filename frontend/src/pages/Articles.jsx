import {React, useState, useEffect} from 'react';
import '../styles/Articles.css';
import '../styles/Boxes.css';
import Books from '../assets/articles/books.png';
import Arrow from '../assets/home/Arrow.png';
import PageScroll from '../components/PageScroll';
import ArticleDetails from '../components/ArticleDetails';

const Articles = () => {
    return (
        <div  className='ArticlePanel'>
            <SearchArticles/>
            <TopArticles/>
            <AllArticles/>
        </div>
    );
}

const SearchArticles = () => {
    return (
        <div className='SearchArticleContainer'>
            <div className='Title' id='ArticleTitle'>
                Explore Our Articles: Find Your Desired
                Topics Here
            </div>
            <div className='SearchContainer'>
                <input type="text" placeholder='Search any topic (e.g. Politics) ' className='Search'/>
            </div>
            <img src={Books} alt="" className='Books'/>
        </div>
    );
}

const TopArticles = () => {
    const [articles, setArticles] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        const fetchArticles = async () => {
            // Fetches the API
            const response = await fetch('/api/articles/top')
            const json = await response.json()

            if (response.ok) {
                // setArticles(json)                                                   // Real way to set articles
                const duplicatedArticles = Array.from({ length: 7 }, () => [...json]); // duplicated way to test scrolling
                const combinedArticles = [].concat(...duplicatedArticles);
                setArticles(combinedArticles);
            }
        }

        fetchArticles()
    }, [])

    return (
        <div className='TopArticlesContainer'>
            <div className='Title' id='PanelTwoTitle'>
                Top Articles
                <img src={Arrow} alt="" className='Arrow'/>
            </div>
            <div className='Subtext' id='PanelTwoSubtext'>
                Read into the articles that people are talking
                about more.
            </div>
            <div className='BoxContainer'>
                <div className='BoxRow'>
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className='Box' style={{ visibility: articles && articles[(currentPage - 1) * 8 + index] ? '' : 'hidden' }}>
                            {articles && articles[(currentPage - 1) * 8 + index] && <ArticleDetails article={articles[(currentPage - 1) * 8 + index]} />}
                        </div>
                    ))}
                </div>
                <div className='BoxRow'>
                    {[4, 5, 6, 7].map((index) => (
                        <div key={index} className='Box' style={{ visibility: articles && articles[(currentPage - 1) * 8 + index] ? '' : 'hidden' }}>
                            {articles && articles[(currentPage - 1) * 8 + index] && <ArticleDetails article={articles[(currentPage - 1) * 8 + index]} />}
                        </div>
                    ))}
                </div>
            </div>
            <PageScroll currentPage={currentPage} setCurrentPage={setCurrentPage} articles={articles}/>
        </div>
    )
}

const AllArticles = () => {
    const [articles, setArticles] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        const fetchArticles = async () => {
            // Fetches the API
            const response = await fetch('/api/articles/recent')
            const json = await response.json()

            if (response.ok) {
                // setArticles(json)                                                   // Real way to set articles
                const duplicatedArticles = Array.from({ length: 7 }, () => [...json]); // duplicated way to test scrolling
                const combinedArticles = [].concat(...duplicatedArticles);
                setArticles(combinedArticles);
            }
        }

        fetchArticles()
    }, [])

    return (
        <div className='AllArticlesContainer'>
            <div className='Title' id='PanelThreeTitle'>
                All Articles
                <img src={Arrow} alt="" className='Arrow'/>
            </div>
            <div className='Subtext' id='PanelThreeSubtext'>
                Read into any article, ordered from most recent to
                least.
            </div>
            <div className='BoxContainer'>
                <div className='BoxRow'>
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className='Box' style={{ visibility: articles && articles[(currentPage - 1) * 8 + index] ? '' : 'hidden' }}>
                            {articles && articles[(currentPage - 1) * 8 + index] && <ArticleDetails article={articles[(currentPage - 1) * 8 + index]} />}
                        </div>
                    ))}
                </div>
                <div className='BoxRow'>
                    {[4, 5, 6, 7].map((index) => (
                        <div key={index} className='Box' style={{ visibility: articles && articles[(currentPage - 1) * 8 + index] ? '' : 'hidden' }}>
                            {articles && articles[(currentPage - 1) * 8 + index] && <ArticleDetails article={articles[(currentPage - 1) * 8 + index]} />}
                        </div>
                    ))}
                </div>
            </div>
            <PageScroll currentPage={currentPage} setCurrentPage={setCurrentPage} articles={articles}/>
        </div>
    )
}

export default Articles;