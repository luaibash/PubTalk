import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite';
import SearchBar from '../components/SearchBar';
import GenreIcon from '../assets/articles/GenreIcon.svg';
import '../styles/SearchResults.css';

// Initialize Algolia client, grabbing credentials from .env file
const algoliaClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY);

// Search results page that show all results for user after a search
const SearchResults = () => {
    const [searchResults, setSearchResults] = useState();    // Holds contents of the search results
    const [searchFilter, setSearchFilter] = useState("all"); // Holds current filter active

    // Grab userSearch from link
    const queryParams = new URLSearchParams(window.location.search);
    const userSearch = queryParams.get('userSearch');

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
    }, [userSearch]);

    // Filter results based on the current searchFilter only after algolia returns search results
    const filteredResults = searchResults && searchResults.filter(result => {
        if (!searchResults) return true;
        else if (searchFilter === 'all') return true;
        return result.objectType === searchFilter;
    });

    return (
        <div className='SearchResultsPanel'>
            <div className='Title'>
                Search Results
            </div>
            <div className='SearchBarContainer'>
                <SearchBar showSearchSuggestions={false} initialSearch={userSearch} searchContainerCentred={false}/> 
            </div>
            <div className='SearchResultsFilterContainer'>
                <div className='SearchResultFilter' id={searchFilter === "all" ? "SearchResultFilterActive" : ""} onClick={() => setSearchFilter("all")}>
                    All
                </div>
                <div className='SearchResultFilter' id={searchFilter === "article" ? "SearchResultFilterActive" : ""} onClick={() => setSearchFilter("article")}>
                    Articles
                </div>
                <div className='SearchResultFilter' id={searchFilter === "author" ? "SearchResultFilterActive" : ""} onClick={() => setSearchFilter("author")}>
                    Authors
                </div>
                <div className='SearchResultFilter' id={searchFilter === "genre" ? "SearchResultFilterActive" : ""} onClick={() => setSearchFilter("genre")}>
                    Genres
                </div>
                <div className='ActiveFilterBorder' id={searchFilter === "all" ? "AllBorder" : (searchFilter === "article" ? "ArticlesBorder" : (searchFilter === "author" ? "AuthorsBorder" : "GenresBorder"))}/>
            </div>
            {filteredResults && filteredResults.length === 0 ? (
                <div className='NoSearchResultsContainer'>
                    <div className='NoSearchResults'>
                    Your search did not match any results.
                    </div>
                    <li className='NoSearchResultsBullet'> Make sure all words are spelled correctly. </li>
                    <li className='NoSearchResultsBullet'> Try different keywords. </li>
                    <li className='NoSearchResultsBullet'> Try more general keywords. </li>
                </div>
            ) : (
                filteredResults && filteredResults.map(result => {
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
        </div>
    )
}

const ArticleResult = ({ article }) => {
    const imageFolder = (article) ? article.title.replace(/[^a-zA-Z0-9]/g, '') : ""; // Grabs name of folder for specified article
    const articleLink = article.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '-');  // Grab article link
    const [author, setAuthor] = useState(null);

    // Retrieve the author object from the DB based on the author name
    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await fetch(`/api/authors/name/${article.author}`);
            const json = await response.json();

            if (response.ok) setAuthor(json);
        }

        if (article) fetchAuthor();
    }, [article]);

    // Converts the date given by the article to more readable terms
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    return (
        <div className='ArticleResult'>
            <div className='ArticleResultAuthorContainer'>
                <Link to={'/'} className='ArticleResultAuthorPicture'/>
                {author &&  <Link to={'/'} className='ArticleResultAuthorName'>{author.name}</Link>}
                {author && <div className='ArticleResultAuthorRole'>&nbsp;- {author.role}</div>}
            </div>
            <div className='ArticleResultContentContainer'>
                <Link to={`/articles/${articleLink}?id=${encodeURIComponent(article._id)}`} className='ArticleResultContent'>
                    <img src={require(`../assets/articleImages/${imageFolder}/Cover.png`)} alt="Article Cover" className='ArticleResultsCover'/>
                    <div className='ArticleResultDetails'>
                        <div className='ArticleResultTitle'>
                            {article.title}
                        </div>
                        <div className='ArticleResultDescription'>
                            {article.description}
                        </div>
                        <div className='ArticleResultOther'>
                            <div>
                                {formatDate(article.createdAt)}
                            </div>
                            <div>
                                {formatGenres(article.genre)}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

const AuthorResult = ({ author }) => {
    return (
        <div className='AuthorResult'>
            <div className='AuthorResultContentContainer'>
                <Link to={`/`} className='AuthorResultContent'>
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
                <Link to={`/`} className='GenreResultContent'>
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

// Takes the first two genres and returns a string to display for the article
function formatGenres(genres) {
    if (genres.length === 0) return "General";       // If array is empty, return general genre
    else if (genres.length === 1) return genres[0];   // If there is only one genre, return it
    else return `${genres[0]}, ${genres[1]}`;         // If there are two or more genres, format and return the first two
}

export default SearchResults;