import React from 'react';

const ArticleDetails = ({article}) => {
    return(
        <div>
            <h4><strong>title: </strong>{article.title}</h4>
            <p><strong>body: </strong>{article.description}</p>
            <p><strong>written by: </strong>{article.author}</p>
            <p>{article.duration} <strong>min</strong></p>
            <p>{article.createdAt}</p>
        </div>
    );
}

export default ArticleDetails