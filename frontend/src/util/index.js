import { useNavigate } from 'react-router-dom';

export const useCheckLogin = () => {
    const navigate = useNavigate();
    if (sessionStorage.getItem("role") !== 'Admin') {
        navigate("/login");
    }
    // if (localStorage.getItem("role") !== 'Admin') {
    //     navigate("/login");
    // }
};