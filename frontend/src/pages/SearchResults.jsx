import {React, useEffect} from 'react';
import '../styles/SearchResults.css';

// Search results page that show all results for user after a search
const SearchResults = () => {
    // Grab userSearch from link
    const queryParams = new URLSearchParams(window.location.search);
    const userSearch = queryParams.get('userSearch');

    useEffect(() => {
        console.log(userSearch)
    }, [])

    return (
        <div className='SearchResultsPanel'>
            {userSearch}
        </div>
    )
}

export default SearchResults;