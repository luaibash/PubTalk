import {React, useState, useEffect, useRef} from 'react';

// Articles page that lets user search for articles, and see articles from most recent/popular/genre
const SearchBar = () => {
    return (
        <div  className='ArticlePanel'>
            <SearchArticles/>
            <TopArticles/>
            <AllArticles/>
            <ArticleGenres/>
        </div>
    );
}

export default SearchBar;