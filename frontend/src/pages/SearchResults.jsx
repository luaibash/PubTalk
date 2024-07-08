import {React} from 'react';
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
                {userSearch}
            </div>
        </div>
    )
}

export default SearchResults;