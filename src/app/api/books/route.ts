import { NextRequest, NextResponse } from 'next/server';
import { Book } from '@/app/models/Book';

// Temporary in-memory storage for demonstration purposes
let books: Book[] = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Classic' },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Historical Fiction' },
    { id: '3', title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian' },
    { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance' },
    { id: '5', title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy' },
    { id: '6', title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, genre: 'Literary Fiction' },
];

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
        const book = books.find((b) => b.id === id);
        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json(book);
    }

    return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const newBook: Book = { id: String(books.length + 1), ...data };
    books.push(newBook);

    return NextResponse.json(newBook, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
    }

    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
        return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    const data = await req.json();
    books[bookIndex] = { ...books[bookIndex], ...data };

    return NextResponse.json(books[bookIndex]);
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
    }

    books = books.filter((b) => b.id !== id);

    // Return 204 with no body
    return new Response(null, { status: 204 });
}

