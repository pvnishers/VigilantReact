import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/vigilant-logo-blue-white-cut.png';
import { useAuth } from '../contexts/AuthenticationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate('/login'); 
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
          <img src={logo} alt="Vigilant Core" width="200" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item mx-1 home-nav">
            <NavLink className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} exact to="/">
              <FontAwesomeIcon icon={faHouse}/>
            </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink className="nav-link" activeClassName="active" to="/fbi">FBI</NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink className="nav-link" activeClassName="active" to="/interpol">Interpol</NavLink>
            </li>
          </ul>
            <div className="d-flex mt-auto ms-auto">
              <span className="navbar-text me-2">
                Hello, {currentUser?.fullName}!
              </span>
              <button className="btn logout-button btn-outline-primary mt-auto" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
