import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
        <Link to="/login">Вход</Link>
        <br />
        <Link to="/logout">Выход</Link>
        <br />
        <Link to="/signup">Регистрация</Link>
        <br />
        <Link to="/profile">Профиль</Link>
        <br />
        <Link to="/watch?id=1">Смотреть</Link>
        </>
    )
}

export default Home;