import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Video from "./Video";

import { useVideoMutation } from '../store/videoApiSlice';

const Watch = () => {

    const [video, { isLoading }] = useVideoMutation();
    const [searchParams, ] = useSearchParams();
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        const getVideo = async () => {
            const id = searchParams.get("id");
            const resp = await video({ id: id });
            
            setVideoSrc(process.env.REACT_APP_BASEURL + '/video/' + resp.data?.video?.file_name);
        }
        getVideo();
    }, [searchParams, video]);

    return (
        isLoading
            ? <h1>Loading...</h1>
            : <React.Fragment key={videoSrc}>
                <Video videoSrc={videoSrc} />
            </React.Fragment>
    )
}

export default Watch