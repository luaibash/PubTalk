import React from 'react';
import RedirectButton from '../components/RedirectButton';
import '../styles/NotFound.css';
import ReadingError from '../assets/error/ReadingError.png';

const NotFound = () => {
  return (
    <div className='NotFoundPanel'>
        <div className='ErrorDetailsContainer'>
            <div className='ErrorNumber'>
                Oops,
                <br/>
                nothing here...
            </div>
            <div className='NotFoundText'>
                Sorry, that article does not exist, but we can help you find other great articles to read.
            </div>
            <div className='ErrorButton'>
                <RedirectButton title={"Go Home"} destination={"/"}/>
            </div>
        </div>
        <img src={ReadingError} alt="404" className='ReadingError' />
    </div>
  );
};

export default NotFound;