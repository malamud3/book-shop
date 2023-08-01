import React from 'react';
import './matrixBookTable.css'; // Rename the CSS file to matrixBookTable.css
import '../CardTableView/cardTableView.css'; // Import the CSS file for CardTableView
import BookActions from '../bookActions/bookActions';
import CardBook from '../../cardBook/cardBook';
import { Book } from '../../../models/book';
import CardTableView from '../CardTableView/cardTableView';
import {deleteBook, useUpdateUI} from "../../../bll/bookLogic"; // Import the CardTableView component

interface MatrixBookTableProps {
    cardStyle?: boolean;
    books: Book[];
}

const MatrixBookTable: React.FC<MatrixBookTableProps> = ({ cardStyle, books }) => {
    const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
    const setBooks = React.useState<Book[]>([])[1]; // Declare setBooks function

    useUpdateUI(setBooks);

    const handleReadBook = (book: Book) => {
        setSelectedBook(book);
    };

    const handleDeleteBook = async (bookId: string) => {
        try {
            await deleteBook(bookId, setBooks);
            setSelectedBook(null);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div>
            {cardStyle ? ( // Render CardTableView when cardStyle is true
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
                                    bookTitle={book.title}
                                    img={book.url}
                                    description={book.description}
                                    onRead={() => handleReadBook(book)}
                                    onUpdate={() => alert(`Update book: ${book.price}`)}
                                    onDelete={() => handleDeleteBook(book.id)}
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
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </div>
    );
};

export default MatrixBookTable;
