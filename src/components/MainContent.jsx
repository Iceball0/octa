import React from 'react';
import MainBannerVideo from './main/main-content/MainBannerVideo';
import MainItemsVideos from './main/main-content/MainItemsVideos';

const MainContent = ({ type }) => {
    return (
        <div className='main-content'>
            {type === "Main" ? <MainBannerVideo autoPlay="autoplay" muted /> : '' }
            <MainItemsVideos type={type} />
        </div>
    );
}

export default MainContent;
