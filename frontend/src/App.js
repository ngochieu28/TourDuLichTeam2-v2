import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Page/Home';
import Login from './Page/auth/Login';
import SignUp from './Page/auth/SignUp';
import Admin from './Page/Admin';
import Product from './Page/Product';
import AdminPage from './Page/Admin/AdminPage';
import ProductDetail from './Page/Product/ProductDetail';
import Booking from './Page/Booking/Booking';
import TourDetail from './Page/TourDetail';
import ScrollToTop from './util/ScrollToTop';
import ThanhToan from './Page/ThanhToan';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './Page/auth/ResetPassword';
import NewPassword from './Page/auth/NewPassword';
import Page404 from './Page/auth/Page404';
import Page500 from './Page/auth/Page500';
import QuanLyTour from './Page/Admin/QuanLyTour/QuanLyTour';
import Test from './Test/Test';
import EditTour from './Page/Admin/QuanLyTour/EditTour';
import AddTour from './Page/Admin/QuanLyTour/AddTour';
import QuanLyBooking from './Page/Admin/QuanLyBooking/QuanLyBooking';
import UpdateBooking from './Page/Admin/QuanLyBooking/UpdateBooking';
import Chart from './Page/Admin/ThongKe/test';
import HieuThongKe from './Page/Admin/ThongKe/HieuThongKe';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ToastContainer />
      <ScrollToTop key={location.key} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tourDetail/:maTour' element={<TourDetail />} />
        <Route path='/admin' element={<Admin />}>
          <Route index element={<AdminPage />} />
          <Route path='product' element={<Product />} />
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path='quan-ly-tour' element={<QuanLyTour />} />
          <Route path='addTour' element={<AddTour />} />
          <Route path='quan-ly-tour/editTour/:maTour' element={<EditTour />} />
          <Route path='quan-ly-booking' element={<QuanLyBooking />} />
          <Route path='test' element={<Chart />} />
          <Route path='hieu' element={<HieuThongKe />} />
        </Route>

        <Route path='/booking/:maTour' element={<Booking />} />
        <Route path='/thanhToan/:maTour/:maBooking' element={<ThanhToan />} />
        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/auth/new-password/:token' element={<NewPassword />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/page500' element={<Page500 />} />
        <Route path="*" element={<Page404 />} />
        <Route path='/test' element={<Test />} />
        <Route path='/updateBooking/:maBooking' element={<UpdateBooking />} />
      </Routes>
    </div>
  );
}

export default App;