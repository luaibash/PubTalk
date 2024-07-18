import {React, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import NotFound from './NotFound';
import LinkedInLogo from '../assets/team/LinkedIn.svg';
import '../styles/App.css';
import '../styles/ArticlePage.css';

// Component that is the article itself, with its title, cover photo, content, etc
const ArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const imageFolder = (article) ? article.title.replace(/[^a-zA-Z0-9]/g, '') : ""; // Grabs name of folder for specified article

    // Grab id from link
    const queryParams = new URLSearchParams(window.location.search);
    const articleID = queryParams.get('id');

    // IMPORTANT: This variable is only for the page to rerender! Grabs the current article title from the link, and when a new article is clicked, this value changes, prompting a rerender
    const { articleLink } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            // Fetches the API and finds article using its id
            const response = await fetch(`/api/articles/id/${articleID}`);
            const json = await response.json();

            if (response.ok) setArticle(json);
            else setNotFound(true);
        }

        fetchArticle()
    }, [articleID, articleLink])

    // Converts the date given by the article to more readable terms
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // If link does not exist, show not found page
    if (notFound) return <NotFound/>;

    // If article has not rendered yet, fill it with a blank page with space so it doesn't snap user to top. This is because if we return nothing, only the footer will show and the page will be very small height, automatically snapping user to top of page    
    else if (!article) return <div className='LoadingPage' />

    // Show article as soon as the article has been pulled from the database
    else if (article) return (
        <div className='ArticlePagePanel'>
            <div className='Title' id='ArticleTitle'>
                {article.title}
            </div>
            <div className='ArticleDetails'>
                {article.author} &#8226; {formatDate(article.createdAt)} &#8226; {article.duration} Min read
            </div>
            <img src={require(`../assets/articleImages/${imageFolder}/Cover.png`)} alt="Article Cover" className='ArticleCover'/>
            <div className='ArticleBody'>
                <div className='ArticleContentAndAuthor'>
                    <div className='ArticleContent'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sequi sed possimus neque! Omnis doloribus tempora reprehenderit sed, quia deleniti quo illo doloremque voluptatum laboriosam adipisci ipsam, nesciunt sint ad.
                        <br/><br/>
                        Ad, vitae eum commodi, quis ipsa rerum officia ab dicta soluta neque hic sunt perferendis eveniet veritatis ex ipsum eius praesentium mollitia, aut velit itaque adipisci! Adipisci repellendus, eos, nesciunt explicabo nostrum fugit, eum deserunt natus omnis quae quas hic commodi maiores.
                        <br/><br/>
                        Fuga temporibus saepe cum sapiente ab eum expedita non eligendi at fugit neque ducimus, nihil, numquam iusto. Veritatis cupiditate, in adipisci mollitia soluta dolorem sapiente. Suscipit, commodi deserunt at accusamus adipisci ducimus.
                        <br/><br/>
                        Accusantium quibusdam delectus voluptate necessitatibus iusto voluptas obcaecati fugit cupiditate commodi sunt corrupti corporis aliquam pariatur earum odit, provident quae quisquam! Rerum veritatis unde commodi veniam earum fuga tenetur autem doloremque facilis odit, officiis adipisci nam amet minima? Corrupti distinctio quo velit fuga ullam sed ex deleniti veniam, ab, qui quisquam eius eveniet. Repellendus, magni obcaecati, doloremque quidem expedita incidunt alias dolor numquam ipsa error aspernatur, harum sint unde. Vel veniam placeat facilis, amet culpa laboriosam ipsam quo quae magnam repellendus nulla eaque ipsa quis, voluptates aspernatur. Delectus, sequi? Autem, labore consectetur.
                        <br/><br/>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo nesciunt, deleniti natus modi et pariatur, error vel aspernatur deserunt repellendus numquam iusto odio aliquid delectus laboriosam quis esse aut.
                        <br/><br/>
                        Dolore, temporibus. Modi, neque sed dolores suscipit voluptatum nihil, deleniti excepturi recusandae dolorem vitae distinctio vero et molestias beatae sapiente possimus commodi, eligendi est sunt iure sit ut. Dolore ratione esse eos.
                        <br/><br/>
                        Inventore repellendus assumenda sequi, a totam laboriosam mollitia unde iure porro amet dicta, ipsum officia vel animi dolorem doloribus cumque reprehenderit ipsam. Facilis blanditiis ratione, eos explicabo provident error eaque sunt illum laborum voluptatibus facere aspernatur enim quas dignissimos adipisci est. Obcaecati!
                        <br/><br/>
                        Itaque, nam aspernatur ratione dolorum libero ab eaque. Fuga, doloremque quas maxime voluptatibus, ipsum minima dignissimos a sequi possimus quidem mollitia quos sit illo eum amet iste cupiditate similique. Quidem, non itaque repudiandae quis quod, numquam commodi deserunt dolores exercitationem necessitatibus iure asperiores ab beatae sunt velit sint accusantium temporibus, voluptatem aspernatur!
                    </div>
                    <AuthorDetails authorName={article.author}/>
                </div>
                <div className='OtherArticleSuggestionsContainer'>
                    <div className='OtherArticlesHeader'>
                        OTHER ARTICLES
                    </div>
                    <OtherArticleSuggestions genre={article.genre} articleToExclude={article}/>
                </div>
            </div>
            <AuthorArticles article={article}/>
        </div>
    );
}

