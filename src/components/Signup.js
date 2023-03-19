import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegMutation } from '../store/regApiSlice';
import { useLoginMutation } from '../store/loginApiSlice';
 
const Signup = () => {
    const loginRef = useRef();
    const userRef = useRef();
    const errRef = useRef();
    
    const [loginReg, setLogin] = useState('');
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [reg, { isLoading }] = useRegMutation();
    const [login, ] = useLoginMutation();

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    const [videoPlay, setVideoPlay] = useState(true)
    function toggleVideo() {
        setVideoPlay(prev => !prev);
    }

    useEffect(() => {
        setErrMsg('');
    }, [loginReg, name, pwd, pwd2]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await reg({ loginReg, name, pwd, pwd2 }).unwrap();
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

    const [userLogin, setUserLogin] = useState('');
    const [pwdLogin, setPwdLogin] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ userLogin, pwdLogin }).unwrap();
            localStorage.setItem("accessToken", userData.accessToken);

            setUserLogin('');
            setPwdLogin('');
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

    const handleUserInputLogin = (e) => setUserLogin(e.target.value);
    const handlePwdInputLogin = (e) => setPwdLogin(e.target.value);

    return (
        isLoading 
            ? <h1>Загрузка...</h1>
            : (
                <>
                    <div className='shadow'></div>
                    <div className='signup'>
                        <p ref={errRef} className={errMsg ? "error" : "no-error"}>{errMsg}</p>
                        <form action="" className={`signup__form ${videoPlay ? 'active' : ''}`} onSubmit={handleSubmit}>
                            <div className="signup__title">
                                Регистрация
                            </div>
                            <div className="signup__input">
                                <input placeholder='Логин' 
                                        type="text"
                                        ref={loginRef}
                                        value={loginReg}
                                        onChange={handleLoginInput}
                                        autoComplete="off"
                                        required
                                />
                            </div>
                            <div className="signup__input">
                                <input 
                                    type="text"
                                    placeholder='Имя'
                                    value={name}
                                    onChange={handleNameInput}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="signup__input">
                                <input 
                                    type="text"
                                    placeholder='Пароль'
                                    value={pwd}
                                    onChange={handlePwdInput}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="signup__input">  
                                <input 
                                    type="text"
                                    placeholder='Пароль'
                                    value={pwd2}
                                    onChange={handlePwd2Input}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <button className="signup__button">
                                Зарегистрироваться
                            </button>
                        </form>
                        <form action="" onSubmit={handleSubmitLogin} className={`signup__form-login ${videoPlay ? 'active' : ''}`}>
                            <div className="signup__title">
                                Авторизация
                            </div>
                            <div className="signup__input">
                                <input 
                                    type="text"
                                    placeholder='Логин'
                                    ref={userRef}
                                    value={userLogin}
                                    onChange={handleUserInputLogin}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="signup__input">
                                <input 
                                    type="text"
                                    placeholder='Пароль'
                                    value={pwdLogin}
                                    onChange={handlePwdInputLogin}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <button className="signup__button">
                                Войти
                            </button>
                        </form>
                        <div className="signup__toggle" onClick={toggleVideo}>
                            {videoPlay ? 'У вас уже есть акканут?' : 'У вас ещё нет аккаунт?'}
                            <span>{videoPlay ? 'Зарегистрироваться' : 'Войти'}</span>
                        </div>
                    </div>
                </>
                // <>
                //     <p ref={errRef} className={errMsg ? "error" : "no-error"}>{errMsg}</p>
                //     <h1>Регистрация</h1>

                //     <form onSubmit={handleSubmit}>
                //         <input 
                //             type="text"
                //             placeholder='Логин'
                //             ref={loginRef}
                //             value={login}
                //             onChange={handleLoginInput}
                //             autoComplete="off"
                //             required
                //         />
                //         <input 
                //             type="text"
                //             placeholder='Имя'
                //             value={name}
                //             onChange={handleNameInput}
                //             autoComplete="off"
                //             required
                //         />
                //         <input 
                //             type="text"
                //             placeholder='Пароль'
                //             value={pwd}
                //             onChange={handlePwdInput}
                //             autoComplete="off"
                //             required
                //         />
                //         <input 
                //             type="text"
                //             placeholder='Пароль'
                //             value={pwd2}
                //             onChange={handlePwd2Input}
                //             autoComplete="off"
                //             required
                //         />
                //         <button>Зарегистрироваться</button>
                //     </form>
                // </>
            )
    )
}

export default Signup;