'use client'

import { useState } from 'react';
import { Book } from '../models/Book';
import { deleteBook } from '../utils/api';
import styles from '../styles/Home.module.css';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: () => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <ul className={styles.bookList}>
      {books.map((book) => (
        <li key={book.id} className={styles.bookItem}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Year: {book.year}</p>
          <p>Genre: {book.genre}</p>
          <button onClick={() => onEdit(book)}>Edit</button>
          <button onClick={async () => {
            await deleteBook(book.id);
            onDelete();
          }}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;