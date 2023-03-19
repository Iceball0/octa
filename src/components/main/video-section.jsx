import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CarouselSection from '../main/carousel-section';

import Player from './player';
import Description from './Description';
import avatarImg from '../../assets/img/header/Avatar.jpg';
import videoPosterImg from '../../assets/img/main/poster.jpg';

import { useVideoMutation } from '../../store/videoApiSlice';

const VideoSection = () => {

    const [video, { isLoading }] = useVideoMutation();
    const [searchParams, ] = useSearchParams();
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [channelId, setChannelId] = useState('');
    const [author, setAuthor] = useState('');
    const [likes, setLikes] = useState('');
    const [liked, setLiked] = useState('');
    const [subscribes, setSubscribes] = useState('');
    const [subscribed, setSubscribed] = useState('');
    const [date, setDate] = useState('');
    const [videoSrc, setVideoSrc] = useState('');

    const [isWideScreen, setIsWideSceen] = useState(false);

    const toggleWideScreen = () => {
        setIsWideSceen(!isWideScreen);
    }

    useEffect(() => {
        const getVideo = async () => {
            const id = searchParams.get("id");
            const resp = await video({ id: id });
            
            setId(resp.data?.video?.id);
            setTitle(resp.data?.video?.title);
            setDescription(resp.data?.video?.description);
            setAuthor(resp.data?.video?.author);
            setChannelId(resp.data?.video?.channelId);
            setDate(resp.data?.video?.createdAt);
            setLikes(resp.data?.video?.likes);
            setLiked(resp.data?.video?.liked);
            setSubscribes(resp.data?.video?.subscribes);
            setSubscribed(resp.data?.video?.subscribed);
            setVideoSrc(process.env.REACT_APP_BASEURL + '/video/' + resp.data?.video?.file_name);
        }
        getVideo();
    }, [searchParams, video]);

    return (
        isLoading
            ? <h1>Loading...</h1>
            : <> 
                <div className="video-section">
                    <React.Fragment key={videoSrc}>
                        <Player srcVideo={videoSrc} toggleWideScreen={toggleWideScreen} />
                        <Description video={{
                            id: id,
                            liked: liked,
                            likes: likes,
                            videoPoster: videoPosterImg,
                            srcVideo: videoSrc,
                            srcAvatar: avatarImg,
                            title: title,
                            description: description,
                            channelId: channelId,
                            nameUser: author,
                            subscribes: subscribes,
                            subscribed: subscribed,
                            createdAt: date
                        }} />
                    </React.Fragment>
                </div>
                {isWideScreen ? '' : <CarouselSection  />}
            </>
            
    );
}

export default VideoSection;
