'use client'

import { useState, useEffect } from 'react';
import { createBook, updateBook } from '../utils/api';
import { Book } from '../models/Book';
import styles from '../styles/Home.module.css';

interface BookFormProps {
  book?: Book;
  onSubmit: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.year.toString());
      setGenre(book.genre);
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (book) {
      await updateBook(book.id, { title, author, year: parseInt(year), genre });
    } else {
      await createBook({ title, author, year: parseInt(year), genre });
    }
    onSubmit();
    setTitle('');
    setAuthor('');
    setYear('');
    setGenre('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
      <input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" required type="number" />
      <input value={genre} onChange={e => setGenre(e.target.value)} placeholder="Genre" required />
      <button type="submit">{book ? 'Update Book' : 'Add Book'}</button>
    </form>
  );
};

export default BookForm;