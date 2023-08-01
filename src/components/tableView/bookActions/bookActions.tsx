// BookActions.tsx
import React from 'react';
import './bookActions.css';
import { Book } from '../../../models/book';
import ReadButton from './btns/readButton';
import UpdateButton from './btns/updateBtn/updateButton';
import DeleteButton from './btns/deleteButton';

interface BookActionsProps {
    book: Book;

}

const BookActions: React.FC<BookActionsProps> = ({ book}) => {

    return (
        <div className="book-actions">
            <   ReadButton   book={book}  />
            <   UpdateButton book={book} />
            <   DeleteButton book={book} />
        </div>
    );
};

export default BookActions;
