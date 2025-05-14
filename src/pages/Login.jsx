import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  
  const validators = {
    username: v => v.trim() !== '' || 'Username is required',
    password: v => v.trim() !== '' || 'Password is required',
  };

  const validateField = (f, v) => {
    const res = validators[f]?.(v);
    return res === true ? null : res;
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setCredentials(prev => ({ ...prev, [id]: value }));

    if (touched[id]) {
      setErrors(prev => ({ ...prev, [id]: validateField(id, value) }));
    }
  };

  const handleBlur = e => {
    const { id, value } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    setErrors(prev => ({ ...prev, [id]: validateField(id, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(credentials).forEach(([field, value]) => {
      const err = validateField(field, value);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    setTouched({ username: true, password: true });

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', credentials, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { access, role } = response.data;

    if (access) {
      localStorage.setItem('authToken', access);
      localStorage.setItem('userRole', role); // Store role

      toast.success('Login successful!');

      // Redirect based on role
      if (role === 'admin' || role === 'manager') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.detail || 'Login failed'}`);
      } else {
        toast.error('Error: Could not connect to the server.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {['username', 'password'].map(field => (
          <div key={field} className={`form-group${errors[field] ? ' invalid' : ''}`}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              id={field}
              type={field === 'password' ? 'password' : 'text'}
              value={credentials[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors[field] && <div className="error-text">{errors[field]}</div>}
          </div>
        ))}

        <button type="submit" className="auth-btn">Login</button>

        <p className="auth-footer">
          Don't have an account? <a href="/register">Signup</a>
        </p>
      </form>
    </div>
  );
}
