import {React, useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite';
import PageScroll from '../components/PageScroll';
import ArticleDetails from '../components/ArticleDetails';
import Genres from '../components/Genres';
import Arrow from '../assets/home/Arrow.png';
import GenreSuggestionIcon from '../assets/articles/ArticleSuggestionIcon.svg';
import '../styles/App.css';
import '../styles/Articles.css';
import '../styles/Boxes.css';

// Initialize Algolia client, grabbing credentials from .env file
const algoliaClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);

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
    const [searchResults, setSearchResults] = useState([]);             // Holds contents of the search results
    const [showSearchBox, setShowSearchBox] = useState(false);          // Holds whether to show the search box or not
    const [showSearchResults, setShowSearchResults] = useState(false);  // Holds whether to show search results or the initial suggestions
    const searchBarRef = useRef(null);                                  // Reference of the search bar
    const searchResultsRef = useRef(null);                              // Reference of the search results box

    // Search suggestion variables. Held in parent component to maintain memory when component gets mounted/unmounted
    const [randomArticles, setRandomArticles] = useState(null);         // Holds the random articles for the search suggestions
    const [randomAuthors, setRandomAuthors] = useState(null);           // Holds the random authors for the search suggestions
    const [randomGenres, setRandomGenres] = useState(null);             // Holds the random genres for the search suggestions

    // Activates when user focuses on the search bar
    const handleSearchFocus = (e) => {
        setShowSearchBox(true);
    }

    // Activates when users inputs a search in the search bar, updating userSearch
    const handleSearch = (e) => {
        setUserSearch(e.target.value);
    }

    // Used to track every click and close the search box if user clicks anywhere excluding the search bar and search box itself
    useEffect(() => {
        // Triggers every click and checks the reference for the search box to see if the event (click) was in the search box
        const handleClickOutside = (e) => {
            if (searchBarRef.current && !searchBarRef.current.contains(e.target) && searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
                setShowSearchBox(false);
            }
        };

        // Add event listener to trigger useEffect on any click
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Searches database for results on user search, returns results
    useEffect(() =>{
        // If the search box is being shown, proceed
        if (showSearchBox) {
            // If search is not empty, execute algolia search query and return results
            if (userSearch) {
                // Perform search with all indexes
                algoliaClient.multipleQueries([
                    { indexName: 'articles', query: userSearch },
                    { indexName: 'authors', query: userSearch },
                    { indexName: 'genres', query: userSearch }
                ]).then(({ results }) => {
                    // Combine results from all indexes and calculate a relevance score
                    const combinedSearchResults = results.flatMap((result, index) => {
                        return result.hits.map((hit, hitIndex) => ({
                            ...hit,
                            relevance: result.processingTimeMS + hitIndex, // Processing time of index + the ranking of entry in index
                            objectType: result.index                       // Stores Index name to know what type of result it is      
                        }));
                    });

                    // If there are no search results, still show the search results
                    if (combinedSearchResults.length === 0) setShowSearchResults(true);
                    else setShowSearchResults(false);

                    // Sort combined results by relevance score, limit it to a max of 6 search results, and set it to searchResults
                    combinedSearchResults.sort((a, b) => a.relevance - b.relevance);
                    setSearchResults(combinedSearchResults.slice(0, 6));
                    console.log(combinedSearchResults)
                }).catch(err => {
                    console.error('Error searching Algolia:', err);
                });
            }
            
            // If search is empty, empty out search results and show suggested results
            else {
                setSearchResults([]);
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
                <input type="text" value={userSearch} onChange={handleSearch} onFocus={handleSearchFocus} placeholder='What are you looking for?' className='Search' ref={searchBarRef}/>
                <div className='SearchResults' id={showSearchBox ? 'ShowSearchResults' : "HideSearchResults"} ref={searchResultsRef}>
                {searchResults.length != 0 || showSearchResults ? 
                    <SearchResults searchResults={searchResults}/> 
                    : 
                    <SearchSuggestions 
                        randomArticles={randomArticles} 
                        setRandomArticles={setRandomArticles} 
                        randomAuthors={randomAuthors} 
                        setRandomAuthors={setRandomAuthors} 
                        randomGenres={randomGenres}
                        setRandomGenres={setRandomGenres}
                    />
                }
                </div>
            </div>
            <div className='SearchBackground'/>
        </div>
    );
}

// Search results that show when user has input a search into the search bar
const SearchResults = ({searchResults}) => {
    // Maps out all search results and uses the corresponding component for it result type
    return (
        <div className='SearchResultsContainer'>
            {searchResults.map(result => {
                if (result.objectType === 'articles') {
                    return <ArticleSuggestion key={result.objectID} article={result}/>;
                } else if (result.objectType === 'authors') {
                    return <AuthorSuggestion key={result.objectID} author={result}/>;
                } else if (result.objectType === 'genres') {
                    return <GenreSuggestion key={result.objectID} genre={result.genre}/>;
                } else {
                    return null;
                }
            })}
        </div>
    )
}

// Search results that show when user is focused on search bar but has not input a search yet
const SearchSuggestions = ({randomArticles, setRandomArticles, randomAuthors, setRandomAuthors, randomGenres, setRandomGenres}) => {
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

        // Get 2 random genres from the available genres
        const getRandomGenres = async () => {
            const genres = ["Technology", "Art", "History", "Society", "Cooking", "AI", "Business", 
                            "Design", "Innovation", "Ethics", "War", "Sustainability", "Climate", 
                            "Sports", "Entertainment", "Mystery", "Fantasy", "Adventure"];
            
            // Use Math.random() to get random indexes and make sure they aren't the same
            var firstGenre = genres[(Math.floor(Math.random() * genres.length))];
            var secondGenre = genres[(Math.floor(Math.random() * genres.length))];
            if (firstGenre === secondGenre) {
                if (secondGenre === genres.length) secondGenre -= 1;
                else secondGenre += 1;
            }

            setRandomGenres([firstGenre, secondGenre]);
        }

        // Only fetch when random articles/authors/genres haven't been initialized yet, which is when page is first loaded
        if (!randomArticles) fetchRandomArticles();
        if (!randomAuthors) fetchRandomAuthors();
        if (!randomGenres) getRandomGenres();
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
                {randomGenres && <GenreSuggestion genre={randomGenres[0]}/>}
                {randomGenres && <GenreSuggestion genre={randomGenres[1]}/>}
            </div>
        </div>
    )
}

// An article suggestion given in the initial search box before the user searches anything
const ArticleSuggestion = ({ article }) => {
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
const GenreSuggestion = ({ genre }) => {
    return (
        <div className='GenreSuggestion'>
            <img src={GenreSuggestionIcon} alt="Article Suggestion Icon" className='GenreSuggestionIcon' />
            <div className='GenreSuggestionDetails'>
                <div className='SuggestionName'>
                    {genre}
                </div>
                <div className='SuggestionGenre'>
                    Genre
                </div>
            </div>
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