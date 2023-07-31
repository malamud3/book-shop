import React from 'react';
import './searchBar.css';
import { Book } from '../../../models/book';

interface SearchBarProps {
    searchBook: (searchTerm: string) => void;
    searchResults: Book[];
    addSelectedBook: (book: Book) => void;
    setShowSearchBar: (show: boolean) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
                                                 searchBook,
                                                 searchResults,
                                                 addSelectedBook,
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
                                    addSelectedBook(book)
                                    setShowSearchBar(false)
                                }
                                }> {/* Pass currentBooks to addSelectedBook */}
                                    +
                                </button>
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