// Container that holds all other articles suggestions
const OtherArticleSuggestions = ({ genre, articleToExclude }) => {
    const [articles, setArticles] = useState([]);
    
    // Fetches 4 most relatable articles to current article to preview to user
    useEffect(() => {
        const fetchArticles = async () => {
            let accumulatedArticles = [];

            // Go through each genre and grab articles. If a genre does not have 4 articles, it goes to the next
            for (let i = 0; i < genre.length; i++) {
                // Specifies only a max of 4 articles to pull, and which articles to not pull to not duplicate them
                const allArticlesToExclude = JSON.stringify([articleToExclude, ...accumulatedArticles]);
                const response = await fetch(`/api/articles/genre/${genre[i]}?limit=4&excludeArticles=${allArticlesToExclude}`);
                const json = await response.json();
                
                if (response.ok) {
                    accumulatedArticles = [...accumulatedArticles, ...json];    // Adds new articles fetched to existing articles fetched
                    if (accumulatedArticles.length >= 4) {
                        setArticles(accumulatedArticles.slice(0, 4));           // Takes only the first four articles to show
                        return;
                    }
                }
            }

            // If none of related genres had enough articles for 4, it adds on from most recent articles. Same idea of limit/excludeArticles specification
            const allArticlesToExclude = JSON.stringify([articleToExclude, ...accumulatedArticles]);
            const response = await fetch(`/api/articles/recent?limit=4&excludeArticles=${allArticlesToExclude}`);
            const json = await response.json();
                
            if (response.ok) {
                accumulatedArticles = [...accumulatedArticles, ...json];
                setArticles(accumulatedArticles.slice(0, 4));
            }
        }

        fetchArticles()
    }, [genre, articleToExclude])

    if (articles.length === 4) return (
        <div>
            <OtherArticle article={articles[0]}/>
            <OtherArticle article={articles[1]}/>
            <OtherArticle article={articles[2]}/>
            <OtherArticle article={articles[3]}/>
        </div>
    )
}

// One article in the other articles container
const OtherArticle = ({ article }) => {
    const imageFolder = (article) ? article.title.replace(/[^a-zA-Z0-9]/g, '') : ""; // Grabs name of folder for specified article
    const articleLink = article.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '-'); // Grab article link

    return (
        <Link to={`/articles/${articleLink}?id=${encodeURIComponent(article._id)}`} className='OtherArticleSuggestionsArticle'>
            <div className='OtherArticleDescription'>
                <div className='OtherArticleTitle'>
                    {article.title}
                </div>
                <div className='OtherArticleGenreAuthor'>
                    {article.genre[0]} &#8226; {article.author}
                </div>
            </div>
            <img src={require(`../assets/articleImages/${imageFolder}/Cover.png`)} alt="Article Cover" className='OtherArticleCover'/>
        </Link>
    )
}

// Author details components that holds who wrote the article
const AuthorDetails = ({ authorName }) => {
    const [author, setAuthor] = useState();
    const authorHeadshotFolder = (authorName) ? authorName.replace(/[^a-zA-Z0-9]/g, '') : ""; // Grabs name of folder for specified article

    useEffect(() => {
        const fetchAuthor = async () => {
            // Fetches the API and finds author using the author name
            const response = await fetch(`/api/authors/name/${authorName}`);
            const json = await response.json();

            if (response.ok) setAuthor(json);
        }

        fetchAuthor()
    }, [authorName])

    if (author) return (
        <div className='AuthorContainer'>
            <img src={require(`../assets/team/${authorHeadshotFolder}.png`)} alt="Author Headshot" className='AuthorHeadshot'/>
            <div className='AuthorDetails'>
                <div className='AuthorNameAndRole'>
                    {author.name} - {author.role}
                </div>
                <div className='AuthorDescription'>
                    {author.description}
                </div>
                <a className="AuthorLinkedInContainer" href={author.linkedIn} target="_blank" rel="noopener noreferrer">
                    <img src={LinkedInLogo} alt="LinkedIn Logo" className='AuthorLinkedInLogo'/>
                </a>
            </div>
        </div>
    )
}

// Author articles container that holds other articles by that author
const AuthorArticles = ({ article }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            // Fetches the API and finds articles from the author, providing a limit on articles to grab, and to exclude the current article being viewed
            const articleToExclude = JSON.stringify(article);
            const response = await fetch(`/api/articles/author/${article.author}?limit=4&excludeArticle=${articleToExclude}`);
            const json = await response.json();

            if (response.ok) setArticles(json);
        }

        fetchArticles()
    }, [article])

    if (articles.length > 0) return (
        <div className='AuthorArticles'>
            <div className='AuthorArticlesHeader'>
                MORE FROM AUTHOR
            </div>
            <div className='AuthorArticlesContainer'>
                {articles[0] && <AuthorArticle article={articles[0]}/>}
                {articles[1] && <AuthorArticle article={articles[1]}/>}
                {articles[2] && <AuthorArticle article={articles[2]}/>}
                {articles[3] && <AuthorArticle article={articles[3]}/>}
            </div>
        </div>
    )
}

// One article in the author articles container
const AuthorArticle = ({ article }) => {
    const imageFolder = (article) ? article.title.replace(/[^a-zA-Z0-9]/g, '') : ""; // Grabs name of folder for specified article
    const articleLink = article.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '-'); // Grab article link

    return (
        <Link to={`/articles/${articleLink}?id=${encodeURIComponent(article._id)}`} className='AuthorArticle'>
            <img src={require(`../assets/articleImages/${imageFolder}/Cover.png`)} alt="Article Cover" className='AuthorArticleCover'/>
            <div className='AuthorArticleTitle'>
                {article.title}
            </div>
            <div className='AuthorArticleGenreAuthor'>
                {article.genre[0]} &#8226; {article.author}
            </div>
        </Link>
    )
}

export default ArticlePage;