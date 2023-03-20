import React from 'react';
import LeftNavBar from './main/LeftNavBar';
import MainContent from './MainContent';
import BackgroundLiveImg from './BackgroundLiveImg';

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
            <BackgroundLiveImg src={process.env.REACT_APP_BASEURL + '/video/back.mp4'} autoPlay="autoplay" muted />
        </>
       
        
    );
}

export default Main;
