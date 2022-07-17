import './styles.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../../../utils/environment';
import validator from 'validator';
const Swal = require('sweetalert2');

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();

  const register = async e => {
    e.preventDefault();
    if (validator.isEmail(registerEmail)) {
      await axios.post(`${BASE_URL}/users/register`, {
        email: registerEmail,
        password: registerPassword,
      });
      Swal.fire('Registered!', 'you were register succesfully', 'success');
      navigate('/login');
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure?',
          text: 'Please, continue only if you ensure to remember your User and Password',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes Register!',
          cancelButtonText: 'Cancel!',
          reverseButtons: true,
        })
        .then(result => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Registered!',
              'Register has been successfully completed.',
              'success'
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Register has been cancelled',
              'error'
            );
          }
        });
    }
  };

  return (
    <div className="loginAdmin">
      <form className="form">
        <h1 className="loginTitle">registro</h1>
        <p className="user">Email:</p>
        <input
          className="inputs"
          placeholder="Email"
          type="text"
          onChange={e => setRegisterEmail(e.target.value)}
        />
        <p className="user">Password:</p>
        <input
          className="inputs"
          placeholder="Password"
          type="password"
          onChange={e => setRegisterPassword(e.target.value)}
        />
        <button type="submit" className="button" onClick={register}>
          {' '}
          Register{' '}
        </button>
      </form>
    </div>
  );
};

export default Register;
