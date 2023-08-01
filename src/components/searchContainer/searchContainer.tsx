import React, { useState} from 'react';
import { Book } from '../../models/book';
import {searchBook, addSelectedBook} from '../../bll/bookLogic';
import './searchContainer.css';
import SearchBar from "./searchBar/searchBar";

interface SearchContainerProps {
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ setBooks }) => {
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const handleAddSelectedBook = async (book: Book) => {
        await addSelectedBook(book, setBooks, setSelectedBook);
        console.log('addSelectedBook: Adding book', book);
    };

    const handleSearchBook = async (searchTerm: string) => {
        const results = await searchBook(searchTerm);
        setSearchResults(results);
    };

    const setShowSearchBar = (show: boolean) => {
        setSelectedBook(null);
        setTimeout(() => {
            setSearchResults([]);
        }, 10);
    };

    // Render the SearchBar conditionally based on selectedBook existence
    return selectedBook ? (
        <SearchBar
            searchBook={handleSearchBook}
            searchResults={searchResults}
            addSelectedBook={handleAddSelectedBook}
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
