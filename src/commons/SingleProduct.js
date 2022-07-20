import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './style_SingleProduct.css';
import Swal from 'sweetalert2';
import { BASE_URL } from '../utils/environment';

export const SingleProduct = ({
  orders,
  setOrders,
  userOrders,
  setUserOrders,
}) => {
  const { user } = useSelector(state => state.isUserAuth);
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BASE_URL}/products/${id}`);
        setBook(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        await axios.post(`${BASE_URL}/orders`, orders);
        const userOrders = await axios.get(`${BASE_URL}/orders/${user?.id}`);
        setUserOrders(userOrders?.data);
        setOrders([]);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [disabled]);

  return (
    <div className="single-book-container">
      <div className="image-container">
        <img src={book.image} alt={book.title} className="book-image"></img>
        {!user ? (
          <button
            className="add-to-cart"
            onClick={() => {
              Swal.fire(
                'Are you logged in?',
                'You should be logged in to buy a book',
                'question'
              );
            }}
          >
            🛒 Add to cart
          </button>
        ) : disabled ? (
          <button
            className="add-to-cart"
            onClick={() => {
              Swal.fire('Product is already on your cart!');
            }}
          >
            In cart
          </button>
        ) : (
          <button
            className="add-to-cart"
            onClick={e => {
              setOrders([
                {
                  customerId: user.id,
                  productId: book.id,
                  quantity: 1,
                  totalPrice: book.price,
                },
              ]);
              setDisabled(true);
              Swal.fire(
                'Success!',
                'This book has been add to cart!',
                'success'
              );
            }}
          >
            🛒 Add to cart
          </button>
        )}
      </div>
      <div className="book-content">
        <h2 className="title">
          {' '}
          {book.title ? book.title.toUpperCase() : ''}{' '}
        </h2>
        <h3 className="author"> {book.author} </h3>
        <div className="editorial-and-genre">
          <h4 className="editorial"> {book.editorial} </h4>
        </div>
        <div className="sinopsis-container">
          <strong className="sinopsis-word"> Sinopsis: </strong>
          <p className="sinopsis"> {book.sinopsis} </p>
        </div>
      </div>
    </div>
  );
};
