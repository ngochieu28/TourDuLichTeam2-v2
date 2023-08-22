import { useNavigate } from 'react-router-dom';

export const useCheckLogin = () => {
    const navigate = useNavigate();
    if (!sessionStorage.getItem("userData")) {
        // navigate("/login");
    }
};