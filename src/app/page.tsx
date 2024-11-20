'use client'

import { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { getBooks } from './utils/api';
import { Book } from './models/Book';
import styles from './styles/Home.module.css';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  const handleSubmit = () => {
    fetchBooks();
    setEditingBook(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Management</h1>
      <BookForm book={editingBook || undefined} onSubmit={handleSubmit} />
      <BookList books={books} onEdit={handleEdit} onDelete={fetchBooks} />
    </div>
  );
}