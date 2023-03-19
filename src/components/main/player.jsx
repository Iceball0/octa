import { useState, useRef } from 'react';

import playImg from '../../assets/img/main/player/play.svg'
import pauseImg from '../../assets/img/main/player/pause.svg'
import settingImg from '../../assets/img/main/player/setting.svg'
import bigWidthImg from '../../assets/img/main/player/big-width.svg'
import fullScreenImg from '../../assets/img/main/player/full-screen.svg'
import normalScreenImg from '../../assets/img/main/player/normal-screen.svg'


const Player = ({ srcVideo, toggleWideScreen, ...props }) => {
    
    const videoRef = useRef(null);
    const videoBlockRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullSized, setIsFullSized] = useState(false);
    const [timeCode, setTimeCode] = useState(0);
    const [duration, setDuration] = useState(0);

    const [volumeValue, setVolumeValue] = useState(50);
    const [progressValue, setProgressValue] = useState(0);
    const [progressMax, setProgressMax] = useState(0);

    const [anim1, setAnim1] = useState(false);
    const [anim2, setAnim2] = useState(false);

    const playVideo = () => {

        if (isEnded) {
            videoRef.current.currentTime = 0;
            setIsEnded(false);
        }

        if (!isPlaying)
            videoRef.current.play();
        else
            videoRef.current.pause();

        setIsPlaying(isPlaying => !isPlaying);
    }

    const changeProgressBar = (val) => {
        let type;
        if (progressValue > val) type = 1;
        else type = 2

        if (val < 0) val = 0;
        if (val > progressMax) val = progressMax;

        if (type === 1) setAnim1(true);
        else setAnim2(true)
                
        setProgressValue(val);
        videoRef.current.currentTime = val;

        setTimeout(() => {
            if (type === 1) setAnim1(false);
            else setAnim2(false)
        }, 500)
    }

    const changeVolume = (val) => {
        if (val <= 0) {
            val = 0;
            videoRef.current.muted = true;
            setIsMuted(true);
        } else {
            videoRef.current.muted = false;
            setIsMuted(false);
        }
        if (val > 100) val = 100;

        setVolumeValue(val);
        videoRef.current.volume = Math.round(val / 10) / 10;
    }

    const onProgressChange = (e) => {
        setIsPlaying(false);
        videoRef.current.pause();

        changeProgressBar(e.target.value);
    }

    const onProgressUp = (e) => {
        setIsPlaying(true);
        videoRef.current.play();
    }
    
    const onVolumeChange = (e) => {
        changeVolume(e.target.value);
    }

    const onTimeUpdate = () => {
        setProgressValue(videoRef.current.currentTime);
        setTimeCode(videoRef.current.currentTime);
    }

    const toggleMute = () => {
        videoRef.current.muted = !isMuted;
        setIsMuted(isMuted => !isMuted);

        if (isMuted && volumeValue === 0)
            changeVolume(5);
    }

    const toggleFullScreen = () => {
        if (!isFullSized) {
            if (videoBlockRef.current.requestFullscreen) {
                videoBlockRef.current.requestFullscreen();
                setIsFullSized(true);
            } else if (videoBlockRef.current.msRequestFullscreen) {
                videoBlockRef.current.msRequestFullscreen();
                setIsFullSized(true);
            } else if (videoBlockRef.current.mozRequestFullScreen) {
                videoBlockRef.current.mozRequestFullScreen();
                setIsFullSized(true);
            } else if (videoBlockRef.current.webkitRequestFullscreen) {
                videoBlockRef.current.webkitRequestFullscreen();
                setIsFullSized(true);
            }
        } else  {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullSized(false);
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
                setIsFullSized(false);
            } else if (document.mozExitFullScreen) {
                document.mozExitFullScreen();
                setIsFullSized(false);
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
                setIsFullSized(false);
            }
        }
    }

    const onArrowsDown = (e) => {
        switch(e.keyCode) {
            case 37: 
                changeProgressBar(progressValue - 10);
                break;

            case 38: 
                changeVolume(volumeValue + 5);
                break;

            case 39: 
                changeProgressBar(progressValue + 10);
                break;

            case 40: 
                changeVolume(volumeValue - 5);
                break;

            case 32: 
                playVideo();
                break;

            default: 
                break;
        }
    }

    const formatTime = (duration) => {
        let min = Math.floor(duration / 60, 2);
        let sec = Math.floor(duration - (min * 60), 2);
        
        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;

        return `${min}:${sec}`;
    }

    var counter1 = 0;
    var counter2 = 0

    const prevDouble = (e) => {
        counter1 += 1;
            
        setTimeout(() => {
            if (counter1 > 1) changeProgressBar(progressValue - 10);
            counter1 = 0;
        }, 200);
    }

    const nextDouble = (e) => {
        counter2 += 1;
            
        setTimeout(() => {
            if (counter2 > 1) changeProgressBar(progressValue + 10);
            counter2 = 0;
        }, 200);
    }

    return (
        <div className="player" ref={videoBlockRef}>
            <video className="player__video" {...props}  
                ref={videoRef} 
                onWaiting={() => setIsLoading(true)}
                onCanPlayThrough={() => {
                    setDuration(videoRef.current.duration);
                    setProgressMax(videoRef.current.duration);
                    setIsLoading(false);
                    playVideo();
                }} 
                onTimeUpdate={onTimeUpdate}
                onEnded={() => {
                    setIsPlaying(false);
                    setIsEnded(true);
                }}
                onKeyDown={onArrowsDown}
                onMouseDown={playVideo}
                tabIndex="0"
            >
                <source src={srcVideo} type="video/mp4" />
            </video>
            <div className={`player__next-tap ${anim1 ? 'active' : ''}`} onClick={prevDouble}>
                <svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M51.3911 27.6677L69.611 15.2378C73.1375 12.832 77.9189 15.3586 77.9189 19.6261V65.512C77.9189 69.7821 73.1383 72.3102 69.6111 69.9038L35.9758 46.9609C32.8838 44.8517 32.8838 40.2882 35.9758 38.1843L47.8494 30.084L47.8494 19.6308C47.8494 18.2068 46.2559 17.3653 45.0799 18.1677L11.4916 41.1064C10.459 41.8126 10.459 43.3295 11.4907 44.0332L45.0792 66.972C46.2559 67.7749 47.8494 66.9334 47.8494 65.5095V63.8449C47.8494 62.8669 48.6423 62.0741 49.6203 62.0741C50.5983 62.0741 51.3911 62.8669 51.3911 63.8449V65.5095C51.3911 69.7798 46.6104 72.3041 43.0825 69.8973L9.49409 46.9584C6.40257 44.8495 6.40256 40.296 9.49338 38.1824L43.0833 15.2424C46.6104 12.8361 51.3911 15.3604 51.3911 19.6308L51.3911 27.6677ZM51.3911 31.955L71.6069 18.1636C72.7824 17.3616 74.3773 18.2043 74.3773 19.6261V65.512C74.3773 66.937 72.7827 67.7803 71.6069 66.9781L37.9716 44.0351C36.9413 43.3323 36.9413 41.8111 37.97 41.1113L47.8494 34.3712V40.8737C47.8494 41.8517 48.6423 42.6445 49.6203 42.6445C50.5983 42.6445 51.3911 41.8517 51.3911 40.8737V31.955Z" fill="#B570EB" />
                </svg>
            </div>
            <div className={`player__prev-tap ${anim2 ? 'active' : ''}`} onClick={nextDouble}>
                <svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6089 57.3323L15.389 69.7622C11.8625 72.168 7.08105 69.6414 7.08105 65.3739V19.488C7.08105 15.2179 11.8617 12.6898 15.3889 15.0962L49.0242 38.0391C52.1162 40.1483 52.1162 44.7118 49.0242 46.8157L37.1506 54.916V65.3692C37.1506 66.7932 38.7441 67.6347 39.9201 66.8323L73.5084 43.8936C74.541 43.1874 74.541 41.6705 73.5093 40.9668L39.9208 18.028C38.7441 17.2251 37.1506 18.0666 37.1506 19.4905V21.1551C37.1506 22.1331 36.3577 22.9259 35.3797 22.9259C34.4017 22.9259 33.6089 22.1331 33.6089 21.1551V19.4905C33.6089 15.2202 38.3896 12.6959 41.9175 15.1027L75.5059 38.0416C78.5974 40.1505 78.5974 44.704 75.5066 46.8176L41.9167 69.7576C38.3896 72.1639 33.6089 69.6396 33.6089 65.3692V57.3323ZM33.6089 53.045L13.3931 66.8364C12.2176 67.6384 10.6227 66.7957 10.6227 65.3739V19.488C10.6227 18.063 12.2173 17.2197 13.3931 18.0219L47.0284 40.9649C48.0587 41.6677 48.0587 43.1889 47.03 43.8887L37.1506 50.6288V44.1263C37.1506 43.1483 36.3577 42.3555 35.3797 42.3555C34.4017 42.3555 33.6089 43.1483 33.6089 44.1263V53.045Z" fill="#B570EB" />
                </svg>
            </div>
            {/* Video Overlay */}
            <div className="player-overlay">
                <div>{isLoading? 'Загрузка' : ''}</div>

                {/* Progress Bar */}
                <div className="player-overlay__progress-bar-block">
                    <input type="range" className="player-overlay__progress-bar" 
                        min="0" max={progressMax} 
                        value={progressValue} 
                        onChange={onProgressChange} 
                        onMouseUp={onProgressUp}  
                    />
                </div>
                <div className="player-overlay__controls">
                    <div className="player-overlay__body">

                        {/* Video Controls */}
                        <button className={`player-overlay__play-btn ${isPlaying ? 'active' : ''}`} onClick={playVideo}>
                            <img src={playImg} alt="Play" className="player-overlay__play-img-1" />
                            <img src={pauseImg} alt="Play" className="player-overlay__play-img-2" />
                        </button>
                        <button className={`player-overlay__volume-svg-btn ${isMuted ? 'muted' : ''}`} onClick={toggleMute} >
                            <svg className="player-overlay__play-svg" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.0329 8.83289C20.0328 7.99527 19.0646 7.52898 18.4096 8.05111L10.4584 14.3895C10.2813 14.5306 10.0616 14.6075 9.83509 14.6075H3.56274C3.01046 14.6075 2.56274 15.0552 2.56274 15.6075V20.6815C2.56274 20.6826 2.56222 20.6836 2.56134 20.6843V20.6843C2.55948 20.6857 2.55948 20.6885 2.56134 20.6899V20.6899C2.56222 20.6905 2.56274 20.6915 2.56274 20.6926V25.7038C2.56274 26.2561 3.01046 26.7038 3.56274 26.7038H9.87909C10.1029 26.7038 10.3203 26.7789 10.4964 26.9171L18.4165 33.1324C19.0727 33.6473 20.0339 33.1798 20.0339 32.3457V26.7051C20.0339 26.7044 20.0344 26.7038 20.0351 26.7038V26.7038C20.0359 26.7038 20.0364 26.7032 20.0364 26.7025V14.6088C20.0364 14.6081 20.0359 14.6075 20.0351 14.6075V14.6075C20.0344 14.6075 20.0339 14.607 20.0339 14.6062L20.0329 8.83289ZM18.6911 25.3598C18.6911 25.3605 18.6905 25.3611 18.6898 25.3611V25.3611C18.6891 25.3611 18.6886 25.3616 18.6886 25.3623V29.5833C18.6886 30.4174 17.7274 30.8849 17.0712 30.37L10.9603 25.5744C10.7841 25.4362 10.5668 25.3611 10.3429 25.3611H4.90677C4.35449 25.3611 3.90677 24.9133 3.90677 24.3611V16.9528C3.90677 16.4006 4.35449 15.9528 4.90677 15.9528H10.3053C10.5318 15.9528 10.7516 15.876 10.9287 15.7348L17.0665 10.8419C17.7215 10.3198 18.6898 10.7862 18.6898 11.6239V14.6088L18.6924 15.9528L18.6911 25.3598Z" fill="#D6BBEB" stroke="#B570EB" strokeWidth="0.5" />
                                <path d="M23.712 13.3434C23.415 13.566 23.3567 13.9862 23.5616 14.2958C24.7725 16.1251 25.41 18.2427 25.41 20.4616C25.41 22.7315 24.7455 24.8902 23.483 26.7458C23.274 27.053 23.3272 27.4743 23.6217 27.7009V27.7009C23.9159 27.9272 24.3396 27.8732 24.5505 27.5677C25.995 25.4741 26.754 23.0317 26.754 20.4616C26.754 17.9489 26.0246 15.5518 24.6381 13.4879C24.4313 13.18 24.0088 13.1209 23.712 13.3434V13.3434Z" fill="#D6BBEB" stroke="#B570EB" strokeWidth="0.5" />
                                <path d="M29.0072 9.40119C28.7815 9.1065 28.3568 9.06678 28.0706 9.30312V9.30312C27.7843 9.53948 27.745 9.96239 27.9699 10.2578C30.2306 13.2279 31.469 16.8875 31.469 20.6371C31.469 24.3398 30.3205 27.8341 28.1414 30.7876C27.9208 31.0866 27.9672 31.5094 28.2577 31.7411V31.7411C28.5481 31.9728 28.9725 31.9258 29.1938 31.6274C31.5635 28.4328 32.8131 24.6486 32.8131 20.6371C32.8131 16.5748 31.4659 12.6115 29.0072 9.40119Z" fill="#D6BBEB" stroke="#B570EB" strokeWidth="0.5" />
                                <path d="M33.209 5.02152C32.9716 4.73646 32.5463 4.71003 32.2679 4.95521V4.95521C31.9894 5.2004 31.9634 5.62437 32.2003 5.90984C35.6303 10.0414 37.5114 15.2461 37.5114 20.6422C37.5114 25.9244 35.6983 31.0438 32.3945 35.1356C32.1614 35.4242 32.1932 35.8477 32.4749 36.0891V36.0891C32.7565 36.3304 33.1812 36.2983 33.4147 36.0103C36.9295 31.6758 38.8554 26.2449 38.8554 20.6422C38.8554 14.9193 36.8553 9.39928 33.209 5.02152Z" fill="#D6BBEB" stroke="#B570EB" strokeWidth="0.5" />
                            </svg>
                        </button>

                        {/* Volume Bar */}
                        <div className="player-overlay__vlume-bar-block">
                            <input type="range" className="player-overlay__vlume-bar"
                                min="0" max="100"
                                value={volumeValue} 
                                onChange={onVolumeChange}  
                            />
                        </div>
                        <div className="player-overlay__time">
                            {formatTime(timeCode)}/{formatTime(duration)}
                        </div>
                    </div>
                    <div className="player-overlay__body">
                        <div className="player-overlay__settings-btn">
                            <img src={settingImg} alt="" className="player-overlay__settings-img" />
                        </div>
                        <button className="player-overlay__big-width-btn" onClick={toggleWideScreen}>
                            <img src={bigWidthImg} alt="" className="player-overlay__big-width-img" />
                        </button>
                        <button className={`player-overlay__full-screen-btn ${isFullSized ? 'active' : ''}`} onClick={toggleFullScreen}>
                            <img src={fullScreenImg} alt="" className="player-overlay__full-screen-img-1" />
                            <img src={normalScreenImg} alt="" className="player-overlay__full-screen-img-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;
