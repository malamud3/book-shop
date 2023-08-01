import React from 'react';
import './cardBook.css';

interface CardBookProps {
    title: string;
    img: string;
    description?: string;
    rate: number ;
    onClose: () => void;
}

const CardBook: React.FC<CardBookProps> = ({ title, img, description, rate, onClose }) => {
    return (
        <div className="book-modal">
            <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
                <h2>{title}</h2>
                <img src={img} alt="No img" />
                {description && <p>{description}</p>}
                {rate !== null && <p className="rate">Rate: {rate}</p>} {/* Add the rate display here */}
            </div>
        </div>
    );
};

export default CardBook;
