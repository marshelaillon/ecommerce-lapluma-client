import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchBooksByCategory } from '../../store/slices/category';
import './styles.css';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useSelector(state => state.category);

  const handleClick = category => {
    dispatch(fetchBooksByCategory(category));
    navigate(`/category/${category}`);
  };

  // return (
  //   <div className={'sidebar'}>
  //     <button onClick={() => handleClick('author')} className="sidebar-btn">
  //       Autor
  //     </button>
  //     <button onClick={() => handleClick('price')} className="sidebar-btn">
  //       Precio
  //     </button>
  //     <button onClick={() => handleClick('editorial')} className="sidebar-btn">
  //       Editorial
  //     </button>
  //   </div>
  // );
}
