import './style_Grid.css';
import Grid from './Grid';
import Pagination from './Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchBooksByGenre } from '../store/slices/genre';

export default function GridProducts() {
  const dispatch = useDispatch();
  const { books: allBooks } = useSelector(state => state.allBooks);
  const { genre } = useSelector(state => state.genre);
  const { category } = useSelector(state => state.category);
  const location = useLocation().pathname;
  const [page, setPage] = useState(1);

  const { book } = useSelector(state => state.bookByTitle);
  const params = useParams();

  const indexOfLastBook = page * 12;
  const indexOfFirstBook = indexOfLastBook - 12;
  const currentPage = allBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = number => {
    setPage(number);
  };

  let toRender;
  if (location === '/') toRender = currentPage;
  if (location === `/book/${params.title}`) toRender = book;
  if (location === `/genre/${params.genre}`) toRender = genre;
  if (location === `/category/author`) toRender = category;
  if (location === `/category/price`) toRender = category;
  if (location === `/category/editorial`) toRender = category;

  useEffect(() => {
    dispatch(fetchBooksByGenre(params.genre));
  }, [params]);

  return (
    <>
      <section className={'grid_all_books'}>
        {toRender.map((book, i) => {
          return (
            <Link to={`/single/${book.id}`} key={i}>
              <Grid book={book} />
            </Link>
          );
        })}
      </section>
      {location !== '/' ? null : (
        <Pagination totalBooks={allBooks.length} paginate={paginate} />
      )}
    </>
  );
}
