
const MainBannerVideo = (props) => {
    return (
        <div className='main-banner-Video'>
            <video src={process.env.REACT_APP_BASEURL + '/video/back.mp4'} {...props}></video>
        </div>
    );
}

export default MainBannerVideo;
