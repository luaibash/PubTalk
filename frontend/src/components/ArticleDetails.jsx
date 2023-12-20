import React from 'react';

const ArticleDetails = ({article}) => {
    return(
        <div>
            <h4>{article.title}</h4>
            <p><strong>body: </strong>{article.paragraph}</p>
            <p><strong>written by: </strong>{article.author}</p>
            <p>{article.createdAt}</p>
        </div>
    );
}

export default ArticleDetails