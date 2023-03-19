import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from '../store/logoutApiSlice';


const Logout = () => {

    const navigate = useNavigate();
    const [logout, ] = useLogoutMutation();

    useEffect(() => {
        const logoutF = async () => {
            localStorage.removeItem("accessToken");
            await logout();
            navigate('/');
        }
        logoutF();
    }, [logout, navigate])

}

export default Logout