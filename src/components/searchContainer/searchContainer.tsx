import React, { useState } from 'react';
import SearchBar from './searchBar/searchBar';
import bookService from '../../networking/bookService';
import { Book } from '../../models/book';
import './SearchContainer.css'

interface SearchContainerProps {
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ setBooks }) => {
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const searchBook = async (searchTerm: string) => {
        try {
            const results = await bookService.getBooks(searchTerm);
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        }
    };

    const selectBook = (book: Book) => {
        setSelectedBook(book);
    };

    const addSelectedBook = () => {
        if (selectedBook) {
            setBooks((prevBooks) => [...prevBooks, selectedBook]);
            setSelectedBook(null);
        }
    };

    const setShowSearchBar = (show: boolean) => {
        setSelectedBook(null);
    };

    // Render the SearchBar conditionally based on selectedBook existence
    return selectedBook ? (
        <SearchBar
            searchBook={searchBook}
            searchResults={searchResults}
            selectBook={selectBook}
            selectedBook={selectedBook}
            addSelectedBook={addSelectedBook}
            setShowSearchBar={setShowSearchBar}
        />
    ) : (
        <div className="search-container">
            <button className="search-button" onClick={() => setSelectedBook({} as Book)}>
                Search Books
            </button>
        </div>
    );
};

export default SearchContainer;


