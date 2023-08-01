import React from 'react';
import {Book} from "../../../models/book";

interface CardTableViewProps {
    books: Book[];
}

const CardTableView: React.FC<CardTableViewProps> = ({ books }) => {
    return (
        <div className="card-table-view">
            {books.map((book) => (
                <div className="card" key={book.id}>
                    <img src={book.url} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                </div>
            ))}
        </div>
    );
};

export default CardTableView;
