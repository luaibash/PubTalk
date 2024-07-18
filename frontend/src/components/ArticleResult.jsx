import {React, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/components/ArticleResult.css';

// Article results that shows article preview. In own component since multiple pages use it such as search results, author results, genre results
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
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Takes the first two genres and returns a string to display for the article
    const formatGenres = (genres) => {
        if (genres.length === 0) return "General";       // If array is empty, return general genre
        else if (genres.length === 1) return genres[0];   // If there is only one genre, return it
        else return `${genres[0]}, ${genres[1]}`;         // If there are two or more genres, format and return the first two
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

export default ArticleResult;