import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './assets/css/style.css';

import Layout from './components/Layout';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';

import RequireAuth from './components/RequireAuth'
import Profile from './components/Profile';
import Upload from './components/Upload';
import MainPlayer from './components/MainPlayer';

import { useRefreshMutation } from './store/refreshApiSlice';


export default function App() {

    const token = localStorage.getItem("accessToken");
    const [refresh, { isLoading }] = useRefreshMutation();


    useEffect(() => {
        const refreshTokenF = async () => {
            if (!token) {
                const userData = await refresh().unwrap();
                localStorage.setItem("accessToken", userData.accessToken);
            }
        }
        refreshTokenF();
    }, [token, refresh]);

    return (
        isLoading 
            ? <h1>Загрузка...</h1>
            : <Routes>
                <Route to="/" element={<Layout />}>
                    {/* public routes */}
                    <Route index element={<Main />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="watch" element={<MainPlayer />} />

                    {/* protected routes */}
                    <Route element={<RequireAuth />}>
                        <Route path="subscribes" element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="upload" element={<Upload />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="logout" element={<Logout />} />
                    </Route>
                </Route>
            </Routes>
    )
}

