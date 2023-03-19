import { Link } from 'react-router-dom';

function Avatar(props) {

    const token = localStorage.getItem("accessToken");

    return (
        <Link to={ token ? '/logout' : '/login' } className="header__avatar">
            <img {...props} alt="" />
        </Link>
    )
}

export default Avatar