import React from 'react';
import emailjs from '@emailjs/browser';
import Waves from '../assets/contact/Waves.svg';
import Checkmark from '../assets/contact/Checkmark.png';
import '../styles/Contact.css';

const Contact = () => {
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
                            <input type="text" placeholder='e.g. John' className='Input'/>
                        </div>
                        <div className='InputContainer'>
                            <div className='ContactTitle'>
                                Last Name
                                <div className='Required'>* Required</div>
                            </div>
                            <input type="text" placeholder='Smith' className='Input'/>
                        </div>
                        <div className='InputContainer'>
                            <div className='ContactTitle'>
                                Email
                                <div className='Required'>* Required</div>
                            </div>
                            <input type="text" placeholder='john@gmail.com' className='Input'/>
                        </div>
                    </div>
                    <div className='MessageContainer'>
                        <div className='ContactTitle'>
                                Message
                                <div className='Required'>* Required</div>
                        </div>
                        <textarea placeholder="Write about anything you&#39;d like." className='Input' id='Message'></textarea>
                    </div>
                    <div className='ContactButtonContainer' onClick={() => sendEmail()}>
                        <div className='ContactButton'>
                            <div className='test'>
                                Submit
                                <img src={Checkmark} alt="" className='Checkmark'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={Waves} alt="" className='Waves'/>
        </div>
    );
}

const sendEmail = () => {
    const setDisplay = (isVisible, index) => {
        if (isVisible) document.getElementsByClassName("Required")[index].style.display = 'block';
        else document.getElementsByClassName("Required")[index].style.display = 'none';  
    };

    const firstName = document.getElementsByClassName("Input")[0].value;
    const lastName = document.getElementsByClassName("Input")[1].value;
    const email = document.getElementsByClassName("Input")[2].value;
    const message = document.getElementsByClassName("Input")[3].value;

    (firstName.trim() === "") ? setDisplay(true, 0) : setDisplay(false, 0);
    (lastName.trim() === "") ? setDisplay(true, 1) : setDisplay(false, 1);
    (email.trim() === "") ? setDisplay(true, 2) : setDisplay(false, 2);
    (message.trim() === "") ? setDisplay(true, 3) : setDisplay(false, 3);
    if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || message.trim() === "") return;

    var templateParams = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message
    };
    var serviceID = "service_2hxcqkk";
    var templateID = "template_3i0d6br";
    var publicKey = "8brRPBwE__7zDFkLo";

     
    // emailjs.send(serviceID, templateID, templateParams, publicKey)
    //     .then(function(response) {
    //         // set checkmark display to block
    //        console.log('SUCCESS!', response.status, response.text);
    //     }, function(error) {
    //        console.log('FAILED...', error);
    //     });
};

export default Contact;