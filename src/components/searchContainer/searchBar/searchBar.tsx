import React from 'react';
import './searchBar.css';
import {Book} from "../../../models/book";

interface SearchBarProps {
    searchBook: (searchTerm: string) => void;
    searchResults: Book[];
    selectBook: (book: Book) => void;
    selectedBook?: Book; // Make it optional
    addSelectedBook: () => void;
    setShowSearchBar: (show: boolean) => void;
}

interface SearchBarProps {
    searchBook: (searchTerm: string) => void;
    searchResults: Book[];
    selectBook: (book: Book) => void; // Updated to directly add book to the table
    selectedBook?: Book; // Make it optional
    setShowSearchBar: (show: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
                                                 searchBook,
                                                 searchResults,
                                                 selectBook, // Updated to directly add book to the table
                                                 selectedBook,
                                                 setShowSearchBar,
                                             }) => {
    return (
        <div className="searchBar-container">
            <div className="searchBar">
                <input type="text" onChange={(e) => searchBook(e.target.value)} />
                <ul>
                    {searchResults.map((book) => (
                        <li key={book.id}>
                            <div className="book-container">
                                {book.title}
                            </div>
                            <div className="button-plus">
                                <button onClick={() => {
                                    selectBook(book); // Call selectBook directly to add the book to the table
                                    setShowSearchBar(false); // Close the search bar after adding the book
                                    alert('Book added successfully!'); // Show alert when a book is added
                                }}>+</button> {/* Call selectBook directly */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="cancel-button">
                <button onClick={() => setShowSearchBar(false)}>X</button>
            </div>
        </div>
    );
};

export default SearchBar;
