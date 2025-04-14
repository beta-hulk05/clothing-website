import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = 'http://localhost:4000';
export const currency = '₹';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  const handleSetToken = (token) => {
    setToken(token);
    localStorage.setItem('adminToken', token);
  };

  return (
    <Router>
      <div className="flex">
        {token && <Sidebar />}
        <div className="flex-1 p-6">
          <Routes>
            {token ? (
              <>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </>
            ) : (
              <Route path="*" element={<Login setToken={handleSetToken} />} />
            )}
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;