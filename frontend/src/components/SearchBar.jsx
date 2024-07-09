import {React, useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite';
import SearchIcon from '../assets/articles/Search.svg'
import GenreSuggestionIcon from '../assets/articles/ArticleSuggestionIcon.svg';
import '../styles/App.css';
import '../styles/components/SearchBar.css';

// Initialize Algolia client, grabbing credentials from .env file
const algoliaClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY);

// Search bar that lets users search for what they want
const SearchBar = ({showSearchSuggestions, initialSearch = "", searchContainerCentred}) => {
    const [userSearch, setUserSearch] = useState(initialSearch);        // Holds content of the search bar
    const [searchResults, setSearchResults] = useState([]);             // Holds contents of the search results
    const [showSearchBox, setShowSearchBox] = useState(false);          // Holds whether to show the search box or not
    const [showSearchResults, setShowSearchResults] = useState(false);  // Holds whether to show search results or the initial suggestions
    const searchBarRef = useRef(null);                                  // Reference of the search bar
    const searchResultsRef = useRef(null);                              // Reference of the search results box

    // Search suggestion variables. Held in parent component to maintain memory when component gets mounted/unmounted
    const [randomArticles, setRandomArticles] = useState(null);         // Holds the random articles for the search suggestions
    const [randomAuthors, setRandomAuthors] = useState(null);           // Holds the random authors for the search suggestions
    const [randomGenres, setRandomGenres] = useState(null);             // Holds the random genres for the search suggestions

    // Navigate variable initialized to navigate pages
    const navigate = useNavigate();

    // Activates when user focuses on the search bar
    const handleSearchFocus = (e) => {
        setShowSearchBox(true);
    }

    // Activates when users inputs a search in the search bar, updating userSearch
    const handleSearch = (e) => {
        setUserSearch(e.target.value);
    }

    // Activates when the user presses enter, redirecting to the search results page
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const encodedUserSearch = encodeURIComponent(userSearch).replace(/%20/g, '+');
            navigate(`/search?userSearch=${encodedUserSearch}`);
        }
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
                // Perform search with the pubtalk index
                algoliaClient.search([
                    { indexName: 'pubtalk', query: userSearch },
                ]).then(({ results }) => {
                    // Take the first 6 search results and set it to searchResults
                    const slicedSearchResults = results[0].hits.slice(0, 6);

                    // If there are no search results, still show the search results
                    if (slicedSearchResults.length === 0) setShowSearchResults(true);
                    else setShowSearchResults(false);

                    // Set it to searchResults
                    setSearchResults(slicedSearchResults);
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
        <div className='SearchContainer' id={searchContainerCentred ? "SearchContainerCentred" : ""}>
            <input type="text" value={userSearch} onChange={handleSearch} onFocus={handleSearchFocus} onKeyDown={handleKeyDown} placeholder='What are you looking for?' className='Search' ref={searchBarRef}/>
            <div className='SearchResults' id={showSearchBox ? 'ShowSearchResults' : "HideSearchResults"} ref={searchResultsRef}>
            {searchResults.length !== 0 || showSearchResults ? 
                <SearchResults searchResults={searchResults} userSearch={userSearch}/> 
                :
                (showSearchSuggestions ?
                    <SearchSuggestions 
                    randomArticles={randomArticles} 
                    setRandomArticles={setRandomArticles} 
                    randomAuthors={randomAuthors} 
                    setRandomAuthors={setRandomAuthors} 
                    randomGenres={randomGenres}
                    setRandomGenres={setRandomGenres}
                    />
                    :
                    null
                )
            }
            </div>
        </div>
    );
}

// Search results that show when user has input a search into the search bar
const SearchResults = ({searchResults, userSearch}) => {
    // encode userSearch so that symbols like & will work. Replace spaces with + for link
    const encodedUserSearch = encodeURIComponent(userSearch).replace(/%20/g, '+');

    // Maps out all search results and uses the corresponding component for it result type
    return (
        <div className={searchResults.length !== 0 ? 'SearchResultsContainer' : 'EmptySearchResultsContainer'}>
            <Link to={`/search?userSearch=${encodedUserSearch}`} className='PromptSearchContainer' id={searchResults.length !== 0 ? '' : 'EmptyPromptSearchContainer'}>
                <img src={SearchIcon} alt="Search Icon" className='SearchIcon'/>
                <div className='PromptSearchName'>
                    {userSearch}
                    <span className='GraySearch'> &nbsp;-&nbsp; Search</span>
                </div>
            </Link>
            {searchResults.map(result => {
                if (result.objectType === 'article') {
                    return <ArticleSuggestion key={result.objectID} article={result}/>;
                } else if (result.objectType === 'author') {
                    return <AuthorSuggestion key={result.objectID} author={result}/>;
                } else if (result.objectType === 'genre') {
                    return <GenreSuggestion key={result.objectID} genre={result}/>;
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
            const response = await fetch('/api/articles/random/articles?limit=2');
            const json = await response.json();

            if (response.ok) setRandomArticles(json);
        }

        // Fetches the API to get 2 random authors
        const fetchRandomAuthors = async () => {
            const response = await fetch('/api/authors/random?limit=2');
            const json = await response.json();

            if (response.ok) setRandomAuthors(json);
        }

        // Fetches the API to get 2 random genres
        const fetchRandomGenres = async () => {
            const response = await fetch('/api/articles/random/genres?limit=2');
            const json = await response.json();

            if (response.ok) setRandomGenres(json);
        }

        // Only fetch when random articles/authors/genres haven't been initialized yet, which is when page is first loaded
        if (!randomArticles) fetchRandomArticles();
        if (!randomAuthors) fetchRandomAuthors();
        if (!randomGenres) fetchRandomGenres();
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
                    {genre.genre}
                </div>
                <div className='SuggestionGenre'>
                    Genre
                </div>
            </div>
        </div>
    )
}

export default SearchBar;