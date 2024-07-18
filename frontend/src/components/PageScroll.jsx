import {React, useState, useEffect} from 'react';
import LeftArrow from '../assets/team/LeftArrow.svg';
import RightArrow from '../assets/team/RightArrow.svg';
import '../styles/components/PageScroll.css';

// Scroll bar used to switch to next/previous page of results
const PageScroll = ({currentPage, setCurrentPage, numberOfResults, resultsPerPage, scrollToTop=false, scrollRef, genre}) => {
    const [pages, setPages] = useState(0);

    // Set the amount of pages the results will fill and bring user back to page 1 everytime results/genre changes
    useEffect(() => {
        if (numberOfResults != null) {
            setPages(Math.ceil(numberOfResults / resultsPerPage));
            setCurrentPage(1);
        }
    }, [numberOfResults, resultsPerPage, setCurrentPage, genre]);

    // If there is only one page, return a space to replace the page numbers
    if (pages <= 1) {
        return <div style={{ height: '75px' }}></div>;
    }

    // Create array holding each page number
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    // Switch page number to an adjacent page based on if allowed or not
    const switchAdjacentPage = (change) => {
        if (change > 0 && currentPage + change <= pages) {
            setCurrentPage(currentPage + change);
            if (scrollToTop) window.scrollTo(0, 0);
            else if (scrollRef) scrollRef.current.scrollIntoView({ block: 'center' });
        }
        else if (change < 0 && currentPage + change > 0) {
            setCurrentPage(currentPage + change);
            if (scrollToTop) window.scrollTo(0, 0);
            else if (scrollRef) scrollRef.current.scrollIntoView({ block: 'center' });
        }
    }

    // Switch page number to the page number given
    const switchPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (scrollToTop) window.scrollTo(0, 0);
        else if (scrollRef) scrollRef.current.scrollIntoView({ block: 'center' });
    }

    return (
        <div className="PageScrollContainer">
            <img src={LeftArrow} alt="Left Arrow" className='ScrollLeftArrow' id={currentPage !== 1 ? "ActiveArrow" : ""} onClick={() => switchAdjacentPage(-1)}/>
            {pageNumbers.map((pageNumber) => (
                <div key={pageNumber} className="PageNumber" id={pageNumber === currentPage ? "ActivePage" : ""} onClick={() => switchPage(pageNumber)}>
                {pageNumber}
                </div>
            ))}
            <img src={RightArrow} alt="Right Arrow" className='ScrollRightArrow' id={currentPage !== pages ? "ActiveArrow" : ""} onClick={() => switchAdjacentPage(1)}/>
        </div>
    );
}

export default PageScroll;