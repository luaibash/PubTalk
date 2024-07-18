import {React, useState, useEffect} from 'react';
import NotFound from './NotFound';
import '../styles/AuthorPage.css';

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
    else if (!author) return <div className='LoadingPage' />

    else if (author) return (
        <div className='AuthorPagePanel'>
            <div className='AuthorPageInfoContainer'>
                <div className='AuthorPageNameAndDescription'>
                    <div className='AuthorPageName'>
                        {author.name} - {author.role}
                    </div>
                    <div className='AuthorPageDescription'>
                        {author.description}
                    </div>
                </div>
                <div className='AuthorPagePicture'/>
                <div className='AuthorPageInfoDivider'/>
            </div>
        </div>
    )
}

export default AuthorPage;