import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthenticationContext';
import logo from '../../images/vigilant-logo-blue-white-cut.png';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container-fluid background-color pt-5">
        <img className='mx-auto d-block mb-5' src={logo} alt="Vigilant Core" width="200" />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary mx-auto d-block">Login</button>
              </form>
            </div>
          </div>
          <div className='register-sec text-center my-5'>
              <p>Doesn´t have an account? Register now</p>  
              <button type="button" className="btn btn-secondary" onClick={handleRegister}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
