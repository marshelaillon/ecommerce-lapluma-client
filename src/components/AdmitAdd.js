import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../store/slices/isUserAuth';
import { BASE_URL } from '../../utils/environment.js';
function AdminAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.isUserAuth);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editorial, setEditorial] = useState('');
  const [genre, setGenre] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [image, setImage] = useState('');
  const Swal = require('sweetalert2');
  const token = JSON.parse(localStorage.getItem('user')).token;

  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
  }, [navigate]);
  const handleTitle = function (e) {
    setTitle(e.target.value);
  };
  const handleAuthor = function (e) {
    setAuthor(e.target.value);
  };
  const handlePrice = function (e) {
    const valor = parseInt(e.target.value);
    setPrice(valor);
  };
  const handleQuantity = function (e) {
    const valor = parseInt(e.target.value);
    setQuantity(valor);
  };
  const handleEditorial = function (e) {
    setEditorial(e.target.value);
  };
  const handleImage = function (e) {
    setImage(e.target.value);
  };
  const handleSinopsis = function (e) {
    setSinopsis(e.target.value);
  };
  const handleGenre = function (e) {
    setGenre(e.target.value);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post(
        `${BASE_URL}/products`,
        {
          title: title,
          author: author,
          quantity: quantity,
          editorial: editorial,
          price: price,
          sinopsis: sinopsis,
          genre: genre,
          image: image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        if (res.data.id) {
          navigate('/admin');
        }
      })
      .catch(() => Swal.fire('Failed to add'));
  };
  if (!user.admin) {
    return navigate('/');
  }
  return (
    <>
      <div>
        <h3 className="table-title">Add a product </h3>
        <div className="editForm">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label className="labelAdd">Title </label>
                <input onChange={handleTitle} value={title} type="text" />
              </div>
              <div className="form-group col-md-12">
                <label>Author </label>
                <input onChange={handleAuthor} value={author} type="text" />
              </div>
            </div>
            <label>Editorial </label>
            <input value={editorial} onChange={handleEditorial} type="text" />
            <br />
            <label>Quantity </label>
            <input value={quantity} onChange={handleQuantity} type="text" />
            <br />
            <label>Price </label>
            <input value={price} onChange={handlePrice} type="text" />
            <br />
            <label>Sinopsis </label>
            <input
              className="form-control sinopsis"
              onChange={handleSinopsis}
              value={sinopsis}
              type="text"
            />
            <br />
            <label>Genre </label>
            <input onChange={handleGenre} value={genre} type="text" />
            <br />
            <label>Image </label>
            <input onChange={handleImage} value={image} type="text" />
            <br />
            <button type="submit" className="btn btn-primary">
              Add{' '}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminAdd;
