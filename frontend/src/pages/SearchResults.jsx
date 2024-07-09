import {React} from 'react';
import SearchBar from '../components/SearchBar';
import '../styles/SearchResults.css';

// Search results page that show all results for user after a search
const SearchResults = () => {
    // Grab userSearch from link
    const queryParams = new URLSearchParams(window.location.search);
    const userSearch = queryParams.get('userSearch');

    return (
        <div className='SearchResultsPanel'>
            <div className='Title'>
                Search Results
            </div>
            <div className='SearchBarContainer'>
                <SearchBar showSearchSuggestions={false} initialSearch={userSearch} searchContainerCentred={false}/> 
            </div>
        </div>
    )
}

export default SearchResults;