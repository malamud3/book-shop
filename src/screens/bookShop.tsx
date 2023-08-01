import React, { useState } from 'react';
import { Book } from '../models/book';
import SearchContainer from '../components/searchContainer/searchContainer';
import './bookShop.css';
import { useUpdateUI } from '../bll/bookLogic';
import CardTableView from '../components/bookTable/CardTableView/cardTableView';
import MatrixTableView from '../components/bookTable/MatrixTableView/matrixBookTable';

const BookShop: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isCardView, setIsCardView] = useState<boolean>(false);
    useUpdateUI(setBooks);

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
                <button className={`view-toggle-btn ${isCardView ? '' : 'active'}`} onClick={handleCardView}>
                    <i className="fas fa-th-large"></i>
                </button>
                <button className={`view-toggle-btn ${isCardView ? 'active' : ''}`} onClick={handleTableView}>
                    <i className="fas fa-list"></i>
                </button>
            </div>

            <SearchContainer setBooks={setBooks} />
            {isCardView ? <CardTableView books={books} /> : <MatrixTableView books={books} />}

        </div>
    );
};

export default BookShop;
