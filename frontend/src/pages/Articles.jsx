import {React, useState, useEffect} from 'react';
import '../styles/Articles.css';
import '../styles/Boxes.css';
import Books from '../assets/articles/books.png';
import Arrow from '../assets/home/Arrow.png';
import PageScroll from '../components/PageScroll';
import ArticleDetails from '../components/ArticleDetails';
import Genres from '../components/Genres';

const Articles = () => {
    return (
        <div  className='ArticlePanel'>
            <SearchArticles/>
            <TopArticles/>
            <AllArticles/>
            <ArticleGenres/>
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
            <div className='divider'></div>
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

const ArticleGenres = () => {
    const [genre, setGenre] = useState('Technology');
    const [articles, setArticles] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        const fetchArticles = async () => {
            // Fetches the API
            const response = await fetch('/api/articles/genre/' + genre);
            const json = await response.json();

            if (response.ok) {
                // setArticles(json)                                                   // Real way to set articles
                const duplicatedArticles = Array.from({ length: 7 }, () => [...json]); // duplicated way to test scrolling
                const combinedArticles = [].concat(...duplicatedArticles);
                setArticles(combinedArticles);
            }
        }

        fetchArticles();
    }, [genre])

    return (
        <div className='ArticleGenresContainer'>
            <div className='divider'></div>
            <div className='Title' id='GenresTitle'>
                Explore Different Genres:
                <span className='RevolvingWordsContainer'>
                    <span className='RevolvingWord' style={{color: 'rgb(75, 81, 170)'}}>Technology.</span>
                    <span className='RevolvingWord' style={{color: 'rgb(168, 169, 189)'}}>Economics.</span>
                    <span className='RevolvingWord' style={{color: 'rgb(102, 201, 63)'}}>Science.</span>
                    <span className='RevolvingWord' style={{color: 'rgb(236, 86, 131)'}}>Education.</span>
                    <span className='RevolvingWord' style={{color: 'rgb(75, 81, 170)'}}>Technology.</span>
                </span>
            </div>
            <div className='ArticlesAndGenresContainer'>
                <div className='GenreArticles'>
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className='GenreBox' id={index !== 7 ? 'BoxTop' : ''} style={{ display: articles && articles[(currentPage - 1) * 4 + index] ? '' : 'none' }}>
                            {articles && articles[(currentPage - 1) * 4 + index] && <ArticleDetails article={articles[(currentPage - 1) * 4 + index]} genreArticle={true} articlesPerPage={4}/>}
                        </div>
                    ))}
                </div>
                <div className='Genres'>
                    <div className='CurrentGenre'>
                        Current Genre: &nbsp; <span style={{color: 'rgb(90, 169, 172)'}}>{genre}</span>
                    </div>
                    <Genres genre={genre} setGenre={setGenre}/>
                </div>
            </div>
            <PageScroll currentPage={currentPage} setCurrentPage={setCurrentPage} articles={articles} articlesPerPage={4}/>
        </div>
    )
}

export default Articles;