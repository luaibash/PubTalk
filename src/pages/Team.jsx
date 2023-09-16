import { React, useEffect, useRef } from 'react';
import '../styles/Team.css';

const Team = () => {
    return (
        <div className='TeamPanel'>
            <div className='TitleContainer'>  
                <div className='Title'>
                    Meet Our Team.
                </div>
                <div className='Subtext' id='TeamSubtext'>
                    Meet our team: A diverse group of students passionate about
                    exploring today, future, and past topics in technology,
                    politics, and more.
                </div>
            </div>
            <div className='MembersContainer'>
                <Member name='Luai Bashar' role ='Head Software Developer' headshot='' linkedIn='' colour='#FF6161'/>
                <Member colour='#FCFF72'/>
                <Member colour='#72FF80'/>
                <Member colour='#7299FF'/>
            </div>
        </div>
    );
}

const Member = ({colour}) => {
    const headshotRef = useRef(null);

    useEffect(() => {
        headshotRef.current.style.backgroundColor = colour;
    }, []);

    return (
        <div className='MemberContainer'>
            <div className='HeadshotContainer' ref={headshotRef}>

            </div>
        </div>
    );
}

export default Team;