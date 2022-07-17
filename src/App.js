import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import History from './components/Historial/History';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllBooks } from './store/slices/getAllBooks';
import GridProducts from './commons/GridProducts';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router';
import Cart from './components/Cart/Cart';
import AdminLog from './components/AdminLog';
import AdminAdd from './components/AdmitAdd';
import AdminEdit from './components/AdminEdit';
import AdminLogIn from './components/AdminLogin';
import { SingleProduct } from './commons/SingleProduct';
import { setUser } from './store/slices/isUserAuth';
import AddGenre from './components/AddGenre';

function App() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchAllBooks());
    dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
  }, [dispatch]);

  return (
    <div className="app-container">
      <Navbar
        orders={orders}
        setOrders={setOrders}
        userOrders={userOrders}
        setUserOrders={setUserOrders}
      />
      <div className="page-container">
        <section className={'sidebar-section'}>
          <Sidebar />
        </section>
        <section className={'books-section'}>
          <Routes>
            <Route path="/" element={<GridProducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminLog />} />
            <Route path="/admin/add" element={<AdminAdd />} />
            <Route path="/admin/edit/:id" element={<AdminEdit />} />
            <Route path="/login/admin" element={<AdminLogIn />} />
            <Route path="/category/author" element={<GridProducts />} />
            <Route path="/category/price" element={<GridProducts />} />
            <Route path="/category/editorial" element={<GridProducts />} />
            <Route
              path="/single/:id"
              element={
                <SingleProduct
                  orders={orders}
                  setOrders={setOrders}
                  userOrders={userOrders}
                  setUserOrders={setUserOrders}
                />
              }
            />
            <Route path="/book/:title" element={<GridProducts />} />
            <Route path="/genre/:genre" element={<GridProducts />} />
            <Route
              path="/user/:id/cart"
              element={
                <Cart
                  orders={orders}
                  setOrders={setOrders}
                  userOrders={userOrders}
                  setUserOrders={setUserOrders}
                />
              }
            />
            <Route
              path="/user/:id/history"
              element={
                <History
                  userOrders={userOrders}
                  setUserOrders={setUserOrders}
                />
              }
            />
            <Route path="/admin/genre" element={<AddGenre />} />
          </Routes>
        </section>
      </div>
      {/* <Footer className="footer" /> */}
    </div>
  );
}

export default App;
