import '../Register/styles.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/isUserAuth';
const Swal = require('sweetalert2');

const Login = () => {
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const login = async e => {
    e.preventDefault();
    if (validator.isEmail(loginEmail)) {
      try {
        const user = await axios.post('/api/users/login', {
          email: loginEmail,
          password: loginPassword,
        });
        localStorage.setItem('user', JSON.stringify(user.data));
        if (user.data.admin === true) {
          navigate('/admin');
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Welcome!',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/');
        }
      } catch (error) {
        console.log(error.response);
      }
    } else {
      Swal.fire('Please, set a valid e-mail!');
    }
  };

  return (
    <div className="loginAdmin">
      <form
        className="form"
        onSubmit={() => {
          dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
          navigate('/');
        }}
      >
        <h1 className="loginTitle">Login</h1>
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
        <button type="submit" className="button" onClick={login}>
          {' '}
          Submit{' '}
        </button>
      </form>
    </div>
  );
};

export default Login;
