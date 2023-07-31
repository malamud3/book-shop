import React, { useState } from 'react';
import BookTable from '../components/bookTable/bookTable';
import { Book } from '../models/book';
import SearchContainer from '../components/searchContainer/searchContainer';
import './bookShop.css'; // Import the CSS file

const BookShop: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isCardView, setIsCardView] = useState<boolean>(false);

    const deleteBook = (bookId: string) => {
        const updatedBooks = books.filter((book) => book.id !== bookId);
        setBooks(updatedBooks);
    };

    const handleCardView = () => {
        setIsCardView(true);
    };

    const handleTableView = () => {
        setIsCardView(false);
    };

    return (
        <div className="book-shop-container">
            <h1 className="book-shop-title">Book Shop</h1>
            <div className="view-toggle">
                <button
                    className={`view-toggle-btn ${isCardView ? '' : 'active'}`}
                    onClick={handleCardView}
                >
                    <i className="fas fa-th-large"></i> {/* Font Awesome th-large icon */}
                </button>
                <button
                    className={`view-toggle-btn ${isCardView ? 'active' : ''}`}
                    onClick={handleTableView}
                >
                    <i className="fas fa-list"></i> {/* Font Awesome list icon */}
                </button>
            </div>

            <SearchContainer setBooks={setBooks} />
            <BookTable books={books} deleteBook={deleteBook} /> 

        </div>
    );
};

export default BookShop;
