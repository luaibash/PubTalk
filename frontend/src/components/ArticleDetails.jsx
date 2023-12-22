import React from 'react';
import '../styles/ArticleDetails.css';

const ArticleDetails = ({article, large}) => {
    const imgName = `../assets/articleCovers/${article.title.replace(/[^a-zA-Z0-9]/g, '')}.png`;
    const imageExists = doesImageExist(imgName);
    console.log(imgName + ": " + imageExists);

    return(
        <div className='articlePreview'>
            {imageExists && <img src={require(imgName)} alt="Article Cover" className='thumbnail'/>}
            <div className='articleContent' id={large ? 'articleContentLarge' : ''}>
                <div className='articleTitle' id={large ? 'articleTitleLarge' : ''}>{article.title}</div>
                {large && <div className='articleDescription'>{article.description}</div>}
                <div className='articleBottomContainer'>
                    <div className='articleAuthor' id={large ? 'articleDetailsLarge' : ''}>{article.author}</div>
                    <div className='articleDuration' id={large ? 'articleDetailsLarge' : ''}>{article.duration} min</div>
                </div>
            </div>
        </div>
    );
}

// Checks if an image file exists
const doesImageExist = (imagePath) => {
    try {
      require.resolve(imagePath);
      return true;
    } catch (e) {
      return false;
    }
  };

export default ArticleDetails