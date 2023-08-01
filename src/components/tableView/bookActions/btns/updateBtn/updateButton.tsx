import React, { useState } from 'react';
import RateUpdateWindow from './rateUpdateWindow/rateUpdateWindow';
import { Book } from "../../../../../models/book";

interface UpdateButtonProps {
    book: Book;
    onBookModify: (modifiedBook: Book) => void;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ book, onBookModify }) => {
    const [showModal, setShowModal] = useState(false);
    const [newRate, setNewRate] = useState(book.rate);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleUpdateRate = (newRate: number) => {
        setNewRate(newRate);
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRate(Number(event.target.value));
    };

    return (
        <div>
            <button className="update" onClick={handleButtonClick}>
                Update
            </button>

            {showModal && (
                <RateUpdateWindow
                    book={{ ...book, rate: newRate }} // Pass the complete book object with the updated rate
                    onUpdateRate={handleUpdateRate}
                    onRateChange={handleRateChange}
                    onClose={handleCloseModal}
                    onBookModify={onBookModify}
                />
            )}
        </div>
    );
};

export default UpdateButton;
