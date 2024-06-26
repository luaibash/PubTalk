import {React, useState, useEffect} from 'react';
import LeftArrow from '../assets/team/LeftArrow.svg';
import RightArrow from '../assets/team/RightArrow.svg';
import '../styles/components/PageScroll.css';

// Scroll bar on bottom of each article section in the articles page, used to switch to next/previous page of articles
const PageScroll = ({currentPage, setCurrentPage, articles, articlesPerPage=8}) => {
    const [articlesLength, setArticlesLength] = useState(0);
    const [pages, setPages] = useState(0);

    // Find article length, set the amount of pages it will fill and bring user back to page 1 everytime genre changes
    useEffect(() => {
        if (articles) {
            setArticlesLength(articles.length);
            setPages(Math.ceil(articlesLength / articlesPerPage));
            setCurrentPage(1);
        }
    }, [articles, articlesLength, articlesPerPage, setCurrentPage]);

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