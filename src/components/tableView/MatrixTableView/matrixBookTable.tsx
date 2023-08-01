import React, { useState, useCallback } from 'react';
import './matrixBookTable.css';
import '../CardTableView/cardTableView.css';
import BookActions from '../bookActions/bookActions';
import CardBook from '../../cardBook/cardBook';
import { Book } from '../../../models/book';
import CardTableView from '../CardTableView/cardTableView';
import {  useUpdateUI } from '../../../dal/bookService';

interface MatrixBookTableProps {
    cardStyle?: boolean;
    books: Book[];
}

const MatrixBookTable: React.FC<MatrixBookTableProps> = ({ cardStyle, books }) => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [booksState, setBooks] = useState<Book[]>([]);

    useUpdateUI(setBooks);


    return (
        <div>
            {cardStyle ? (
                <CardTableView books={books} />
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.price}</td>
                            <td>
                                <BookActions
                                    book={book}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {selectedBook && (
                <CardBook
                    title={selectedBook.title}
                    img={selectedBook.url}
                    description={selectedBook.description}
                    rate={selectedBook.rate ?? 0}
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </div>
    );
};

export default MatrixBookTable;
