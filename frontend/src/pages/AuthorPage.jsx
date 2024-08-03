import {React, useState, useEffect, useRef} from 'react';
import NotFound from './NotFound';
import ArticleResult from '../components/ArticleResult';
import PageScroll from '../components/PageScroll';
import '../styles/AuthorGenrePage.css';

// Author page that show a description of the author and their articles
const AuthorPage = () => {
    const [author, setAuthor] = useState(null);
    const [notFound, setNotFound] = useState(false);

    // Grab author id from link
    const queryParams = new URLSearchParams(window.location.search);
    const authorID = queryParams.get('id');

    // Fetches the API and finds author using its id
    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await fetch(`/api/authors/id/${authorID}`);
            const json = await response.json();

            if (response.ok) setAuthor(json);
            else setNotFound(true);
        }

        fetchAuthor()
    }, [authorID])

    // If link does not exist, show not found page
    if (notFound) return <NotFound/>;

    // If author has not rendered yet, fill it with a blank page with space so it doesn't snap user to top. This is because if we return nothing, only the footer will show and the page will be very small height, automatically snapping user to top of page    
    else if (!author) return <div className='LoadingPage'/>

    else return (
        <div className='AuthorGenrePagePanel'>
            <div className='AuthorPageInfoContainer'>
                <div className='AuthorPageNameAndDescription'>
                    <div className='AuthorGenrePageName'>
                        {author.name} - {author.role}
                    </div>
                    <div className='AuthorGenrePageDescription'>
                        {author.description}
                    </div>
                </div>
                <div className='AuthorPagePicture'/>
                <div className='AuthorPageInfoDivider'/>
            </div>
            <AuthorArticles authorName={author.name}/>
        </div>
    )
}

// A list of articles made by the author
const AuthorArticles = ({ authorName }) => {
    const [articles, setArticles] = useState(null);
    const [numberOfArticles, setNumberOfArticles] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    // Create a ref to scroll to on page switch
    const articlesTitleRef = useRef(null);

    // Fetches the API and finds articles from the author
    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch(`/api/articles/author/${authorName}`);
            const json = await response.json();

            if (response.ok) {
                setArticles(json);
                setNumberOfArticles(json.length)
            }
        }

        fetchArticles()
    }, [authorName])

    // Calculate the articles to display for the current page
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentArticles = (articles) ? articles.slice(startIndex, endIndex) : [];
    
    if (!articles) return <div className='AuthorGenrePageArticlesLoading'/>

    else if (articles.length > 0) return (
        <div className='AuthorGenrePageArticlesContainer'>
            <div className='Title' id='AuthorGenrePageArticlesTitle' ref={articlesTitleRef}>
                Articles By Author
            </div>
            {currentArticles.map(article => {
                return <ArticleResult key={article._id} article={article}/>;
            })}
            <PageScroll currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfResults={numberOfArticles} resultsPerPage={resultsPerPage} scrollRef={articlesTitleRef}/>
        </div>
    )
}

export default AuthorPage;