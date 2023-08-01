import React, { useState } from 'react';
import './bookActions.css';
import CardBook from "../../cardBook/cardBook";

interface BookActionsProps {
    bookTitle: string;
    img: string;
    description?: string;
    onRead: () => void;
    onUpdate: () => void;
    onDelete: () => void;
}

const BookActions: React.FC<BookActionsProps> = ({
                                                     bookTitle,
                                                     img,
                                                     description,
                                                     onUpdate,
                                                     onDelete,
                                                 }) => {
    const [showModal, setShowModal] = useState(false);

    const handleReadClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="book-actions">
            <button className="read" onClick={handleReadClick}>
                Read
            </button>
            <button className="update" onClick={onUpdate}>
                Update
            </button>
            <button className="delete" onClick={onDelete} >
                Delete
            </button>

            {/* Show the CardBook component as a modal when "Read" button is clicked */}
            {showModal && (
                <CardBook
                    title={bookTitle}
                    img={img}
                    description={description}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default BookActions;

