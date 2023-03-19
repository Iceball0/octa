import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../store/loginApiSlice';
 
const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ user, pwd }).unwrap();
            localStorage.setItem("accessToken", userData.accessToken);

            setUser('');
            setPwd('');
            navigate('/profile');
        } catch (err) {
            if (!err?.status) {
                setErrMsg('Нет ответа от сервера')
            } else if (err.status === 400) {
                setErrMsg('Введите логин и пароль');
            } else if (err.status === 500) {
                setErrMsg(err.data.msg);
            } else {
                setErrMsg('Вход не удался')
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);

    return (
        isLoading 
            ? <h1>Загрузка...</h1>
            : (
                <>
                    <p ref={errRef} className={errMsg ? "error" : "no-error"}>{errMsg}</p>
                    <h1>Вход</h1>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            placeholder='Логин'
                            ref={userRef}
                            value={user}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                        />
                        <input 
                            type="text"
                            placeholder='Пароль'
                            value={pwd}
                            onChange={handlePwdInput}
                            autoComplete="off"
                            required
                        />
                        <button>Войти</button>
                    </form>
                </>
            )
    )
}

export default Login