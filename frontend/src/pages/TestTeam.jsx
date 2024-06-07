import { React, useEffect } from 'react';
import Luai from '../assets/team/LuaiBashar.png';
import Owen from '../assets/team/OwenSkanes.png';
import Gabe from '../assets/team/GabrielHernandez.png';
import Ivan from '../assets/team/IvanManca.png';
import Alex from '../assets/team/AlexS.png';
import LinkedInLogo from '../assets/team/LinkedIn.svg';
import '../styles/App.css';
import '../styles/TestTeam.css';

// Team page that shows the whole team that worked on PubTalk!
const TestTeam = () => {

    return (
        <div className='TestTeamPanel'>
            <div className='TitleContainer'>  
                <div className='Title'>
                    Meet Our Team.
                </div>
                <div className='Subtext' id='TestTeamSubtext'>
                    Meet our team: A diverse group of students passionate about exploring today, future, and past topics in technology, politics, and more.
                </div>
            </div>
            <TeamMembers/>
        </div>
    )
}

// All team member cards in one container
const TeamMembers = () => {

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY.toString();

            const slowRise = document.getElementsByClassName('TeamMemberColumnSlowRise');
            if (slowRise) {
                slowRise[0].style.transform = `translateY(calc(500px - 0.3*${scrollPosition}px))`;
                slowRise[1].style.transform = `translateY(calc(500px - 0.3*${scrollPosition}px))`;
            }

            const fastRise = document.getElementsByClassName('TeamMemberColumnFastRise');
            if (fastRise) {
                fastRise[0].style.transform = `translateY(calc(550px - 0.5*${scrollPosition}px))`;
                fastRise[1].style.transform = `translateY(calc(550px - 0.5*${scrollPosition}px))`;
            }
        };
        
        // Add event listener to trigger anytime scrolling occurs, and call handleScroll once to initialize margins at component mount
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <div className='TeamMembersContainer'>
            <div className='TeamMemberColumnSlowRise'>
                <TeamMember name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar'/>
                <TeamMember name='Owen Skanes' role='Head Author' headshot={Owen} link='https://www.linkedin.com/in/owen-skanes-06958a2a8/'/>
            </div>
            <div className='TeamMemberColumnFastRise'>
                <TeamMember name='Ivan Manca' role='Head Author' headshot={Ivan} link='https://www.linkedin.com/in/ivan-manca-b27b17260' inverted={true}/>
                <TeamMember name='Gabriel Hernandez' role='Student of the game' headshot={Gabe} link='https://www.linkedin.com/in/gabriel-hernandez-34353b297/' inverted={true}/>
            </div>
            <div className='TeamMemberColumnSlowRise'>
                <TeamMember name='Gabriel Hernandez' role='Student of the game' headshot={Gabe} link='https://www.linkedin.com/in/gabriel-hernandez-34353b297/'/>
                <TeamMember name='Alex S.' role ='Head Author' headshot={Alex}/>
            </div>
            <div className='TeamMemberColumnFastRise'>
                <TeamMember name='Owen Skanes' role='Head Author' headshot={Owen} link='https://www.linkedin.com/in/owen-skanes-06958a2a8/' inverted={true}/>
                <TeamMember name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar' inverted={true}/>
            </div>
        </div>
    )
}

// Defines one team member card. If inverted is true, text container will be mirrored
const TeamMember = ({name, role, headshot, link, inverted}) => {

    return (
        <div className='TeamMemberContainer'>
            <div className='TestHeadshotContainer'>
                <img src={headshot} alt="" className='TestHeadshot'/>
            </div>
            <div className={!inverted ? 'TestTextContainer' : 'InvertedTextContainer'}>
                <div className='TestMemberName'>
                    {name}
                </div>
                <div className='TestMemberRole'>
                    {role}
                </div>
            </div>
            {link && <LinkedIn link={link}/>}
        </div>
    )
}

// LinkedIn link under respective member card that redirects user to their linkedIn
const LinkedIn = (link) => {
    return (
        <a href={link.link} target="_blank" rel="noopener noreferrer">
            <img src={LinkedInLogo} alt="" className='LinkedInLogo'/>
        </a>
    );
}

export default TestTeam;