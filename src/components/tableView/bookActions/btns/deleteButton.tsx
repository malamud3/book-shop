import React from 'react';
import {Book} from "../../../../models/book";
import bookService  from "../../../../dal/bookService";

interface DeleteButtonProps {
    book: Book;
    onBookDelete: (bookId: string) => void;

}

const DeleteButton: React.FC<DeleteButtonProps> = ({ book, onBookDelete }) => {
    const handleDeleteButtonClick = () => {
        bookService
            .deleteBook(book.id)
            .then(() => {
                // Call the onBookDelete callback after successful deletion
                onBookDelete(book.id);
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
