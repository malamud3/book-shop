import React, {  useState } from 'react';
import SearchBar from './searchBar/searchBar';
import bookService from '../../networking/bookService';
import { Book } from '../../models/book';
import './searchContainer.css';
import dbManager from "../../DB/dbManager";

interface SearchContainerProps {
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ setBooks }) => {
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const searchBook = async (searchTerm: string) => {
        try {
            const results = await bookService.getBooks(searchTerm);

            // Check if results is not undefined before updating the state
            if (results !== undefined) {
                setSearchResults(results);
            } else {
                // Handle the case when results is undefined (optional)
                console.warn('No results found for the search term:', searchTerm);
            }
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const addSelectedBook = async (book: Book) => {
        try {
            // Check if the book already exists in localStorage
            const bookExists = await dbManager.isBookExists(book.id);

            if (bookExists) {
                // Handle the case when the book already exists
                console.warn('Book already exists in localStorage:', book);
                return; // Stop execution since the book already exists
            }

            // Add the book to the local storage using bookService
            await bookService.addGoogleBook({ Book: book });

            // Add the book to the state
            setBooks((prevBooks) => [...prevBooks, book]);
            setSelectedBook(book);
        } catch (error) {
            console.error('Error adding book:', error);
        }
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
            searchBook={searchBook}
            searchResults={searchResults}
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
