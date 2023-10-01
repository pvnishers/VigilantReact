import React from 'react';
import { Link } from 'react-router-dom';
import fbiImage from '../images/fbi-image.png'; 
import interpolImage from '../images/interpol-image.png';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>Welcome to Vigilant!</h1>
        <p>
          Explore the list of most wanted persons, gather information, and stay updated.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/fbi" className="mr-3">
            <img 
              src={fbiImage} 
              alt="FBI's Most Wanted"
              className="img-fluid rounded" 
              style={{ width: '400px' }} 
            />
          </Link>
          <Link to="/interpol">
            <img 
              src={interpolImage} 
              alt="Interpol's Most Wanted"
              className="img-fluid rounded" 
              style={{ width: '400px' }} 
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
