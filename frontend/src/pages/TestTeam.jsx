import { React, useEffect, useRef, useState } from 'react';
import Luai from '../assets/team/LuaiBashar.png';
import Owen from '../assets/team/OwenSkanes.png';
import Gabe from '../assets/team/GabrielHernandez.png';
import Ivan from '../assets/team/IvanManca.png';
import Alex from '../assets/team/AlexS.png';
import LinkedInLogo from '../assets/team/LinkedIn.png';
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
                <TeamMember name='Luai Bashar' role ='Head Software Developer' headshot={Luai} link='https://www.linkedin.com/in/luaibashar'/>
            </div>
            <div className='TeamMemberColumn'>
                <TeamMember name='Ivan Manca' role='Head Author' headshot={Ivan} link='https://www.linkedin.com/in/ivan-manca-b27b17260'/>
            </div>
            <div className='TeamMemberColumn'>
                <TeamMember name='Gabriel Hernandez' role='Student of the game' headshot={Gabe} link='https://www.linkedin.com/in/gabriel-hernandez-34353b297/'/>
            </div>
            <div className='TeamMemberColumn'>
                <TeamMember name='Owen Skanes' role='Head Author' headshot={Owen} link='https://www.linkedin.com/in/owen-skanes-06958a2a8/'/>
            </div>
        </div>
    )
}

// Defines one team member card
const TeamMember = ({name, role, headshot, link}) => {

    return (
        <div className='TeamMemberContainer'>
            <div className='TestHeadshotContainer'>
                <img src={headshot} alt="" className='TestHeadshot'/>
            </div>
            <div className='TestTextContainer'>
                <div className='TestMemberName'>
                    {name}
                </div>
                <div className='TestMemberRole'>
                    {role}
                </div>
            </div>
        </div>
    )
}

export default TestTeam;