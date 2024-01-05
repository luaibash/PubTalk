import {React, useState} from 'react';
import '../styles/components/PageScroll.css';
import LeftArrow from '../assets/team/LeftArrow.svg';
import RightArrow from '../assets/team/RightArrow.svg';

const PageScroll = ({currentPage, setCurrentPage, articles}) => {
    // Find article length and set the amount of pages it will fill
    const [articlesLength, setArticlesLength] = useState(null);
    if (articles && articlesLength === null) setArticlesLength(articles.length);
    const pages = Math.ceil(articlesLength / 8);

    // If there is only one page, return a space to replace the page numbers
    if (pages <= 1) {
        return <div style={{ height: '75px' }}></div>;
    }

    // Create arrary holding each page number
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    // Switch page number based on if allowed or not
    const switchPage = (change) => {
        if (change > 0 && currentPage + change <= pages) setCurrentPage(currentPage + change);
        else if (change < 0 && currentPage + change > 0) setCurrentPage(currentPage + change);
    }

    return (
        <div className="PageScrollContainer">
            <img src={LeftArrow} alt="Left Arrow" className='ScrollLeftArrow' id={currentPage !== 1 ? "ActiveArrow" : ""} onClick={() => switchPage(-1)}/>
            {pageNumbers.map((pageNumber) => (
                <div key={pageNumber} className="PageNumber" id={pageNumber === currentPage ? "ActivePage" : ""} onClick={() => setCurrentPage(pageNumber)}>
                {pageNumber}
                </div>
            ))}
            <img src={RightArrow} alt="Right Arrow" className='ScrollRightArrow' id={currentPage !== pages ? "ActiveArrow" : ""} onClick={() => switchPage(1)}/>
        </div>
    );
}

export default PageScroll;