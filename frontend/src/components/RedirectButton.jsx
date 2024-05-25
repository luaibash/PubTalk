import React from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/components/RedirectButton.css';

// Redirect button on home page to redirect to the articles page
const RedirectButton = ({title, destination}) => {
    let navigate = useNavigate();
    const goToLocation = (location) => {
        navigate(location.toLowerCase());
        window.scrollTo(0,0);
    }

    return (
        <div className="RedirectButton" onClick={() => goToLocation(destination)}>
            {title}
        </div>
    );
}

export default RedirectButton;
