import { Link } from 'react-router-dom';

const Profile = () => {

    const token = localStorage.getItem("accessToken").slice(0, 9);

    return (
        <>
            <div> Токен: {token}...</div>
            <Link to="/">На главную</Link>
        </>
    )
}

export default Profile