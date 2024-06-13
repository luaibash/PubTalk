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
            <div className='TestTitleContainer'>  
                <div className='InnerTitleContainer'>
                    <div className='TestTitle'>
                        Meet Our Team At PubTalk.
                    </div>
                    <div className='TestTeamSubtext'>
                        A diverse group of students passionate about exploring today, future, and past topics in history, politics, technology, and more.
                    </div> 
                </div>
                <div className='TopBackground'/>
                <div className='BottomBackground'/>
            </div>
            <TeamMembers/>
        </div>
    )
}

// All team member cards in one container
const TeamMembers = () => {
    const minSlowMargin = 100; const minFastMargin = -100;
    // 175                      // -100

    useEffect(() => {
        const handleScroll = () => {
            // Retrieves the current position and the height of the page to calculate the percentage scrolled
            const scrollPosition = window.scrollY.toString();
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const maxScroll = documentHeight - windowHeight;

            // If the page is unscrollable, set scroll percentage to 100%, otherwise calculate it
            var scrollPercentage;
            if (maxScroll <= 0) scrollPercentage = 100;
            else scrollPercentage = Math.round((scrollPosition / maxScroll) * 100);

            // Sets the rising speed of the slow columns
            const slowRise = document.getElementsByClassName('TeamMemberColumnSlowRise');
            const slowMargin = 600 - 0.3*scrollPosition
            if (slowRise && slowMargin <= minSlowMargin) {
                slowRise[0].style.marginTop = `calc(${minSlowMargin}px)`;
                slowRise[1].style.marginTop = `calc(${minSlowMargin}px)`; 
            }
            else if (slowRise) {
                slowRise[0].style.marginTop = `calc(${slowMargin}px)`;
                slowRise[1].style.marginTop = `calc(${slowMargin}px)`;
            }

            // Sets the rising speed of the fast columns
            const fastRise = document.getElementsByClassName('TeamMemberColumnFastRise');
            const fastMargin = 700 - 0.5*scrollPosition
            if (fastRise && fastMargin <= minFastMargin) {
                fastRise[0].style.marginTop = `calc(${minFastMargin}px)`;
                fastRise[1].style.marginTop = `calc(${minFastMargin}px)`; 
            }
            else if (fastRise) {
                fastRise[0].style.marginTop = `calc(${fastMargin}px)`;
                fastRise[1].style.marginTop = `calc(${fastMargin}px)`;
            }

            console.log(window.scrollY)
            // console.log(scrollPercentage)
        };
        
        // Add event listener to trigger anytime scrolling/resizing occurs, and call handleScroll once to initialize margins at component mount
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', handleScroll);
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