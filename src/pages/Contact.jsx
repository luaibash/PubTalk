import React from 'react';
import Waves from '../assets/contact/Waves.svg';
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
                            First Name
                            <input type="text" placeholder='e.g. John' className='Input'/>
                        </div>
                        <div className='InputContainer'>
                            Last Name
                            <input type="text" placeholder='Smith' className='Input'/>
                        </div>
                        <div className='InputContainer'>
                            Email
                            <input type="text" placeholder='john@gmail.com' className='Input'/>
                        </div>
                    </div>
                    <div className='MessageContainer'>
                        Message
                        <textarea placeholder="Write about anything you&#39;d like." className='Input' id='Message'></textarea>
                    </div>
                    <div className='ContactButtonContainer' onClick={() => sendEmail()}>
                        <div className='ContactButton'>
                            Submit
                        </div>
                    </div>
                </div>
            </div>
            <img src={Waves} alt="" className='Waves'/>
        </div>
    );
}

const sendEmail = () => {
    const firstName = document.getElementsByClassName("Input")[0].value;
    const lastName = document.getElementsByClassName("Input")[1].value;
    const email = document.getElementsByClassName("Input")[2].value;
    const message = document.getElementsByClassName("Input")[3].value;

    
};

export default Contact;