import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/authContext'
import "../styles/forms.css"

function Login() {
  const [form, setForm] = useState({});
  const { loginUser } = useContext(AuthContext)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    loginUser(form);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#1976D1" }}>
              Login
            </button>
          </div>
          <p className="forgot-password text-right">
            <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;