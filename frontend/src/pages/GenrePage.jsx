import {React, useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import NotFound from './NotFound';
import ArticleResult from '../components/ArticleResult';
import PageScroll from '../components/PageScroll';
import '../styles/GenrePage.css';

// Genre page that shows a description of the genre and its articles
const GenrePage = () => {
    const [genreObject, setGenreObject] = useState(null);
    const [notFound, setNotFound] = useState(false);

    // Grabs the current genre from the link
    const { genre } = useParams();

    // Fetches the API and finds genre using its name
    useEffect(() => {
        const fetchGenre = async () => {
            const response = await fetch(`/api/genres/name/${genre}`);
            const json = await response.json();

            if (response.ok) setGenreObject(json);
            else setNotFound(true);
        }
        
        fetchGenre();
    }, [genre])

    // If link does not exist, show not found page
    if (notFound) return <NotFound/>;

    // If author has not rendered yet, fill it with a blank page with space so it doesn't snap user to top. This is because if we return nothing, only the footer will show and the page will be very small height, automatically snapping user to top of page    
    else if (!genreObject) return <div className='LoadingPage'/>

    else return (
        <div className='AuthorPagePanel'>
            <div className='AuthorPageInfoContainer'>
                <div className='AuthorPageNameAndDescription'>
                    <div className='AuthorPageName'>
                        {genreObject.genre}
                    </div>
                    <div className='AuthorPageDescription'>
                        {genreObject.description}
                    </div>
                </div>
                <div className='AuthorPagePicture'/>
                <div className='AuthorPageInfoDivider'/>
            </div>
            {/* <AuthorArticles authorName={author.name}/> */}
        </div>
    )
}

// A list of articles in the specified genre
// const GenreArticles = ({ genre }) => {
//     const [articles, setArticles] = useState(null);
//     const [numberOfArticles, setNumberOfArticles] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const resultsPerPage = 10;

//     // Create a ref to scroll to on page switch
//     const articlesTitleRef = useRef(null);

//     // Fetches the API and finds articles from the genre
//     useEffect(() => {
//         const fetchArticles = async () => {
//             // Fetches the API
//             const response = await fetch(`/api/articles/genre/${genre}`);
//             const json = await response.json();

//             if (response.ok) {
//                 setArticles(json)                                                   // Real way to set articles
//                 setArticles(articles);
//                 setNumberOfArticles(articles.length);
//             }
//         }

//         fetchArticles();
//     }, [genre])

//     // Calculate the articles to display for the current page
//     const startIndex = (currentPage - 1) * resultsPerPage;
//     const endIndex = startIndex + resultsPerPage;
//     const currentArticles = (articles) ? articles.slice(startIndex, endIndex) : [];
    
//     if (!articles) return <div className='AuthorPageArticlesLoading'/>

//     else if (articles.length > 0) return (
//         <div className='AuthorPageArticlesContainer'>
//             <div className='Title' id='AuthorPageArticlesTitle' ref={articlesTitleRef}>
//                 Articles By Author
//             </div>
//             {currentArticles.map(article => {
//                 return <ArticleResult key={article._id} article={article}/>;
//             })}
//             <PageScroll currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfResults={numberOfArticles} resultsPerPage={resultsPerPage} scrollRef={articlesTitleRef}/>
//         </div>
//     )
// }

export default GenrePage;