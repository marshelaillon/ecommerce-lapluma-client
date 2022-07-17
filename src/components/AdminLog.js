import './styles.css';
import { useEffect } from 'react';
import { fetchAllBooks } from '../store/slices/getAllBooks';
import { fetchAllUsers } from '../store/slices/getAllUsers';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../../utils/environment.js';

const Swal = require('sweetalert2');

function AdminLog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books } = useSelector(state => state.allBooks);
  const { users } = useSelector(state => state.allUsers);
  const { user } = useSelector(state => state.isUserAuth);
  const token = JSON.parse(localStorage.getItem('user')).token;

  const deleteProduct = function (id) {
    axios
      .delete(`${BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        let timerInterval;
        Swal.fire({
          title: 'Removing from database',
          html: 'This will take <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(result => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
          }
        });
        dispatch(fetchAllBooks());
        navigate('/admin');
      });
  };
  const revoqueAdmin = function (id) {
    if (id === user.id) {
      Swal.fire('Not posible');
    }
    axios.put(`${BASE_URL}/users/${id}`, { admin: false }).then(() => {
      Swal.fire('User is no longer admin');
      dispatch(fetchAllUsers());
    });
  };
  const makeAdmin = function (id) {
    if (id === user.id) {
      Swal.fire('Not posible');
    }
    axios.put(`${BASE_URL}/users/${id}`, { admin: true }).then(() => {
      Swal.fire({
        title: 'Re-Confirm',
        text: 'This User will have All Admin access, are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire('Success!', 'This user is Admin now.', 'success');
        }
      });
      // ('The user is now admin');
      dispatch(fetchAllUsers());
    });
  };

  useEffect(() => {
    dispatch(fetchAllBooks());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {}, [navigate]);

  if (user.admin === null) {
    return navigate('/');
  }

  return (
    <div className="view">
      <div className="admin-btn">
        <Link to="/admin/add">
          <button type="button" className="admin-btn btn btn-primary btn-lg">
            {' '}
            Add Book{' '}
          </button>
        </Link>
        <br />

        <Link to="/admin/genre">
          <button type="button" className="admin-btn btn btn-primary btn-lg">
            {' '}
            Genres{' '}
          </button>
        </Link>

        <br />
      </div>
      <br />
      <div>
        <h3 className="table-title">My Products</h3>
        <table className="table table-hover table-bordered table-dark">
          <thead className="table-title">
            <tr className="edit-admin">
              <th scope="col">#id</th>
              <th scope="col">Title</th>
              <th scope="col">Edit product</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((producto, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{producto.id}</th>
                  <th scope="row">
                    {producto.title.charAt(0).toUpperCase() +
                      producto.title.slice(1)}
                  </th>
                  <th scope="row">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => navigate(`/admin/edit/${producto.id}`)}
                    >
                      Edit
                    </button>
                  </th>
                  <th scope="row">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => deleteProduct(producto.id)}
                    >
                      🗑️
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Link to="/admin/add">
          <button type="button" className="add-book btn btn-primary btn-lg">
            {' '}
            Add Book{' '}
          </button>
        </Link>
      </div>
      <br />
      <h3 className="table-title">My Users</h3>
      <table className="table table-hover table-bordered table-dark">
        <thead className="table-title">
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Emain Handle</th>
            <th scope="col">Admin Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((usuario, i) => {
            return (
              <tr key={i}>
                <th scope="row">{usuario.id}</th>
                <th scope="row">{usuario.email}</th>
                {usuario.admin ? (
                  <th scope="row">
                    <button
                      onClick={() => revoqueAdmin(usuario.id)}
                      type="button"
                      className="btn btn-outline-primary"
                    >
                      Revoque admin
                    </button>
                  </th>
                ) : (
                  <th>
                    <button
                      onClick={() => makeAdmin(usuario.id)}
                      type="button"
                      className="btn btn-outline-primary"
                    >
                      Make admin
                    </button>
                  </th>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminLog;
