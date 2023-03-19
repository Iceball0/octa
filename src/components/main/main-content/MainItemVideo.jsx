import { Link } from "react-router-dom";

const MainItemVideo = (props) => {
    function MouseOver(event) {
        event.target.play();
    }
    function MouseOut(event) {
        event.target.pause();
        event.target.currentTime = 0;
        event.target.load();
    }

    const videoSrc = `/watch?id=${props.video.id}`;

    return (
        <Link to={videoSrc} reloadDocument className="main-item-video">
            <div className="main-item-video__block">
                <video
                    src={props.video.srcVideo}
                    muted onMouseOver={MouseOver}
                    onMouseOut={MouseOut}
                    poster={props.video.videoPoster}
                >
                </video>
            </div>
            <div className="main-item-video__content">
                <div className="main-item-video__img">
                    <img src={props.video.srcAvatar} alt="Avatar" />
                </div>
                <div className="main-item-video__body">
                    <div className="main-item-video__title">
                        {props.video.title}
                    </div>
                    <div className="main-item-video__name">
                        {props.video.nameUser}
                    </div>
                    <div className="main-item-video__views">
                        {props.video.viewsVideo} Просмотров
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MainItemVideo;
