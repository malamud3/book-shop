// BookActions.tsx
import React from 'react';
import './bookActions.css';
import { Book } from '../../../models/book';
import ReadButton from './btns/readButton';
import UpdateButton from './btns/updateBtn/updateButton';
import DeleteButton from './btns/deleteButton';

interface BookActionsProps {
    book: Book;
    onBookDelete: (bookId: string) => void;
    onBookModify: (modifiedBook: Book) => void;
}

const BookActions: React.FC<BookActionsProps> = ({ book, onBookDelete,onBookModify }) => {

    return (
        <div className="book-actions">
            <   ReadButton   book={book}  />
            <   UpdateButton book={book} onBookModify={onBookModify} />
            <   DeleteButton book={book} onBookDelete={onBookDelete} />
        </div>
    );
};

export default BookActions;
