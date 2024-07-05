import {React, useState} from 'react';
import emailjs from '@emailjs/browser';
import * as EmailValidator from 'email-validator';
import Waves from '../assets/contact/Waves.svg';
import LoadAnimation from '../components/LoadAnimation';
import Checkmark from '../assets/contact/Checkmark.png';
import '../styles/App.css';
import '../styles/Contact.css';

// Contact page that shows email box to contact us
const Contact = () => {
    const [isSent, setSent] = useState(false);

    return (
        <div className='ContactPanel'>
            <div className='Title'>
                Contact Us.
            </div>
            <div className='Subtext' id='ContactSubtext'>
                Whether it&#39;s a new article topic, or you would like to give us advice,
                we would love to hear from you. Enter your contact info below and
                your message, and we&#39;ll get back to you shortly. 
            </div>
            <div className='ContactBoxContainer'>
                <div className='ContactBox'>
                    <div className='ContactBoxTitle'>
                        Talk with our team
                    </div>
                    <div className='ContactBoxRow'>
                        <div className='InputContainer'>
                            <div className='ContactTitle'>
                                First Name
                                <div className='Required'>* Required</div>
                            </div>
                            <input type="text" placeholder='e.g. John' autoComplete='given-name' className='Input'/>
                        </div>
                        <div className='InputContainer'>
                            <div className='ContactTitle'>
                                Last Name
                                <div className='Required'>* Required</div>
                            </div>
                            <input type="text" placeholder='Smith' autoComplete='family-name' className='Input'/>
                        </div>
                        <div className='InputContainer'>
                            <div className='ContactTitle'>
                                Email
                                <div className='Required'>* Required</div>
                                <div className='EmailWarning'>* Invalid Email</div>
                            </div>
                            <input type="email" placeholder='john@gmail.com' autoComplete='email' className='Input'/>
                        </div>
                    </div>
                    <div className='MessageContainer'>
                        <div className='ContactTitle'>
                                Message
                                <div className='Required'>* Required</div>
                        </div>
                        <textarea placeholder="Write about anything you&#39;d like." className='Input' id='Message'></textarea>
                    </div>
                    <div className='ContactButtonContainer'>
                        <div className='ContactAndErrorContainer'>
                            <div className='ContactButton' onClick={() => sendEmail(isSent, setSent)}>
                                <div className='TransitionContainer'>
                                    Submit
                                    <LoadAnimation/>
                                    <img src={Checkmark} alt="" className='Checkmark'/>
                                </div>
                            </div>
                            <div className='Error'>* An error has occurred.</div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={Waves} alt="" className='Waves'/>
        </div>
    );
}

// Function that sends email once all fields are filled in
const sendEmail = async (isSent, setSent) => {
    // If an email has already been sent or is being sent, don't allow another one to be sent
    if (isSent) return;
    
    // setDisplay function to change whether to display "* required" or not for each form box
    const setDisplay = (isVisible, index) => {
        if (isVisible) document.getElementsByClassName("Required")[index].style.display = 'block';
        else document.getElementsByClassName("Required")[index].style.display = 'none';  
    };

    // Removes error message at the start of send if it is shown
    document.getElementsByClassName("Error")[0].style.display = 'none';

    // Grabs values filled into each respective box in the contact box
    const firstName = document.getElementsByClassName("Input")[0].value;
    const lastName = document.getElementsByClassName("Input")[1].value;
    const email = document.getElementsByClassName("Input")[2].value;
    const message = document.getElementsByClassName("Input")[3].value;

    // Checks if the email provided by the user is a valid email. If not, notify the user
    if (!(email.trim() === "") && !EmailValidator.validate(email)) document.getElementsByClassName("EmailWarning")[0].style.display = 'block';
    else document.getElementsByClassName("EmailWarning")[0].style.display = 'none';
    
    // If any value is empty, notify the user with a "*required"
    (firstName.trim() === "") ? setDisplay(true, 0) : setDisplay(false, 0);
    (lastName.trim() === "") ? setDisplay(true, 1) : setDisplay(false, 1);
    (email.trim() === "") ? setDisplay(true, 2) : setDisplay(false, 2);
    (message.trim() === "") ? setDisplay(true, 3) : setDisplay(false, 3);

    // Exit the attempt to send email
    if (!EmailValidator.validate(email) || firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || message.trim() === "") return;

    // Template for email to send to the API, and emailjs credentials from .env folder
    var templateParams = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message
    };
    var serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    var templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    var publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    try {
        // Set is sent to true to only force one request at a time
        setSent(true);

        // Make a fetch request to check if the user is allowed to submit another form, based on the 5 submits per 10 min limit
        const response = await fetch('/api/contact', {
            method: 'POST',
        });

        // If rate limit exceeded, display error message and exit function
        if (!response.ok) {
            console.error(response.statusText + ":", response.status);
            return;
        }

        // If the user is allowed to submit another form, start loading animation and send the email
        document.getElementsByClassName("TransitionContainer")[0].style.animation = 'LoadingTransition 1s ease forwards';
        emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then(function(response) {
            // Wait a second to ensure that the loading transition is complete
            setTimeout(() => {
                document.getElementsByClassName("TransitionContainer")[0].style.animation = 'CheckmarkTransition 1s ease forwards';
                console.log('SUCCESS!', response.status, response.text);
            }, 1000);
        }, function(error) {
            setSent(false);                                                       // Allow user to send another email as it failed
            document.getElementsByClassName("Error")[0].style.display = 'block';  // If error has occurred, notify the user
            document.getElementsByClassName("TransitionContainer")[0].style.animation = '';
            console.log('FAILED...', error);
        });
    } catch (error) {   // Handle error accordingly (e.g., display error message to the user)
        console.error('Error checking rate limit:', error);
    }
};

export default Contact;