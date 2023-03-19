import { useRef, useState } from 'react'


const Video = ({ videoSrc, ...props }) => {

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
        if (val < 0) val = 0;
        if (val > progressMax) val = progressMax;
                
        setProgressValue(val);
        videoRef.current.currentTime = val;
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

    return (
        <div ref={videoBlockRef}>
            <video 
                width="750" height="500" 
                ref={videoRef} 
                onWaiting={() => setIsLoading(true)}
                onCanPlayThrough={() => {
                    setDuration(videoRef.current.duration);
                    setProgressMax(videoRef.current.duration);
                    setIsLoading(false);
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
                <source src={videoSrc} type="video/mp4" />
            </video>
            {/* Video Overlay */}
            <div>
                <div>{isLoading? 'Загрузка' : ''}</div>
                {/* Progress Bar */}
                <input type="range" 
                    style={{width: "100%"}} 
                    min="0" max={progressMax} 
                    value={progressValue} 
                    onChange={onProgressChange} 
                    onMouseUp={onProgressUp} 
                />

                {/* Volume Bar */}
                <input type="range" 
                    style={{width: "10%"}} 
                    min="0" max="100" 
                    value={volumeValue} 
                    onChange={onVolumeChange} 
                />

                {/* Video Controls */}
                <div>
                    <button onClick={playVideo}>{!isPlaying ? !isEnded ? 'Play' : 'Restart' : 'Pause'}</button>
                    <p>
                        <span>{formatTime(timeCode)}/{formatTime(duration)}</span>
                    </p>
                    <button onClick={toggleMute}>{!isMuted ? 'Mute' : 'Unmute'}</button>
                    <button onClick={toggleFullScreen}>FullScreen</button>
                </div>
            </div>
        </div>
    )
}

export default Video