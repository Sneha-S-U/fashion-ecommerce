import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppHeader from './component/Header';
import Footer from './component/Footer';
import Login from './pages/Login';  
import Register from './pages/Register';  
import Home from './pages/Home'; 
import TopsPage from './pages/TopsPage';
import Admin from './pages/Admin';  
import Users from './pages/Users';
import Managers from './pages/Managers';
import UserProfile from './pages/UserProfile';
import ManagerProfile from './pages/ManagerProfile';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import ProductEdit from './pages/ProductEdit';


import './App.css';
// import ProducttAPI from "./Api/ProducttAPI";

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      {!hideLayout && <AppHeader />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop/tops" element={<TopsPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<Users />} />
         <Route path="/managers" element={<Managers />} />
         <Route path="/user/:id" element={<UserProfile />} />
         <Route path="/manager/:id" element={<ManagerProfile />} />
         <Route path="/products" element={<Products />} />
         <Route path="/products/view/:id" element={<ProductView />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />


{/* <Route path="/products" element={<ProducttAPI/>} /> */}

        </Routes>
      </main>

      {!hideLayout && <Footer />}
      <ToastContainer position="top-center" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
