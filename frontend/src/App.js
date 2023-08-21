import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Page/Home';
import Login from './Page/auth/Login';
import SignUp from './Page/auth/SignUp';
import Admin from './Page/Admin';
import Product from './Page/Product';
import User from './Page/Users';
import AdminPage from './Page/Admin/AdminPage';
import ProductDetail from './Page/Product/ProductDetail';
import Booking from './Page/Booking/formBooking';
import TourDetail from './Page/TourDetail';
import ScrollToTop from './util/ScrollToTop';
import Page500 from './Page/auth/Page500';
import Page404 from './Page/auth/Page404';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './Page/auth/ResetPassword';
import NewPassword from './Page/auth/NewPassword';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <h1>tesst</h1>
      <ToastContainer />
      <ScrollToTop key={location.key} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tourDetail/:maTour' element={<TourDetail />} />
        <Route path='/admin' element={<Admin />}>
          <Route index element={<AdminPage />} />
          <Route path='product' element={<Product />} />
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path='user' element={<User />} />
        </Route>
        <Route path='/booking' element={<Booking />} />
        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/auth/new-password/:token' element={<NewPassword />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/page500' element={<Page500 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;