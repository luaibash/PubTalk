import React from 'react';
import RedirectButton from '../components/RedirectButton';
import ReadingError from '../assets/error/ReadingError.png';
import '../styles/NotFound.css';

// Not found page that is shown when a link that doesnt exist is reached
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
                Sorry, that page does not exist, but we can help you find other great pages to explore.
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