import React, { useState, useCallback } from 'react';
import {Book} from "../../../../models/book";
import CardBook from "../../../cardBook/cardBook";
interface ReadButtonProps {
    book: Book;
}

const ReadButton: React.FC<ReadButtonProps> = ({ book }) => {
    const [showModal, setShowModal] = useState(false);

    const handleReadClick = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);



    return (
        <div>
            <button className="read" onClick={handleReadClick}>
                Read
            </button>

            {showModal && (
                <CardBook
                    title={book.title}
                    img={book.url}
                    description={book.description}
                    rate={book.rate ?? 0}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ReadButton;
