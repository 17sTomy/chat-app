import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/authContext'

function Register() {
  const [form, setForm] = useState({});
  const { registerUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(form);
  };
  
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

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
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              name="username"
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

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              name="password2"
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered? 
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;