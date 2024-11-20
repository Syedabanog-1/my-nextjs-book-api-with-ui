// app/utils/api.ts
import { Book } from '../models/Book';

export async function getBooks(): Promise<Book[]> {
  const response = await fetch('/api/books');
  return response.json();
}

export async function createBook(book: Omit<Book, 'id'>): Promise<Book> {
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  return response.json();
}

export async function updateBook(id: string, book: Partial<Book>): Promise<Book> {
  const response = await fetch(`/api/books?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  return response.json();
}

export async function deleteBook(id: string): Promise<void> {
  await fetch(`/api/books?id=${id}`, { method: 'DELETE' });
}