import shareImg from '../../assets/img/main/player/share.svg'
import Comments from './comments';

import { useLikesMutation } from '../../store/likesApiSlice';
import { useSubscribesMutation } from '../../store/subsApiSlice';
import { useEffect, useState } from 'react';

const Description = (props) => {

    const date = new Date(props.video.createdAt);
    const months = ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июня', 'июля', 'авг.', 'сент.', 'окт.', 'ноя.', 'дек.'];
    const [likes, ] = useLikesMutation();
    const [subscribes, { isLoading }] = useSubscribesMutation();
    const [videoLiked, setVideoLiked] = useState('');
    const [likesAmount, setLikesAmount] = useState(0);
    const [videoSubed, setVideoSubed] = useState('');
    const [subsAmount, setSubsAmount] = useState(0);

    useEffect(() => {
        setVideoLiked(props.video.liked);
        setLikesAmount(props.video.likes);

        setVideoSubed(props.video.subscribed);
        setSubsAmount(props.video.subscribes);
    }, [props.video.liked, props.video.likes, props.video.subscribed, props.video.subscribes])

    const toggleLikes = async () => {
        if (videoLiked) setLikesAmount(likesAmount - 1);
        else setLikesAmount(likesAmount + 1);

        setVideoLiked(!videoLiked);
        await likes({ videoId: props.video.id }).unwrap();
    }

    const toggleSubs = async () => {
        if (videoSubed) setSubsAmount(subsAmount - 1);
        else setSubsAmount(subsAmount + 1);

        setVideoSubed(!videoSubed);
        await subscribes({ channelId: props.video.channelId }).unwrap();
    }

    return (
        isLoading
            ? <h1>Loading</h1>
            : <div className='description'>
                <div className="description__title">
                    {props.video.title}
                </div>
                <div className="description__body">
                    <div className="description__user">
                        <div className="description__avatar">
                            <img src={props.video.srcAvatar} alt="Avatar" />
                        </div>
                        <div className="description__info">
                            <div className="description__name">
                                {props.video.nameUser}
                            </div>
                            <div className="description__subscribers">
                                {subsAmount} Подписчиков
                            </div>
                        </div>
                        <button className="description__subscribe" onClick={toggleSubs}>
                            {videoSubed ? 'Отписаться' : 'Подписаться'}
                        </button>
                    </div>
                    <div className="description__content">
                        <button className="description__like" onClick={toggleLikes}>
                            <svg width="31" height="29" viewBox="0 0 31 29" fill={videoLiked ? '#B570EB' : "none"} xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.07077 2.41406C5.4933 2.41406 2.01025 4.23698 2.01025 9.28828C2.01025 14.263 10.2633 21.5547 15.4998 26.5859C20.7396 21.5547 28.9894 14.263 28.9894 9.28828C28.9894 4.23698 25.5091 2.41406 21.9356 2.41406C19.1457 2.41406 17.0174 4.57878 15.4998 6.85578C13.9755 4.56802 11.854 2.41406 9.07077 2.41406Z" stroke="#B570EB" strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {likesAmount}
                        </button>
                        <button className="description__share">
                            <img src={shareImg} alt="Share" />
                            Поделиться
                        </button>
                    </div>
                </div>
                <div className="description__description">
                    <div className="description__date">
                    { date.getDate() } { months[date.getMonth()] } { date.getFullYear() } г.
                    </div>
                    { props.video.description }
                </div>
                <Comments />
            </div>
            
    );
}

export default Description;
