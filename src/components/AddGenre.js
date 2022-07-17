import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
const Swal = require('sweetalert2');

function AddGenre() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState('');
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState('');
  const token = JSON.parse(localStorage.getItem('user')).token;

  const handleName = function (e) {
    setName(e.target.value);
  };
  useEffect(() => {
    axios
      .get('/api/genre/genres')
      .then(res => res.data)
      .then(genres => setGenres(genres));
  }, [genres, edit]);

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post(
        '/api/genre/genre',
        {
          name: name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        if (res.data.id) {
          navigate('/admin/genre');
        }
      })
      .catch(() =>
        Swal.fire({
          icon: 'error',
          title: 'Ops...',
          text: 'Please insert a name',
        })
      );
  };

  const deleteProduct = function (id) {
    axios
      .delete(`/api/genre/genre/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Swal.fire('Good job!', 'This has been deleted successfully', 'success');
        alert('Borrado con exito ');
        navigate('/admin/genre');
      });
  };

  const editProduct = function (id) {
    axios
      .put(
        `/api/genre/genre/${id}`,
        {
          name: newName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        Swal.fire('Good job!', 'Editado con exito!', 'success');
        alert('Editado con exito ');
        navigate('/admin/genre');
      });
  };

  return (
    <div className="view">
      <div>
        <h3 className="table-title">Add a Genre </h3>
        <div className="editForm">
          <form id="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label className="labelAdd">Name</label>
                <input onChange={handleName} value={name} type="text" />
                <br />
                <button type="submit" className="btn btn-primary">
                  Add{' '}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h3 className="table-title">My Genres</h3>
        <table className="table table-hover table-bordered table-dark">
          <thead className="table-title">
            <tr>
              <th scope="col">#id</th>
              <th scope="col">Name</th>
              <th scope="col">Edit genre</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genero, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{genero.id}</th>
                  <th scope="row">
                    {edit !== genero.name ? (
                      genero.name.charAt(0).toUpperCase() + genero.name.slice(1)
                    ) : (
                      <div>
                        <input
                          type="text"
                          onChange={e => setNewName(e.target.value)}
                        />

                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => editProduct(genero.id)}
                        >
                          Confirm changes
                        </button>
                      </div>
                    )}
                  </th>
                  <th scope="row">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setEdit(genero.name)}
                    >
                      Edit
                    </button>
                  </th>
                  <th scope="row">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => deleteProduct(genero.id)}
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
    </div>
  );
}

export default AddGenre;
