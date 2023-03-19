import React from 'react';
import LeftNavBar from './main/LeftNavBar';
import MainContent from './MainContent';
import BackgroundLiveImg from './BackgroundLiveImg';
import videosrc from '../assets/video/back.mp4'; 

const Main = ({ type }) => {
    return (
        <> 
            <div className='main'>
                <div className="_container">
                    <div className="main-wrapper">
                        <LeftNavBar />
                        <MainContent type={type} />
                    </div>
                </div>
            </div>
            <BackgroundLiveImg src={videosrc} autoPlay="autoplay" muted />
        </>
       
        
    );
}

export default Main;
