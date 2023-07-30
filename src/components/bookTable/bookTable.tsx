import React, { useState, useCallback } from 'react';
import './bookTable.css';
import { Book } from '../../models/book';
import BookActions from './bookActions/bookActions';
import CardBook from "../cardBook/cardBook";

interface BookTableProps {
    books: Book[];
    deleteBook: (bookId: string) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, deleteBook }) => {
    const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);

    const handleReadBook = (book: Book) => {
        setSelectedBook(book);
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.price}</td>
                        <td>
                            <BookActions
                                bookTitle={book.title}
                                img={book.url}
                                description={book.description}
                                onRead={() => handleReadBook(book)}
                                onUpdate={() => alert(`Update book: ${book.price}`)}
                                onDelete={() => deleteBook(book.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedBook && (
                <CardBook
                    title={selectedBook.title}
                    img={selectedBook.url}
                    description={selectedBook.description}
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </div>
    );
};

export default BookTable;
