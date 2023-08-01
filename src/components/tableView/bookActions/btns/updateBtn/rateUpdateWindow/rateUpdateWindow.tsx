import React from 'react';
import { Book } from "../../../../../../models/book";
import bookService from "../../../../../../dal/bookService";

interface RateUpdateWindowProps {
    book: Book; // Assuming the book object has a 'rate' property
    onUpdateRate: (newRate: number) => void;
    onRateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
    onBookModify: (modifiedBook: Book) => void;
}

const RateUpdateWindow: React.FC<RateUpdateWindowProps> = ({
                                                               book,
                                                               onUpdateRate,
                                                               onRateChange,
                                                               onClose,
                                                               onBookModify
                                                           }) => {
    const handleUpdateButtonClick = () => {
        onUpdateRate(book.rate);
        bookService.modifyBookRate(book.id, book.rate)
            .catch((error) => {
                console.error('Error modifying book rate:', error);
            });
        const modifiedBook = { ...book, };

        onBookModify(modifiedBook);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Update Rate</h2>
                </div>
                <div className="rate-container">
                    <input type="number" className="rate-input" value={book.rate} onChange={onRateChange} />
                </div>
                <div className="modal-footer">
                    <button onClick={handleUpdateButtonClick}>Update</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default RateUpdateWindow;
