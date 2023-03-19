import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useVideosMutation } from '../../store/videosApiSlice';

import MainItemVideo from './main-content/MainItemVideo';
import avatarImg from '../../assets/img/header/Avatar.jpg';
import videoPosterImg from '../../assets/img/main/poster.jpg';

const CarouselSection = () => {
    
    const [searchParams, ] = useSearchParams();
    const [videos, { isLoading }] = useVideosMutation();
    const [videosList, setVideosList] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const id = searchParams.get("id");

            const resp = await videos();
            let result = [];

            resp.data.videos.forEach(video => {
                if ( id != video.id )
                    result.push({
                        id: video.id,
                        videoPoster: videoPosterImg,
                        srcVideo: process.env.REACT_APP_BASEURL + '/video/' + video.file_name,
                        srcAvatar: avatarImg,
                        title: video.title,
                        nameUser: video.author,
                        viewsVideo: '0'
                    });
            });

            setVideosList(result);
            
        }
        getVideos();
    }, [videos, searchParams])

    return (
        isLoading
            ? <h1>Loading...</h1>
            : <div className='carousel-section'>
                {videosList.map((video, i) => {
                    return <MainItemVideo key={i} video={video} />
                })}
            </div>
    );
}

export default CarouselSection;
