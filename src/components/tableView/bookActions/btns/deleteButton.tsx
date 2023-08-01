import React from 'react';
import {Book} from "../../../../models/book";
import bookService  from "../../../../dal/bookService";

interface DeleteButtonProps {
    book: Book;

}

const DeleteButton: React.FC<DeleteButtonProps> = ({ book }) => {
    const handleDeleteButtonClick = () => {
        bookService
            .deleteBook(book.id)
            .then(() => {
            })
            .catch((error) => {
                console.error('Failed to delete the book:', error);
            });
    };

    return (
        <button className="delete" onClick={handleDeleteButtonClick}>
            Delete
        </button>
    );
};

export default DeleteButton;
