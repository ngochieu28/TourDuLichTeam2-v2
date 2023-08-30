import { useNavigate } from 'react-router-dom';
import { AppConsumer } from '../store';

export const useCheckLogin = () => {
    const [state, dispatch] = AppConsumer();
    const navigate = useNavigate();
    if (state.role !== 'Admin') {
        navigate("/login");
    }
};