import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/HomePage';
import FbiPage from './components/Fbi/FbiPage'; 
import InterpolPage from './components/Interpol/InterpolPage';
import Register from './components/Forms/RegisterComponent';
import Login from './components/Forms/LoginComponent';
import { AuthenticationProvider, useAuth } from './contexts/AuthenticationContext';
import './css/styles.css';
import './App.css';

const Protected = ({ children }) => {
  const { currentUser } = useAuth(); 

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Fragment>{children}</Fragment>;
};

const RoutesWithNavbar = () => {
  const location = useLocation();
  
  return (
    <Fragment>
      {(location.pathname !== '/login' && location.pathname !== '/register') && <Navbar />}
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/fbi" element={<Protected><FbiPage /></Protected>} />
        <Route path="/interpol" element={<Protected><InterpolPage /></Protected>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Fragment>
  );
};


const App = () => {
  return (
    <AuthenticationProvider>
      <Router>
        <RoutesWithNavbar />
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
