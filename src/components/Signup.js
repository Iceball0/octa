import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegMutation } from '../store/regApiSlice';
 
const Signup = () => {
    const loginRef = useRef();
    const errRef = useRef();
    
    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [reg, { isLoading }] = useRegMutation();

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [login, name, pwd, pwd2]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await reg({ login, name, pwd, pwd2 }).unwrap();
            localStorage.setItem("accessToken", userData.accessToken);

            setLogin('');
            setName('');
            setPwd('');
            setPwd2('');
            navigate('/profile');
        } catch (err) {
            if (!err?.status) {
                setErrMsg('Нет ответа от сервера')
            } else if (err.status === 500) {
                setErrMsg(err.data.msg);
            } else {
                setErrMsg('Регистрация не удалась')
            }
            errRef.current.focus();
        }
    }

    const handleLoginInput = (e) => setLogin(e.target.value);
    const handleNameInput = (e) => setName(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);
    const handlePwd2Input = (e) => setPwd2(e.target.value);

    return (
        isLoading 
            ? <h1>Загрузка...</h1>
            : (
                <>
                    <p ref={errRef} className={errMsg ? "error" : "no-error"}>{errMsg}</p>
                    <h1>Регистрация</h1>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            placeholder='Логин'
                            ref={loginRef}
                            value={login}
                            onChange={handleLoginInput}
                            autoComplete="off"
                            required
                        />
                        <input 
                            type="text"
                            placeholder='Имя'
                            value={name}
                            onChange={handleNameInput}
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
                        <input 
                            type="text"
                            placeholder='Пароль'
                            value={pwd2}
                            onChange={handlePwd2Input}
                            autoComplete="off"
                            required
                        />
                        <button>Зарегистрироваться</button>
                    </form>
                </>
            )
    )
}

export default Signup;