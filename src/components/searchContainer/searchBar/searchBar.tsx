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

const SearchBar: React.FC<SearchBarProps> = ({
                                                 searchBook,
                                                 searchResults,
                                                 selectBook,
                                                 selectedBook,
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
                                <button onClick={() => selectBook(book)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
                {selectedBook && (
                    <div className="add-selected-book">
                        <button onClick={addSelectedBook}>Add Selected Book</button>
                    </div>
                )}
            </div>
            <div className="cancel-button">
                <button onClick={() => setShowSearchBar(false)}>X</button>
            </div>
        </div>
    );
};

export default SearchBar;
