import {React, useState, useEffect, useCallback} from 'react';
import {Link, useLocation} from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite';
import SearchBar from '../components/SearchBar';
import ArticleResult from '../components/ArticleResult'
import PageScroll from '../components/PageScroll';
import GenreIcon from '../assets/articles/GenreIcon.svg';
import '../styles/SearchResults.css';

// Initialize Algolia client, grabbing credentials from .env file
const algoliaClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY);

// Search results page that show all results for user after a search
const SearchResults = () => {
    const location = useLocation();                                // Keeps track of current link
    const [searchResults, setSearchResults] = useState(null);      // Holds contents of the search results
    const [searchFilter, setSearchFilter] = useState("all");       // Holds current filter active
    const [numberOfResults, setNumberOfResults] = useState(null);  // Holds total possible number of results
    const [currentPage, setCurrentPage] = useState(1);             // Holds which number page is currently showing
    const [oldPage, setOldPage] = useState(1);                     // Holds old page before new search trigger
    const [oldSearch, setOldSearch] = useState(null);              // Holds old search before new search trigger
    const resultsPerPage = 10;

    // Grab userSearch from link
    const queryParams = new URLSearchParams(window.location.search);
    const userSearch = queryParams.get('userSearch');

    // Perform search with the pubtalk index and set search results
    const runAlgoliaSearch = useCallback((newFilter, newPage) => {
        // Grabs the filter the search is being made on for algolia to use
        const filter = (newFilter === 'all') ? '' : `objectType:${newFilter}`;

        algoliaClient.search([
            {
                indexName: 'pubtalk',
                query: userSearch,
                params: { 
                    hitsPerPage: resultsPerPage, // Number of results to return for one page
                    page: (newPage - 1),         // Sets which page of results to return
                    filters: filter              // Filter results to be of type article/author/genre
                }
            },
        ]).then(({ results }) => {
            setSearchResults(results[0].hits);
            setNumberOfResults(results[0].nbHits);
            console.log("test")
        }).catch(err => {
            console.error('Error searching Algolia:', err);
        });
    }, [userSearch, currentPage, resultsPerPage]);

    // When the page has been switched or there is a new user search, run an algolia search
    // searchFilter is not added here as a dependency because if currentPage and filter switch happen at same time, two searches will occur
    // Location added as a dependency to force a new search when a new link has been reached
    useEffect(() => {
        // If new search, set search filter to all and run search on first page
        if (userSearch != oldSearch) {
            setOldSearch(userSearch);
            setOldPage(1);              // Manually setting this value as page has not updated fast enough
            setSearchFilter("all");

            // Run search with manual values as the values have not been updated fast enough
            runAlgoliaSearch("all", 1);
        }

        // If new page, simply run the search
        else if (currentPage != oldPage) {
            setOldPage(currentPage);
            runAlgoliaSearch(searchFilter, currentPage);
        }
    }, [userSearch, currentPage, location, runAlgoliaSearch]);

    // Switch the filter to the one provided, and then run an algolia search
    const switchFilter = (filter) => {
        if (filter === searchFilter) return;

        setSearchFilter(filter);
        if (currentPage === 1) runAlgoliaSearch(filter, currentPage);   // Manually run search here as setting currentPage to same value won't trigger useEffect
        else setCurrentPage(1);                                         // Setting currentPage to one here will trigger the useEffect
    }

    return (
        <div className='SearchResultsPanel'>
            <div className='Title' id="SearchResultsTitle">
                <div> Search Results for&nbsp;</div>
                <div className='SearchResultsTitleSearch'>
                    {userSearch}
                </div>
            </div>
            <div className='SearchBarContainer'>
                <SearchBar showSearchSuggestions={false} initialSearch={userSearch} searchContainerCentred={false}/> 
            </div>
            <div className='SearchResultsFilterContainer'>
                <div className='SearchResultFilter' id={searchFilter === "all" ? "SearchResultFilterActive" : ""} onClick={() => switchFilter("all")}>
                    All
                </div>
                <div className='SearchResultFilter' id={searchFilter === "article" ? "SearchResultFilterActive" : ""} onClick={() => switchFilter("article")}>
                    Articles
                </div>
                <div className='SearchResultFilter' id={searchFilter === "author" ? "SearchResultFilterActive" : ""} onClick={() => switchFilter("author")}>
                    Authors
                </div>
                <div className='SearchResultFilter' id={searchFilter === "genre" ? "SearchResultFilterActive" : ""} onClick={() => switchFilter("genre")}>
                    Genres
                </div>
                <div className='ActiveFilterBorder' id={searchFilter === "all" ? "AllBorder" : (searchFilter === "article" ? "ArticlesBorder" : (searchFilter === "author" ? "AuthorsBorder" : "GenresBorder"))}/>
            </div>
            {searchResults && searchResults.length === 0 ? (
                <div className='NoSearchResultsContainer'>
                    <div className='NoSearchResults'>
                    Your search did not match any results.
                    </div>
                    <li className='NoSearchResultsBullet'> Make sure all words are spelled correctly. </li>
                    <li className='NoSearchResultsBullet'> Try different keywords. </li>
                    <li className='NoSearchResultsBullet'> Try more general keywords. </li>
                </div>
            ) : (
                searchResults && searchResults.map(result => {
                    if (result.objectType === 'article') {
                        return <ArticleResult key={result.objectID} article={result}/>;
                    } else if (result.objectType === 'author') {
                        return <AuthorResult key={result.objectID} author={result}/>;
                    } else if (result.objectType === 'genre') {
                        return <GenreResult key={result.objectID} genre={result}/>;
                    } else {
                        return null;
                    }
                })
            )}
            {numberOfResults > 0 && (
                <PageScroll currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfResults={numberOfResults} resultsPerPage={resultsPerPage} scrollToTop={true} filter={searchFilter}/>
            )}
        </div>
    )
}

