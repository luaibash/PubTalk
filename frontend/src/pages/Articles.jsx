import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PageScroll from '../components/PageScroll';
import ArticleDetails from '../components/ArticleDetails';
import Genres from '../components/Genres';
import Arrow from '../assets/home/Arrow.png';
import GenreSuggestionIcon from '../assets/articles/ArticleSuggestionIcon.svg';
import '../styles/App.css';
import '../styles/Articles.css';
import '../styles/Boxes.css';

// Articles page that lets user search for articles, and see articles from most recent/popular/genre
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

// Search Articles container that holds the search bar for the user to search articles
const SearchArticles = () => {
    const [userSearch, setUserSearch] = useState("");                   // Holds content of the search bar
    const [showSearchBox, setShowSearchBox] = useState(false);          // Holds whether to show the search box or not
    const [showSearchResults, setShowSearchResults] = useState(false);  // Holds whether to show search results or the initial suggestions

    // Search suggestion variables. Held in parent component to maintain memory when component gets mounted/unmounted
    const [randomArticles, setRandomArticles] = useState(null);         // Holds the random articles for the search suggestions
    const [randomAuthors, setRandomAuthors] = useState(null);           // Holds the random authors for the search suggestions

    // Activates when user focuses on the search bar
    const handleSearchFocus = (e) => {
        setShowSearchBox(true);
    }

    // Activates when user unfocurses on the search bar
    const handleSearchUnfocus = (e) => {
        setShowSearchBox(false);
    }

    // Activates when users inputs a search in the search bar, updating userSearch
    const handleSearch = (e) => {
        setUserSearch(e.target.value);
    }

    // Searches database for results on user search, returns results
    useEffect(() =>{
        // If the search box is being shown, proceed
        if (showSearchBox) {
            // If search is not empty, execute search query and return results
            if (userSearch) {
                setShowSearchResults(true);
            }
            
            // If search is empty, return suggested results
            else {
                setShowSearchResults(false);
            }
        }
    }, [userSearch, showSearchBox])

    return (
        <div className='SearchArticleContainer'>
            <div className='Title' id='SearchTitle'>
                Explore Our Articles: Find Your Desired
                Topics Here
            </div>
            <div className='SearchContainer'>
                <input type="text" value={userSearch} onChange={handleSearch} onFocus={handleSearchFocus} onBlur={handleSearchUnfocus} placeholder='What are you looking for?' className='Search'/>
                <div className='SearchResults' id={showSearchBox ? 'ShowSearchResults' : "ShowSearchResults"}>
                {showSearchResults ? 
                    <SearchResults/> 
                    : 
                    <SearchSuggestions 
                        randomArticles={randomArticles} 
                        setRandomArticles={setRandomArticles} 
                        randomAuthors={randomAuthors} 
                        setRandomAuthors={setRandomAuthors} 
                    />
                }
                </div>
            </div>
            <div className='SearchBackground'/>
        </div>
    );
}

// Search results that show when user is focused on search bar but has not input a search yet
const SearchSuggestions = ({randomArticles, setRandomArticles, randomAuthors, setRandomAuthors}) => {
    // Use effect to fetch the random articles, authors, and genres
    useEffect(() => {
        // Fetches the API to get 2 random articles
        const fetchRandomArticles = async () => {
            const response = await fetch('/api/articles/random?limit=2');
            const json = await response.json();

            if (response.ok) setRandomArticles(json);
        }

        // Fetches the API to get 2 random authors
        const fetchRandomAuthors = async () => {
            const response = await fetch('/api/authors/random?limit=2');
            const json = await response.json();

            if (response.ok) setRandomAuthors(json);
        }

        // Only fetch when random articles/authors/genres haven't been initialized yet, which is when page is first loaded
        if (!randomArticles) fetchRandomArticles();
        if (!randomAuthors) fetchRandomAuthors();
    }, [])

    return (
        <div className='SearchSuggestionsContainer'>
            <div className='ArticleSuggestionsContainer'>
                <div className='SuggestionsTitle'>
                    ARTICLES
                </div>
                <div className='SuggestionsDivider'/>
                {randomArticles && <ArticleSuggestion article={randomArticles[0]}/>}
                {randomArticles && <ArticleSuggestion article={randomArticles[1]}/>}
            </div>
            <div className='AuthorSuggestionsContainer'>
                <div className='SuggestionsTitle'>
                    AUTHORS
                </div>
                <div className='SuggestionsDivider'/>
                {randomAuthors && <AuthorSuggestion author={randomAuthors[0]}/>}
                {randomAuthors && <AuthorSuggestion author={randomAuthors[1]}/>}
            </div>
            <div className='GenreSuggestionsContainer'>
                <div className='SuggestionsTitle'>
                    GENRES
                </div>
                <div className='SuggestionsDivider'/>
                <GenreSuggestion genreName={"Economics"}/>
                <GenreSuggestion genreName={"Politics"}/>
            </div>
        </div>
    )
}

// An article suggestion given in the initial search box before the user searches anything
const ArticleSuggestion = ({ article, articleGenres }) => {
    const articleLink = article.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '-'); // Grab article link

    // Converts the date given by the article to more readable terms
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Takes the first two genres and returns a string to display for the article
    function formatGenres(genres) {
        if (genres.length === 0) return "General";       // If array is empty, return general genre
        else if (genres.length === 1) return genres[0];   // If there is only one genre, return it
        else return `${genres[0]}, ${genres[1]}`;         // If there are two or more genres, format and return the first two
    }

    return (
        <Link to={`/articles/${articleLink}?id=${encodeURIComponent(article._id)}`} className='ArticleSuggestion'>
            <div className='SuggestionName'>
                {article.title}
            </div>
            <div className='SuggestionDetails'>
                {article.author} &#8226; {formatDate(article.createdAt)} &#8226; {formatGenres(article.genre)}
            </div>
        </Link>
    )
}

// An author suggestion given in the initial search box before the user searches anything
const AuthorSuggestion = ({ author }) => {
    return (
        <div className='AuthorSuggestion'>
            <div className='AuthorSuggestionImage'>

            </div>
            <div className='AuthorSuggestionDetails'>
                <div className='SuggestionName'>
                    {author.name}
                </div>
                <div className='SuggestionRole'>
                    {author.role}
                </div>
            </div>
        </div>
    )
}

// A genre suggestion given in the initial search box before the user searches anything
const GenreSuggestion = ({ genreName }) => {
    return (
        <div className='GenreSuggestion'>
            <img src={GenreSuggestionIcon} alt="Article Suggestion Icon" className='GenreSuggestionIcon' />
            <div className='GenreSuggestionDetails'>
                <div className='SuggestionName'>
                    {genreName}
                </div>
                <div className='SuggestionGenre'>
                    Genre
                </div>
            </div>
        </div>
    )
}

// Search results that show when user has input a search into the search bar
const SearchResults = () => {
    return (
        <div>
            Search results
        </div>
    )
}

// Top articles container that shows all the top articles
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

// All articles container that shows most recent articles
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
            <div className='Divider'></div>
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

// Articles genres container that shows articles based on the genre chosen
const ArticleGenres = () => {
    const [genre, setGenre] = useState('Fantasy');
    const [articles, setArticles] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        const fetchArticles = async () => {
            // Fetches the API
            const response = await fetch(`/api/articles/genre/${genre}`);
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
            <div className='Divider'></div>
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
                    {articles && articles.length === 0 &&
                    <div className='GenreEmpty'>
                        There are currently no articles under this genre.
                    </div>
                    }
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