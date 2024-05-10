import {React, useEffect, useState} from 'react';
import NotFound from './NotFound';
import '../styles/App.css';
import '../styles/ArticlePage.css';

const ArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const imageFolder = (article) ? article.title.replace(/[^a-zA-Z0-9]/g, '') : ""; // Grabs name of folder for specified article

    // Grab id from link
    const queryParams = new URLSearchParams(window.location.search);
    const articleID = queryParams.get('id');

    useEffect(() => {
        const fetchArticle = async () => {
            // Fetches the API and finds article using its id
            const response = await fetch('/api/articles/' + articleID);
            const json = await response.json();

            if (response.ok) setArticle(json);
            else setNotFound(true);
        }

        fetchArticle()
    }, [articleID])

    // Converts the date given by the article to more readable terms
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      }

    // If link does not exist, show not found page
    if (notFound) return <NotFound/>;

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
                <div className='ArticleContent'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sequi sed possimus neque! Omnis doloribus tempora reprehenderit sed, quia deleniti quo illo doloremque voluptatum laboriosam adipisci ipsam, nesciunt sint ad.
                    <br/><br/>
                    Ad, vitae eum commodi, quis ipsa rerum officia ab dicta soluta neque hic sunt perferendis eveniet veritatis ex ipsum eius praesentium mollitia, aut velit itaque adipisci! Adipisci repellendus, eos, nesciunt explicabo nostrum fugit, eum deserunt natus omnis quae quas hic commodi maiores.
                    <br/><br/>
                    Fuga temporibus saepe cum sapiente ab eum expedita non eligendi at fugit neque ducimus, nihil, numquam iusto. Veritatis cupiditate, in adipisci mollitia soluta dolorem sapiente. Suscipit, commodi deserunt at accusamus adipisci ducimus.
                    <br/><br/>
                    Accusantium quibusdam delectus voluptate necessitatibus iusto voluptas obcaecati fugit cupiditate commodi sunt corrupti corporis aliquam pariatur earum odit, provident quae quisquam! Rerum veritatis unde commodi veniam earum fuga tenetur autem doloremque facilis odit, officiis adipisci nam amet minima? Corrupti distinctio quo velit fuga ullam sed ex deleniti veniam, ab, qui quisquam eius eveniet. Repellendus, magni obcaecati, doloremque quidem expedita incidunt alias dolor numquam ipsa error aspernatur, harum sint unde. Vel veniam placeat facilis, amet culpa laboriosam ipsam quo quae magnam repellendus nulla eaque ipsa quis, voluptates aspernatur. Delectus, sequi? Autem, labore consectetur.
                </div>
                <div className='OtherArticleSuggestions'>

                </div>
            </div>
        </div>
    );
}

export default ArticlePage;