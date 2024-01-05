import React from 'react';
import '../styles/GenreButton.css';

const GenreButton = ({genre}) => {
    return (
        <div className='GenreButton'>
            {genre}
        </div>
    )
}

export default GenreButton