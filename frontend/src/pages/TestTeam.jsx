import { React, useEffect, useRef, useState } from 'react';
import Luai from '../assets/team/LuaiBashar.png';
import Owen from '../assets/team/OwenSkanes.png';
import Gabe from '../assets/team/GabrielHernandez.png';
import Ivan from '../assets/team/IvanManca.png';
import Alex from '../assets/team/AlexS.png';
import LinkedInLogo from '../assets/team/LinkedIn.png';
import LeftArrow from '../assets/team/LeftArrow.svg';
import RightArrow from '../assets/team/RightArrow.svg';
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

    return (
        <div className='TeamMembersContainer'>
            <div className='TeamMemberColumn'>
                <TeamMember/>
            </div>
            <div className='TeamMemberColumn'>
                <TeamMember/>
            </div>
            <div className='TeamMemberColumn'>
                <TeamMember/>
            </div>
            <div className='TeamMemberColumn'>
                <TeamMember/>
            </div>
        </div>
    )
}

// Defines one team member card
const TeamMember = () => {

    return (
        <div className='TeamMemberContainer'>
            
        </div>
    )
}

export default TestTeam;