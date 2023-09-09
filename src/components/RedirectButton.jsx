import React from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/RedirectButton.css';

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
