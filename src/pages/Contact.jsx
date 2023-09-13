import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
    return (
        <div className='ContactPanel'>
            <div className='Title'>
                Contact Us.
            </div>
            <div className='Subtext' id='ContactSubtext'>
                Whether it&#39;s a new article topic, or you would, we would love to
                hear from you. Enter your contact info below and your message,
                and we&#39;ll get back to you shortly. 
            </div>
            <div className='ContactBoxContainer'>
                <div className='ContactBox'>
                    <div className='ContactBoxTitle'>
                        Talk with our team
                    </div>
                    <div className='ContactBoxRow'>
                        <div className='ContactBoxInputContainer'>
                            First Name
                            <input type="text" placeholder='e.g. John' className='ContactBoxInput'/>
                        </div>
                        <div className='ContactBoxInputContainer'>
                            Last Name
                            <input type="text" placeholder='Smith' className='ContactBoxInput'/>
                        </div>
                        <div className='ContactBoxInputContainer'>
                            Email
                            <input type="text" placeholder='john@gmail.com' className='ContactBoxInput'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;