const AuthorResult = ({ author }) => {
    const authorLink = author.name.replace(/[^\w\s]/g, '').replace(/\s+/g, '-');  // Grab author link

    // Takes the first two genres and returns a string to display for the article
    const formatGenres = (genres) => {
        if (genres.length === 0) return "General";       // If array is empty, return general genre
        else if (genres.length === 1) return genres[0];   // If there is only one genre, return it
        else return `${genres[0]}, ${genres[1]}`;         // If there are two or more genres, format and return the first two
    }

    return (
        <div className='AuthorResult'>
            <div className='AuthorResultContentContainer'>
                <Link to={`/authors/${authorLink}?id=${encodeURIComponent(author._id)}`} className='AuthorResultContent'>
                    <div className='AuthorResultPictureContainer'>
                        <div className='AuthorResultPicture'/>
                    </div>
                    <div className='AuthorResultDetails'>
                        <div className='AuthorResultTitle'>
                            {author.name} - {author.role}
                        </div>
                        <div className='AuthorResultDescription'>
                            {author.description}
                        </div>
                        <div className='AuthorResultOther'>
                            <div>
                                {formatGenres(author.favourite_genres)}
                            </div>
                            <div>
                                {author.school}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

const GenreResult = ({ genre }) => {
    const [genreCount, setGenreCount] = useState();

    // Retrieve the author object from the DB based on the author name
    useEffect(() => {
        const fetchGenreCount = async () => {
            const response = await fetch(`/api/articles/count/${genre.genre}`);
            const json = await response.json();

            if (response.ok) setGenreCount(json);
        }

        if (genre) fetchGenreCount();
    }, [genre]);

    return (
        <div className='GenreResult'>
            <div className='GenreResultContentContainer'>
                <Link to={`/genres/${genre.genre}`} className='GenreResultContent'>
                    <div className='GenreResultIconContainer'>
                        <img src={GenreIcon} alt="Genre Icon" className='GenreResultIcon'/>
                    </div>
                    <div className='GenreResultDetails'>
                        <div className='GenreResultTitle'>
                            {genre.genre}
                        </div>
                        <div className='GenreResultOther'>
                            <div>
                                Genre
                            </div>
                            {genreCount && genreCount.count !== undefined && (
                                <div>
                                    {genreCount.count} {genreCount.count === 1 ? 'article' : 'articles'}
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SearchResults;