import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors]           = useState({});
  const [touched, setTouched]         = useState({});

  const validators = {
    email:    v => /^\S+@\S+\.\S+$/.test(v) || 'Invalid email format',
    password: v => v.length >= 6       || 'Password must be at least 6 chars',
  };

  const validateField = (f, v) => {
    const res = validators[f]?.(v);
    return res === true ? null : res;
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setCredentials(p => ({ ...p, [id]: value }));
    if (touched[id]) {
      setErrors(p => ({ ...p, [id]: validateField(id, value) }));
    }
  };

  const handleBlur = e => {
    const { id, value } = e.target;
    setTouched(p => ({ ...p, [id]: true }));
    setErrors(p => ({ ...p, [id]: validateField(id, value) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // validate all
    const newErrs = {};
    Object.entries(credentials).forEach(([f, v]) => {
      const err = validateField(f, v);
      if (err) newErrs[f] = err;
    });
    setErrors(newErrs);
    setTouched({ email: true, password: true });
    if (Object.keys(newErrs).length) return;

    // ---- stubbed backend call ----
    console.log('Logging in with', credentials);
    toast.success('Login stub successful!');
    navigate('/'); // redirect to Home
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {['email','password'].map(f => (
          <div
            key={f}
            className={`form-group${errors[f] ? ' invalid' : ''}`}
          >
            <label htmlFor={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</label>
            <input
              id={f}
              type={f === 'password' ? 'password' : 'email'}
              value={credentials[f]}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors[f] && <div className="error-text">{errors[f]}</div>}
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
