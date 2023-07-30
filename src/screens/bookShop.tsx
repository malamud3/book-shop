import React, { useState } from 'react';
import BookTable from '../components/bookTable/bookTable';
import {Book} from "../models/book";
import SearchContainer from "../components/searchContainer/searchContainer";
import './bookShop.css'; // Import the CSS file

const BookShop: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const deleteBook = (bookId: string) => {
        const updatedBooks = books.filter((book) => book.id !== bookId);
        setBooks(updatedBooks);
    };


    return (
        <div className="book-shop-container">
            <h1 className="book-shop-title">Book Shop</h1>

            {/* Pass showAlert prop to the SearchContainer */}
            <SearchContainer setBooks={setBooks} />

            <BookTable books={books} deleteBook={deleteBook} />
        </div>
    );
};
export default BookTable;
