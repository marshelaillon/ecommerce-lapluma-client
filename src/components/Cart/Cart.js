import './styles.css';
import axios from 'axios';
import { BASE_URL } from '../../utils/environment.js';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Swal = require('sweetalert2');

function Cart({ orders, setOrders, userOrders, setUserOrders }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [shipping, setShipping] = useState(500);
  const { user } = useSelector(state => state.isUserAuth);

  useEffect(() => {}, [shipping, userOrders]);

  return (
    <div className="snippet-body">
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
              </div>
            </div>
            <div className="row border-top border-bottom">
              {userOrders.map((order, i) => (
                <div className="row main align-items-center" key={i}>
                  <div className="col-2">
                    <img
                      className="img-fluid"
                      src={`${order.book.image}`}
                      alt={`${order.book.title}`}
                    ></img>
                  </div>
                  <div className="col">
                    <div className="row text-muted">
                      {order.book.title[0].toUpperCase() +
                        order.book.title.slice(1)}
                    </div>
                  </div>
                  <div className="col">
                    <input
                      onChange={e => {
                        (async () => {
                          try {
                            await axios.put(`${BASE_URL}/orders/${order.id}`, {
                              quantity: e.target.value,
                              totalPrice: e.target.value * order.book.price,
                            });
                            const updatedOrders = await axios.get(
                              `${BASE_URL}/orders/${user.id}`
                            );
                            setUserOrders(updatedOrders.data);
                            navigate(`/user/${id}/cart`);
                          } catch (error) {
                            console.log(error);
                          }
                        })();
                      }}
                      className="border"
                      type="number"
                      defaultValue={1}
                      min={1}
                      max={order.book.quantity}
                    ></input>
                  </div>
                  <div className="col">
                    {' '}
                    Price:{' '}
                    <span
                      style={{
                        color: '#777',
                        fontSize: '1.5rem',
                      }}
                    >
                      ${order.book.price * order.quantity}
                    </span>
                  </div>
                  <div className="col">
                    <button
                      className="delete-button"
                      onClick={() => {
                        (async () => {
                          try {
                            await axios.delete(
                              `${BASE_URL}/orders/${order.id}`
                            );
                            const updatedOrders = await axios.get(
                              `${BASE_URL}/orders/${id}`
                            );
                            setUserOrders(updatedOrders.data);
                            navigate(`/user/${id}/cart`);
                          } catch (error) {
                            console.log(error);
                          }
                        })();
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="back-to-shop">
              <Link to="/">
                <span className="text-muted">Back to shop</span>
              </Link>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <form>
              <p>SHIPPING</p>
              <select
                onChange={e => {
                  setShipping(e.target.value);
                }}
              >
                <option value={500} className="text-muted">
                  Standard Delivery - AR$500
                </option>
                <option value={900} className="text-muted">
                  Day Delivery - AR$900
                </option>
              </select>
            </form>
            <div className="row-totalprice totalrice">
              <div className="col" id="total-price">
                TOTAL PRICE: AR$
                {userOrders.reduce(
                  (acc, order) => +order.totalPrice + acc,
                  +shipping
                )}
              </div>
            </div>
            <button
              className="checkout-button"
              onClick={() => {
                (async () => {
                  try {
                    userOrders.map(
                      async order =>
                        await axios.put(`${BASE_URL}/orders/${order.id}`, {
                          status: 'complete',
                        })
                    );
                    const updatedOrders = await axios.get(
                      `${BASE_URL}/orders/${user.id}`
                    );
                    setUserOrders(updatedOrders.data);
                    setOrders([]);
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Thanks! You will be receiving your order soon!',
                      showConfirmButton: false,
                      timer: 3800,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                })();
              }}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
