import {React, useState, useEffect} from 'react';
import '../styles/components/Genres.css';

// Genres section at bottom of articles page that shows different genres to choose from when looking at articles
const Genres = ({ genre, setGenre }) => {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1150);
  
    useEffect(() => {
      const handleResize = () => {
        setIsWideScreen(window.innerWidth > 1150);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    if (isWideScreen) return <GenresVertical genre={genre} setGenre={setGenre} />;
    else return <GenresHorizontal genre={genre} setGenre={setGenre} />
  };

// If the screen is wide enough, layout the genres in a vertical style
const GenresVertical = ({genre, setGenre}) => {
    return (
        <div className='GenreButtons'>
            <div className='GenreRow'>
                <GenreButton genre='Technology' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Art' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='History' curGenre={genre} setGenre={setGenre}/>
            </div>
            <div className='GenreRow'>
                <GenreButton genre='Society' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Cooking' curGenre={genre} setGenre={setGenre}/>
            </div>
            <div className='GenreRow'>
                <GenreButton genre='AI' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Business' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Design' curGenre={genre} setGenre={setGenre}/>
            </div>
            <div className='GenreRow'>
                <GenreButton genre='Innovation' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Ethics' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='War' curGenre={genre} setGenre={setGenre}/>
            </div>
            <div className='GenreRow'>
                <GenreButton genre='Sustainability' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Climate' curGenre={genre} setGenre={setGenre}/>
            </div>
            <div className='GenreRow'>
                <GenreButton genre='Sports' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Entertainment' curGenre={genre} setGenre={setGenre}/>
            </div>
            <div className='GenreRow'>
                <GenreButton genre='Mystery' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Fantasy' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Adventure' curGenre={genre} setGenre={setGenre}/>
            </div>
        </div>
    )
}

// If the screen is NOT wide enough, layout the genres in a horizontal style
const GenresHorizontal = ({genre, setGenre}) => {
    return (
        <div className='GenreButtons'>
            <div className='GenreRow'>
                <GenreButton genre='Technology' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Art' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='History' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Society' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Cooking' curGenre={genre} setGenre={setGenre}/>
            </div>
            <div className='GenreRow'>
                <GenreButton genre='AI' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Business' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Design' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Innovation' curGenre={genre} setGenre={setGenre}/>
            </div>
            <div className='GenreRow'>
                <GenreButton genre='Ethics' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='War' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Sustainability' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Climate' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Sports' curGenre={genre} setGenre={setGenre}/>
            </div>
            <div className='GenreRow'>
                <GenreButton genre='Entertainment' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Mystery' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Fantasy' curGenre={genre} setGenre={setGenre}/>
                <GenreButton genre='Adventure' curGenre={genre} setGenre={setGenre}/>
            </div>
        </div>
    )
}

// Genre button for each different button that when clicked, changes the genre of the featured articles to that genre
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

export default Genres;