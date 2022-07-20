import './Register/styles.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/isUserAuth';
import { BASE_URL } from '../utils/environment.js';

function AdminLogIn() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async e => {
    e.preventDefault();
    try {
      const user = await axios.post(`${BASE_URL}/admin/login`, {
        email: loginEmail,
      });
      localStorage.setItem('user', JSON.stringify(user.data));
      dispatch(setUser(JSON.parse(localStorage.getItem('user'))));

      if (user.data.admin === true) {
        navigate('/admin');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="loginAdmin">
      <form className="form">
        <h1 className="loginTitle">Login as Admin</h1>
        <p className="user">Email:</p>
        <input
          className="inputs"
          placeholder="Email"
          type="text"
          onChange={e => setLoginEmail(e.target.value)}
        />
        <p className="user">Password:</p>
        <input
          className="inputs"
          placeholder="Password"
          type="password"
          onChange={e => setLoginPassword(e.target.value)}
        />
        <button className="button" type="submit" onClick={login}>
          {' '}
          Submit{' '}
        </button>
      </form>
    </div>
  );
}

export default AdminLogIn;
