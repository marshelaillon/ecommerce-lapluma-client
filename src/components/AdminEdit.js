import './styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../store/slices/isUserAuth';
const Swal = require('sweetalert2');

function AdminEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editorial, setEditorial] = useState('');
  const [genre, setGenre] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [image, setImage] = useState('');
  const { user } = useSelector(state => state.isUserAuth);
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
      .put(`/api/products/${id}`, {
        title: title,
        author: author,
        quantity: quantity,
        editorial: editorial,
        price: price,
        sinopsis: sinopsis,
        genre: genre,
        image: image,
      }, {headers: {Authorization: `Bearer ${token}`}})
      .then(res => {
        if (res.data.id) {
          navigate('/admin');
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update',
        });
      });
  };
  if (!user.admin) {
    return navigate('/');
  }
  return (
    <>
      <h3 className="table-title">Edit a product </h3>
      <div className="editForm">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input onChange={handleTitle} value={title} type="text" />
          <br />
          <label>Author</label>
          <input onChange={handleAuthor} value={author} type="text" />
          <br />
          <label>Editorial</label>
          <input value={editorial} onChange={handleEditorial} type="text" />
          <br />
          <label>Price</label>
          <input value={price} onChange={handlePrice} type="text" />
          <br />
          <label>Quantity</label>
          <input value={quantity} onChange={handleQuantity} type="text" />
          <br />
          <label>Sinopsis</label>
          <input
            className="sinopsis"
            onChange={handleSinopsis}
            value={sinopsis}
            type="text"
          />
          <br />
          <label>Genre</label>
          <input onChange={handleGenre} value={genre} type="text" />
          <br />
          <label>Image</label>
          <input onChange={handleImage} value={image} type="text" />
          <br />
          <button type="submit" className="btn btn-primary">
            Edit{' '}
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminEdit;
