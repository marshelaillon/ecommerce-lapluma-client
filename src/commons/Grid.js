import React from 'react';
import './style_Grid.css';

const Grid = ({ book }) => {
  return (
    <div className={'grid-box'}>
      <div className={'grid-img'}>
        <img src={book.image} className={'img-book'} alt="book"></img>
      </div>
      <div className={'grid-text'}>
        <h3 className={'grid-title'}>
          {book.title[0].toUpperCase() + book?.title.slice(1)}
        </h3>
        <h4 className={'grid-author'}> {book.author} </h4>
        <p className={'grid-price'}> {`$${book.price}`} </p>
      </div>
    </div>
  );
};

export default Grid;
