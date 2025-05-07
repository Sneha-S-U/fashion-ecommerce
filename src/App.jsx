import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AppHeader from './component/Header';
import Footer from './component/Footer';
import Login from './pages/Login';  
import Register from './pages/Register';  
import Home from './pages/Home'; 

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <AppHeader />  {/* ✅ Header always visible */}

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <Footer />  {/* ✅ Footer always visible */}
      </Router>
    </div>
  );
}

export default App;
