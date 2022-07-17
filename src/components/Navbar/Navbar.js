import './style.css';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../../utils/environment';
import { fetchBooksByGenre } from '../../store/slices/genre';
import { fetchBookByTitle } from '../../store/slices/getBookByTitle';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import plumitaPNG from '../../assets/plumita.png';
import axios from 'axios';

function Navbar({ setUserOrders, userOrders, orders, setOrders }) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [user, setUser] = useState({});
  const [title, setTitle] = useState([]);

  const clickHandler = genre => {
    dispatch(fetchBooksByGenre(genre));
    navigate(`/genre/${genre}`);
  };

  const handleChange = e => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    axios
      .get(`${BASE_URL}/genre/genres`)
      .then(res => res.data)
      .then(genres => {
        setGenres(genres);
      });
  }, []);

  useEffect(() => {}, [userOrders]);
  useEffect(() => {}, [navigate]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className={'div-logo'}>
        <Link to="/">
          <img src={plumitaPNG} className="logo" alt="logo"></img>
        </Link>
      </div>
      <button
        className="navbar-toggler hamburguesa navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {user ? (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                My Account
              </a>
              <div
                className="dropdown-menu genres-container"
                aria-labelledby="navbarDropdown"
              >
                <li className="nav-item active">
                  <a
                    className={'nav-link user-buttons'}
                    onClick={() => {
                      (async () => {
                        try {
                          const userOrders = await axios.get(
                            `${BASE_URL}/orders/${user.id}`
                          );
                          setUserOrders(userOrders.data);
                          navigate(`/user/${user.id}/cart`);
                        } catch (error) {
                          console.log(error.message);
                        }
                      })();
                    }}
                  >
                    See my cart
                  </a>
                </li>
                <li className="nav-item active">
                  <a
                    className={'nav-link user-buttons'}
                    onClick={() => {
                      (async () => {
                        try {
                          const userOrders = await axios.get(
                            `${BASE_URL}/orders/${user.id}`
                          );
                          setUserOrders(userOrders.data);
                          navigate(`/user/${user.id}/history`);
                        } catch (error) {
                          console.log(error.message);
                        }
                      })();
                    }}
                  >
                    My history
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/"
                    className={'nav-link'}
                    onClick={user => {
                      localStorage.removeItem('user', user);
                    }}
                  >
                    Logout
                  </a>
                </li>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Genres
              </a>
              <div
                className="dropdown-menu genres-container"
                aria-labelledby="navbarDropdown"
              >
                {genres.map(genre => (
                  <li className="nav-item active user-buttons">
                    <a
                      onClick={() => {
                        clickHandler(genre.name);
                      }}
                      className={'dropdown-item nav-link'}
                    >
                      {genre.name[0].toUpperCase() + genre.name.slice(1)}
                    </a>
                  </li>
                ))}
              </div>
            </li>
          </ul>
          <form
            className="navbar-form form-inline my-2 my-lg-0"
            onSubmit={e => {
              e.preventDefault();
              dispatch(fetchBookByTitle(title));
              navigate(`/book/${title}`);
              e.target.reset();
            }}
          >
            <input
              className=" search-navbar form-control mr-sm-2"
              type="search"
              placeholder="Search Book"
              aria-label="Search"
              onChange={handleChange}
            ></input>
            <button className="search-btn " type="submit">
              🔎
            </button>
          </form>
        </div>
      ) : (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                My Account
              </a>
              <div
                className="dropdown-menu genres-container"
                aria-labelledby="navbarDropdown"
              >
                <li className="nav-item active">
                  <a href="/login" className={'nav-link  user-buttons'}>
                    Log In
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/register" className={'nav-link  user-buttons'}>
                    Register
                  </a>
                  <a href="/login/admin" className={'nav-link'}>
                    Admin Login
                  </a>
                </li>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Genres
              </a>
              <div
                className="genres-container dropdown-menu genres-container"
                aria-labelledby="navbarDropdown"
              >
                {genres.map(genre => (
                  <li className="nav-item active user-buttons">
                    <a
                      onClick={() => {
                        clickHandler(genre.name);
                      }}
                      className={'dropdown-item nav-link'}
                    >
                      {genre.name}
                    </a>
                  </li>
                ))}

                <div className="dropdown-divider"></div>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#"></a>
            </li>
          </ul>
          <form className="navbar-form form-inline my-2 my-lg-0">
            <input
              className=" search-navbar form-control mr-sm-2"
              type="search"
              placeholder="Search Book"
              aria-label="Search"
              onChange={e => handleChange(e)}
            ></input>
            <button
              className="search-btn "
              type="submit"
              onClick={e => {
                dispatch(fetchBookByTitle(title));
                navigate(`/book/${params.title}`);
              }}
            >
              🔎
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
