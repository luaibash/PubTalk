import React from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/components/Button.css';

const RedirectButton = ({title, destination}) => {
    let navigate = useNavigate();
    const goToLocation = (location) => {
        navigate(location.toLowerCase());
        window.scrollTo(0,0);
    }

    return (
        <div className="Button" onClick={() => goToLocation(destination)}>
            {title}
        </div>
    );
}

export default RedirectButton;
