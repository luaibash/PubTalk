import {React, useState, useEffect} from 'react';
import algoliasearch from 'algoliasearch/lite';
import SearchBar from '../components/SearchBar';
import GenreIcon from '../assets/articles/GenreIcon.svg';
import '../styles/SearchResults.css';

// Initialize Algolia client, grabbing credentials from .env file
const algoliaClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY);

// Search results page that show all results for user after a search
const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);             // Holds contents of the search results
    const [searchFilter, setSearchFilter] = useState("all");

    // Grab userSearch from link
    const queryParams = new URLSearchParams(window.location.search);
    const userSearch = queryParams.get('userSearch');

    // Switches the current search filter to the clicked one, modifying the style to represent the change
    const switchSearchFilter = (filter) => {
        setSearchFilter(filter);
    };

    // Perform search with the pubtalk index and set search results
    useEffect(() => {
        algoliaClient.search([
            { indexName: 'pubtalk', query: userSearch },
        ]).then(({ results }) => {
            setSearchResults(results[0].hits);
            console.log(results);
        }).catch(err => {
            console.error('Error searching Algolia:', err);
        });
    }, []);

    return (
        <div className='SearchResultsPanel'>
            <div className='Title'>
                Search Results
            </div>
            <div className='SearchBarContainer'>
                <SearchBar showSearchSuggestions={false} initialSearch={userSearch} searchContainerCentred={false}/> 
            </div>
            <div className='SearchResultsFilterContainer'>
                <div className='SearchResultFilter' id={searchFilter === "all" ? "SearchResultFilterActive" : ""} onClick={() => switchSearchFilter("all")}>
                    All
                </div>
                <div className='SearchResultFilter' id={searchFilter === "articles" ? "SearchResultFilterActive" : ""} onClick={() => switchSearchFilter("articles")}>
                    Articles
                </div>
                <div className='SearchResultFilter' id={searchFilter === "authors" ? "SearchResultFilterActive" : ""} onClick={() => switchSearchFilter("authors")}>
                    Authors
                </div>
                <div className='SearchResultFilter' id={searchFilter === "genres" ? "SearchResultFilterActive" : ""} onClick={() => switchSearchFilter("genres")}>
                    Genres
                </div>
                <div className='ActiveFilterBorder' id={searchFilter === "all" ? "AllBorder" : (searchFilter === "articles" ? "ArticlesBorder" : (searchFilter === "authors" ? "AuthorsBorder" : "GenresBorder"))}/>
            </div>
            {searchResults.map(result => {
                if (result.objectType === 'article') {
                    return <ArticleResult key={result.objectID} article={result}/>;
                } else if (result.objectType === 'author') {
                    return <AuthorResult key={result.objectID} author={result}/>;
                } else if (result.objectType === 'genre') {
                    return <GenreResult key={result.objectID} genre={result}/>;
                } else {
                    return null;
                }
            })}
        </div>
    )
}

const ArticleResult = ({ article }) => {
    return (
        <div className='ArticleResult'>
            {article.title}
        </div>
    )
}

const AuthorResult = ({ author }) => {
    return (
        <div className='AuthorResult'>
            {author.name}
        </div>
    )
}

const GenreResult = ({ genre }) => {
    return (
        <div className='GenreResult'>
            {genre.genre}
        </div>
    )
}

export default SearchResults;