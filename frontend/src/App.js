import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Page/Home';
import Login from './Page/Login';
import SignUp from './Page/Sigin'
import Admin from './Page/Admin';
import Product from './Page/Product';
import TableTest from './conponents/TableTest';
import User from './Page/Users';
import AdminPage from './Page/Admin/AdminPage';
import ProductDetail from './Page/Product/ProductDetail';
import Booking from './Page/Booking/formBooking';
import TourDetail from './Page/TourDetail';
import ScrollToTop from './util/ScrollToTop';
import LoginTest from './Page//Login/test';



function App() {
  const location = useLocation();
  return (
    <div className="App">
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
        <Route path='/login' element={<LoginTest />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/test' element={<TableTest />} />
      </Routes>
    </div>
  );
}

export default App;