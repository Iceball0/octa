import React from 'react';
import LeftNavBar from './main/LeftNavBar';
import MainContent from './MainContent';
import BackgroundLiveImg from './BackgroundLiveImg';
import videosrc from '../assets/video/back.mp4'; 

const Main = () => {
    return (
        <> 
            <div className='main'>
                <div className="_container">
                    <div className="main-wrapper">
                        <LeftNavBar />
                        <MainContent />
                    </div>
                </div>
            </div>
            <BackgroundLiveImg src={videosrc} autoPlay="autoplay" muted />
        </>
       
        
    );
}

export default Main;
