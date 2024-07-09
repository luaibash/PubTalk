import {React, useState, useEffect} from 'react';
import algoliasearch from 'algoliasearch/lite';
import SearchBar from '../components/SearchBar';
import '../styles/SearchResults.css';

// Initialize Algolia client, grabbing credentials from .env file
const algoliaClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY);

// Search results page that show all results for user after a search
const SearchResults = () => {
    // Holds contents of the search results
    const [searchResults, setSearchResults] = useState([]);

    // Grab userSearch from link
    const queryParams = new URLSearchParams(window.location.search);
    const userSearch = queryParams.get('userSearch');

    // Perform search with the pubtalk index and set search results
    useEffect(() => {
        algoliaClient.search([
            { indexName: 'pubtalk', query: userSearch },
        ]).then(({ results }) => {
            setSearchResults(results);
            console.log(results)
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
            <div>
            </div>
        </div>
    )
}

export default SearchResults;