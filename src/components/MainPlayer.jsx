import React from 'react';
import VideoSection from './main/video-section';

const MainPlayer = () => {
    return (
        <div className='main-player'>
            <div className="_container">
                <div className="main-player__block">
                    <VideoSection />
                </div>
            </div>
        </div>
    );
}

export default MainPlayer;
