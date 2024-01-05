import React from 'react';
import '../styles/components/GenreButton.css';

const GenreButton = ({genre, curGenre, setGenre}) => {
    const changeGenre = () => {
        if (genre !== curGenre) setGenre(genre);
    }

    return (
        <div className='GenreButton' id={genre === curGenre ? 'ActiveGenre' : 'InactiveGenre'} onClick={() => changeGenre()}>
            {genre}
        </div>
    )
}

export default GenreButton