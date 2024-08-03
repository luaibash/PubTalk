import {React, useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import NotFound from './NotFound';
import ArticleResult from '../components/ArticleResult';
import PageScroll from '../components/PageScroll';
import GenreIcon from '../assets/articles/GenreIcon.svg';
import '../styles/AuthorGenrePage.css';

// Genre page that shows a description of the genre and its articles
const GenrePage = () => {
    const [genreObject, setGenreObject] = useState(null);
    const [notFound, setNotFound] = useState(false);

    // Grabs the current genre from the link
    const { genre } = useParams();

    // Fetches the API and finds genre using its name
    useEffect(() => {
        const fetchGenre = async () => {
            const response = await fetch(`/api/genres/name/${genre}`);
            const json = await response.json();

            if (response.ok) setGenreObject(json);
            else setNotFound(true);
        }
        
        fetchGenre();
    }, [genre])

    // If link does not exist, show not found page
    if (notFound) return <NotFound/>;

    // If genre has not rendered yet, fill it with a blank page with space so it doesn't jerk during loading
    else if (!genreObject) return <div className='LoadingPage'/>

    else return (
        <div className='AuthorGenrePagePanel'>
            <div className='GenrePageInfoContainer'>
                <div className='GenrePageNameAndDescription'>
                    <div className='GenrePageName'>
                        {genreObject.genre}
                    </div>
                    <div className='AuthorGenrePageDescription'>
                        {genreObject.description}
                    </div>
                </div>
                <img src={GenreIcon} alt="GenreIcon" className='GenrePagePicture'/>
                <div className='GenrePageInfoDivider'/>
            </div>
            <GenreArticles genre={genreObject.genre}/>
        </div>
    )
}

// A list of articles in the specified genre
const GenreArticles = ({ genre }) => {
    const [articles, setArticles] = useState(null);
    const [numberOfArticles, setNumberOfArticles] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    // Create a ref to scroll to on page switch
    const articlesTitleRef = useRef(null);

    // Fetches the API and finds articles from the genre
    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch(`/api/articles/genre/${genre}`);
            const json = await response.json();

            if (response.ok) {
                setArticles(json)                                                   
                setNumberOfArticles(json.length);
            }
        }

        fetchArticles();
    }, [genre])

    // Calculate the articles to display for the current page
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentArticles = (articles) ? articles.slice(startIndex, endIndex) : [];
    
    if (!articles) return <div className='AuthorGenrePageArticlesLoading'/>

    else if (articles.length == 0) return (
        <div className='AuthorGenrePageArticlesContainer'>
            <div className='Title' id='AuthorGenrePageArticlesTitle' ref={articlesTitleRef}>
                Articles In Genre
            </div>
            <div className='GenrePageNoArticles'>
                    <div className='NoSearchResults'>
                        There are currently no articles under this genre.
                    </div>
                    <li className='NoSearchResultsBullet'> Search for other popular genres. </li>
                    <li className='NoSearchResultsBullet'> Try more general genres.</li>
                    <li className='NoSearchResultsBullet'> Look for most recent and popular articles. </li>
            </div>
        </div>
    )

    else return (
        <div className='AuthorGenrePageArticlesContainer'>
            <div className='Title' id='AuthorGenrePageArticlesTitle' ref={articlesTitleRef}>
                Articles In Genre
            </div>
            {currentArticles.map(article => {
                return <ArticleResult key={article._id} article={article}/>;
            })}
            <PageScroll currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfResults={numberOfArticles} resultsPerPage={resultsPerPage} scrollRef={articlesTitleRef}/>
        </div>
    )
}

export default GenrePage;