import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Luai from '../assets/team/LuaiBashar.png';
import Owen from '../assets/team/OwenSkanes.png';
import Gabe from '../assets/team/GabrielHernandez.png';
import Ivan from '../assets/team/IvanManca.png';
import Alex from '../assets/team/AlexS.png';
import LinkedInLogo from '../assets/team/LinkedIn.svg';
import '../styles/App.css';
import '../styles/Team.css';

// Team page that shows the whole team that worked on PubTalk!
const Team = () => {
    // Tracks whether the screen is over 1000px wide or not to decide which format to display
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1000);

    // Updates isWideScreen on every screen resize
    useEffect(() => {
        const handleResize = () => setIsWideScreen(window.innerWidth > 1000);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='TeamPanel'>
            <div className='TeamTitleContainer'>  
                <div className='TeamInnerTitleContainer'>
                    <div className='TeamTitle'>
                        Meet Our Team At PubTalk.
                    </div>
                    <div className='TeamSubtext'>
                        A diverse group of students passionate about exploring today, future, and past topics in history, politics, technology, and more.
                    </div> 
                </div>
                <div className='TeamTopBackground'/>
                <div className='TeamBottomBackground'/>
            </div>
            {isWideScreen ? <TeamMembersLarge/> : <TeamMembersSmall/>}
        </div>
    )
}

// Team members display. If screen is smaller than 1000px, use this format where team members are in two stationary columns
const TeamMembersSmall = () => {
    return (
        <div className='TeamMembersContainer'>
            <div className='TeamMemberColumnLeft'>
                <TeamMember name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar'/>
                <TeamMember name='Ivan Manca' role='Head Author' headshot={Ivan} link='https://www.linkedin.com/in/ivan-manca-b27b17260' inverted={true}/>
                <TeamMember name='Owen Skanes' role='Head Author' headshot={Owen} link='https://www.linkedin.com/in/owen-skanes-06958a2a8/'/>
                <TeamMember name='Gabriel Hernandez' role='Head Software Developer' headshot={Gabe} link='https://www.linkedin.com/in/gabriel-hernandez-34353b297/' inverted={true}/>
            </div>
            <div className='TeamMemberColumnRight'>
                <TeamMember name='Gabriel Hernandez' role='Head Software Developer' headshot={Gabe} link='https://www.linkedin.com/in/gabriel-hernandez-34353b297/' inverted={true}/>
                <TeamMember name='Owen Skanes' role='Head Author' headshot={Owen} link='https://www.linkedin.com/in/owen-skanes-06958a2a8/'/>
                <TeamMember name='Alex S.' role ='Head Author' headshot={Alex}/>
                <TeamMember name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar'/>
            </div>
        </div>
    )
}

// Team members display. If screen is larger than 1000px, use this format where team members are in scrolling moving columns
const TeamMembersLarge = () => {
    const minSlowMargin = 100; const minFastMargin = 0;

    useEffect(() => {
        const handleScroll = () => {
            // Retrieves the current position and the height of the page to calculate the percentage scrolled
            const scrollPosition = window.scrollY.toString();
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const maxScroll = documentHeight - windowHeight;

            // If the team members can be seen without scrolling, set scroll percentage to 100%, otherwise calculate it
            var scrollPercentage;
            if (windowHeight >= 1700) scrollPercentage = 100;                       // Members can be seen once screen height is over 1700px
            else scrollPercentage = Math.round((scrollPosition / maxScroll) * 100);

            // Sets the rising speed of the slow columns. If it is passed its max scrolling, set it to the minimum margins
            const slowRise = document.getElementsByClassName('TeamMemberColumnSlowRise');
            const slowMargin = 600 - 6*scrollPercentage
            if (slowRise && slowMargin <= minSlowMargin) {
                slowRise[0].style.marginTop = `calc(${minSlowMargin}px)`;
                slowRise[1].style.marginTop = `calc(${minSlowMargin}px)`; 
            }
            else if (slowRise) {
                slowRise[0].style.marginTop = `calc(${slowMargin}px)`;
                slowRise[1].style.marginTop = `calc(${slowMargin}px)`;
            }

            // Sets the rising speed of the fast columns. If it is passed its max scrolling, set it to the minimum margins
            const fastRise = document.getElementsByClassName('TeamMemberColumnFastRise');
            const fastMargin = 700 - 8.4*scrollPercentage
            if (fastRise && fastMargin <= minFastMargin) {
                fastRise[0].style.marginTop = `calc(${minFastMargin}px)`;
                fastRise[1].style.marginTop = `calc(${minFastMargin}px)`; 
            }
            else if (fastRise) {
                fastRise[0].style.marginTop = `calc(${fastMargin}px)`;
                fastRise[1].style.marginTop = `calc(${fastMargin}px)`;
            }
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
                <TeamMember name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar' id='6647faf38c00aae475e66509'/>
                <TeamMember name='Owen Skanes' role='Head Author' headshot={Owen} link='https://www.linkedin.com/in/owen-skanes-06958a2a8/' id='6647fc938c00aae475e6650d'/>
            </div>
            <div className='TeamMemberColumnFastRise'>
                <TeamMember name='Ivan Manca' role='Head Author' headshot={Ivan} link='https://www.linkedin.com/in/ivan-manca-b27b17260' id='6647fc658c00aae475e6650c' inverted={true}/>
                <TeamMember name='Gabriel Hernandez' role='Head Software Developer' headshot={Gabe} link='https://www.linkedin.com/in/gabriel-hernandez-34353b297/' id='669b1e5779b24a6a45bfff1f' inverted={true}/>
            </div>
            <div className='TeamMemberColumnSlowRise'>
                <TeamMember name='Gabriel Hernandez' role='Head Software Developer' headshot={Gabe} link='https://www.linkedin.com/in/gabriel-hernandez-34353b297/' id='669b1e5779b24a6a45bfff1f'/>
                <TeamMember name='Alex S.' role ='Head Author' headshot={Alex} id='6647fcba8c00aae475e6650e'/>
            </div>
            <div className='TeamMemberColumnFastRise'>
                <TeamMember name='Owen Skanes' role='Head Author' headshot={Owen} link='https://www.linkedin.com/in/owen-skanes-06958a2a8/' id='6647fc938c00aae475e6650d' inverted={true}/>
                <TeamMember name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar' id='6647faf38c00aae475e66509' inverted={true}/>
            </div>
        </div>
    )
}

// Defines one team member card. If inverted is true, text container will be mirrored
const TeamMember = ({name, role, headshot, link, id, inverted}) => {
    const authorLink = name.replace(/[^\w\s]/g, '').replace(/\s+/g, '-');  // Grab author link

    return (
        <div className='TeamMemberContainer'>
            <div className='HeadshotContainer'>
                <img src={headshot} alt="" className='Headshot'/>
            </div>
            <div className={!inverted ? 'TextContainer' : 'InvertedTextContainer'}>
                <div className='MemberNameContainer'>
                    <Link to={`/author/${authorLink}?id=${encodeURIComponent(id)}`} className='MemberName'>
                        {name}
                    </Link>
                </div>
                <div className='MemberRole'>
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

export default Team;