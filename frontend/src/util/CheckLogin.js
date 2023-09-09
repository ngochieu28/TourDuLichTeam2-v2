import { useNavigate } from 'react-router-dom';
import { AppConsumer } from '../store';

export const useCheckAdmin = () => {
    const [state, dispatch] = AppConsumer();
    const navigate = useNavigate();
    if (state.role !== 'Admin') {
        navigate("/login");
    }
};

export const useCheckLogin = () => {
    const [state, dispatch] = AppConsumer();
    const navigate = useNavigate();
    const checkLogin = () => {
        if (state.role !== 'User' && state.role !== 'Admin') {
            alert("Vui lòng đăng nhập để đặt tour");
            navigate("/login");
        }
    };

    return checkLogin;
};