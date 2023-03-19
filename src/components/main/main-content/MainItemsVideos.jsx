import { useState, useEffect } from "react";
import MainItemVideo from './MainItemVideo';
import avatarImg from '../../../assets/img/header/Avatar.jpg';
import videoPosterImg from '../../../assets/img/main/poster.jpg';

import { useVideosMutation } from '../../../store/videosApiSlice';

const MainItemsVideos = ({ type }) => {

    const [videos, { isLoading }] = useVideosMutation();
    const [videosList, setVideosList] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const resp = await videos({ type: type });
            let result = [];

            resp.data.videos.forEach(video => {
                result.push({
                    id: video.id,
                    videoPoster: videoPosterImg,
                    srcVideo: process.env.REACT_APP_BASEURL + '/video/' + video.file_name,
                    srcAvatar: avatarImg,
                    title: video.title,
                    nameUser: video.author,
                    viewsVideo: '0'
                })
            });

            setVideosList(result);
            
        }
        getVideos();
    }, [videos])


    return (
        isLoading
            ? <h1>Loading...</h1>
            : <div className='MainItemsVideos'>
                {videosList.map((video, i) => {
                    return <MainItemVideo key={i} video={video} />
                })}
            </div>
    );
}

export default MainItemsVideos;
