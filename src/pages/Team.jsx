import { React, useEffect, useRef } from 'react';
import '../styles/Team.css';
import LinkedInLogo from '../assets/team/LinkedIn.png';
import Luai from '../assets/team/Luai.png';
import Owen from '../assets/team/Owen.png';
import Gabe from '../assets/team/Gabe.png';
import LeftArrow from '../assets/team/LeftArrow.svg';
import RightArrow from '../assets/team/RightArrow.svg';

const Team = () => {
    return (
        <div className='TeamPanel'>
            <div className='TitleContainer'>  
                <div className='Title'>
                    Meet Our Team.
                </div>
                <div className='Subtext' id='TeamSubtext'>
                    A diverse group of students passionate about
                    exploring today, future, and past topics in technology,
                    politics, and more.
                </div>
            </div>
            <div className='MembersContainer'>
                <Member name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar' colour='#FF6161'/>
                <Member name='Ivan Manca' role='Head Article Designer' link='https://www.linkedin.com/in/ivan-manca-b27b17260' colour='#FCFF72'/>
                <Member name='Owen Skanes' role='Head Article Designer' headshot={Owen} colour='#72FF80'/>
                <Member name='Gabriel Hernandez' role='Student of the game' headshot={Gabe} colour='#7299FF'/>
                <Member name='Alex S.' role='Head Article Designer' colour='#D661FF'/>
                <div className='ScrollButtonLeft'>
                    <img src={LeftArrow} alt="" className='ScrollArrow'/>
                </div>
                <div className='ScrollButtonRight'>
                    <img src={RightArrow} alt="" className='ScrollArrow'/>
                </div>
            </div>
        </div>
    );
}

const Member = ({name, role, headshot, link, colour}) => {
    const headshotRef = useRef(null);

    useEffect(() => {
        headshotRef.current.style.backgroundColor = colour;
    }, [colour]);

    return (
        <div className='MemberContainer'>
            <div className='HeadshotContainer' ref={headshotRef}>
                <img src={headshot} alt="" className='Headshot'/>
            </div>
            <div className='TextContainer'>
                <div className='MemberName'>
                    {name}
                    {link && <LinkedIn link={link}/>}
                </div>
                <div className='MemberRole'>
                    {role}
                </div>
            </div>
        </div>
    );
}

const LinkedIn = (link) => {
    return (
        <a className='LogoContainer' href={link.link} target="_blank" rel="noopener noreferrer">
            <img src={LinkedInLogo} alt="" className='LinkedIn'/>
        </a>
    );
}

export default Team;