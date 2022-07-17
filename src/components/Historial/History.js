import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../utils/environment';
import axios from 'axios';
import { useSelector } from 'react-redux';

function History() {
  const [history, setHistory] = useState([]);
  const { user } = useSelector(state => state.isUserAuth);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BASE_URL}/orders/history/${user.id}`);
        setHistory(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="snippet-body">
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>My History</b>
                  </h4>
                </div>
              </div>
            </div>
            <div className="row border-top border-bottom">
              {history?.map((order, i) => (
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
                    {order.quantity} {order.quantity === 1 ? 'item' : 'items'}
                  </div>
                  <div className="col">
                    {' '}
                    Price: ${order.book.price * order.quantity}
                  </div>
                  <div className="col">{order.updatedAt.slice(0, 10)}</div>
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
            <div className="row-totalprice totalrice">
              <div className="col" id="total-price">
                TOTAL PRICE: AR$
                {history.reduce((acc, order) => order.totalPrice + acc, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
