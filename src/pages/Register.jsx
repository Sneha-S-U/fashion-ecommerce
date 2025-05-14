import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import './Auth.css';



export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', password: '', email: '', address: '', phone_no : ''
  });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const validators = {
    username:     v => v.trim().length >= 3            || 'Username must 3 chars',
    password:     v => v.length >= 6                   || 'Password must 6 chars',
    email:        v => /^\S+@\S+\.\S+$/.test(v)        || 'Invalid email',
    address:      v => v.trim() !== ''                 || 'Address required',
    phone_no: v => /^\d{10}$/.test(v)              || 'Phone must be 10 digits',
  };

  const validateField = (f, v) => {
    const res = validators[f]?.(v);
    return res === true ? null : res;
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(p => ({ ...p, [id]: value }));
    if (touched[id]) {
      setErrors(p => ({ ...p, [id]: validateField(id, value) }));
    }
  };

  const handleBlur = e => {
    const { id, value } = e.target;
    setTouched(p => ({ ...p, [id]: true }));
    setErrors(p => ({ ...p, [id]: validateField(id, value) }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  
  const newErrs = {};
  Object.entries(formData).forEach(([f, v]) => {
    const err = validateField(f, v);
    if (err) newErrs[f] = err;
  });
  setErrors(newErrs);
  setTouched({
    username: true, password: true, email: true,
    address: true, phone_no : true
  });

  if (Object.keys(newErrs).length) return;

  try {
    
    const response = await axios.post('http://127.0.0.1:8000/api/users/register/', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

   
    if (response.status === 201) {
      toast.success('Registration successful!');
      navigate('/login'); 
    }
  } catch (error) {
    // Handle errors (e.g., already existing user or server errors)
    if (error.response) {
      toast.error(`Error: ${error.response.data.detail || 'Something went wrong'}`);
    } else {
      toast.error('Error: Could not connect to the server.');
    }
  }
};

  const fields = [
    { id:'username', label:'Username', type:'text'     },
    { id:'password', label:'Password', type:'password' },
    { id:'email',    label:'Email',    type:'email'    },
    { id:'address',  label:'Address',  type:'text'     },
    { id:'phone_no', label:'Phone Number ', type:'tel' }
  ];

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {fields.map(({id,label,type}) => (
          <div
            key={id}
            className={`form-group${errors[id] ? ' invalid' : ''}`}
          >
            <label htmlFor={id}>{label}</label>
            <input
              id={id}
              type={type}
              value={formData[id]}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors[id] && <div className="error-text">{errors[id]}</div>}
          </div>
        ))}

        <button type="submit" className="auth-btn">Register</button>

        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

