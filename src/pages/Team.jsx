import { React, useEffect, useRef, useState } from 'react';
import '../styles/Team.css';
import LinkedInLogo from '../assets/team/LinkedIn.png';
import Luai from '../assets/team/Luai.png';
import Owen from '../assets/team/Owen.png';
import Gabe from '../assets/team/Gabe.png';
import LeftArrow from '../assets/team/LeftArrow.svg';
import RightArrow from '../assets/team/RightArrow.svg';
import Ivan from '../assets/team/Ivan.png';
import Alex from '../assets/team/Alex.png';

const Team = () => {
    const [isWideViewport, setIsWideViewport] = useState(false);

    // Checks if width is too long to display slideshow
    useEffect(() => {
        const handleResize = () => {
          setIsWideViewport(window.innerWidth >= 1650);
        };
    
        // Initial check when the component mounts and add event listener
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

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
            {isWideViewport ? <MemberExpanded/> : <MemberSlideshow/>}
        </div>
    );
}

const MemberSlideshow = () => {
    const memberRef = useRef(null);
    const [isScrolling, setScrolling] = useState(false);

    const scroll = ({ left, right }) => {
        if (isScrolling) return;
        setScrolling(true);

        requestAnimationFrame(() => {
            // Retrieve current margin value
            const computedStyle = window.getComputedStyle(memberRef.current);
            var marginLeft = computedStyle.getPropertyValue('margin-left');
            marginLeft = parseInt(marginLeft, 10);

            // Add current shift in margin based on direction, and apply it
            if (left) marginLeft += 350;
            else if (right) marginLeft -= 350;
            memberRef.current.style.marginLeft = `${marginLeft}px`;

            // Wait until shift has completed. Check if threshold reached, then return to middle.
            setTimeout(() => {
                if (marginLeft <= -3675 || marginLeft >= -175) {
                    memberRef.current.style.transition = 'none';
                    memberRef.current.style.marginLeft = '-1925px';
                };
                setScrolling(false);
            }, 400);

            memberRef.current.style.transition = 'margin-left 0.4s ease';
        });
    }

    return (
        <div className='MembersSlideshowContainer'>
            <div className='MembersSlideshow' ref={memberRef}>
                <Member name='Alex S.' headshot={Alex} role='Head Author' colour='#D661FF'/>
                <Member name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar' colour='#FF6161'/>
                <Member name='Ivan Manca' role='Head Author' headshot={Ivan} link='https://www.linkedin.com/in/ivan-manca-b27b17260' colour='#FCFF72'/>
                <Member name='Owen Skanes' role='Head Author' headshot={Owen} colour='#72FF80'/>
                <Member name='Gabriel Hernandez' role='Student of the game' headshot={Gabe} colour='#7299FF'/>
                <Member name='Alex S.' headshot={Alex} role='Head Author' colour='#D661FF'/>
                <Member name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar' colour='#FF6161'/>
                <Member name='Ivan Manca' role='Head Author' headshot={Ivan} link='https://www.linkedin.com/in/ivan-manca-b27b17260' colour='#FCFF72'/>
                <Member name='Owen Skanes' role='Head Author' headshot={Owen} colour='#72FF80'/>
                <Member name='Gabriel Hernandez' role='Student of the game' headshot={Gabe} colour='#7299FF'/>
                <Member name='Alex S.' headshot={Alex} role='Head Author' colour='#D661FF'/>
                <Member name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar' colour='#FF6161'/>
                <Member name='Ivan Manca' role='Head Author' headshot={Ivan} link='https://www.linkedin.com/in/ivan-manca-b27b17260' colour='#FCFF72'/>
                <Member name='Owen Skanes' role='Head Author' headshot={Owen} colour='#72FF80'/>
                <Member name='Gabriel Hernandez' role='Student of the game' headshot={Gabe} colour='#7299FF'/>
                <Member name='Alex S.' headshot={Alex} role='Head Author' colour='#D661FF'/>
            </div>
            <div className='ScrollButtonLeft' onClick={() => scroll({left: true})}>
                <img src={LeftArrow} alt="" className='ScrollArrow'/>
            </div>
            <div className='ScrollButtonRight' onClick={() => scroll({right: true})}>
                <img src={RightArrow} alt="" className='ScrollArrow'/>
            </div>
        </div>
    );
}

const MemberExpanded = () => {
    return (
        <div className='MembersExpandedContainer'>
            <Member name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar' colour='#FF6161'/>
            <Member name='Ivan Manca' role='Head Author' headshot={Ivan} link='https://www.linkedin.com/in/ivan-manca-b27b17260' colour='#FCFF72'/>
            <Member name='Owen Skanes' role='Head Author' headshot={Owen} colour='#72FF80'/>
            <Member name='Gabriel Hernandez' role='Student of the game' headshot={Gabe} colour='#7299FF'/>
            <Member name='Alex S.' headshot={Alex} role='Head Author' colour='#D661FF'/>
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