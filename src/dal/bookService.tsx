import { Book } from "../models/book";
import dbManager from "../data/dbManager";
import React, { useEffect } from "react";
import { fetchBooksFromApi } from "../networking/bookDataFetch";

const bookService = {
    getBooks: fetchBooksFromApi,

    addGoogleBook: async ({ Book }: { Book: Book }): Promise<Book> => {
        try {
            // Add the book using the dbManager.
            await dbManager.addBook(Book);

            // Return the added book as a Promise.
            return Promise.resolve(Book);
        } catch (error) {
            console.error('Error adding book:', error);
            throw new Error('Failed to add book to localStorage');
        }
    },

    modifyBookRate: async (bookId: string, newRate: number): Promise<void> => {
        try {
            // Modify the book rate using the dbManager.
            await dbManager.modifyBookRate(bookId, newRate);
        } catch (error) {
            console.error('Error modifying book rate:', error);
            throw new Error('Failed to modify book rate');
        }
    },

    deleteBook: async (bookId: string): Promise<void> => {
        try {
            // Delete the book using the dbManager.
            await dbManager.deleteBook(bookId);
        } catch (error) {
            console.error('Error deleting book:', error);
            throw new Error('Failed to delete book');
        }
    },
};

export const searchBook = async (searchTerm: string): Promise<Book[]> => {
    try {
        const results = await bookService.getBooks(searchTerm);
        return results;
    } catch (error) {
        console.error('Error searching books:', error);
        return [];
    }
};

export const addSelectedBook = async (
    book: Book,
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>,
    setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>
): Promise<void> => {
    try {
        // Check if the book already exists in localStorage
        const bookExists = await dbManager.isBookExists(book.id);

        if (bookExists) {
            console.warn('Book already exists in localStorage:', book);
            return;
        }

        // Add the book to the local storage using bookDataFetch
        await bookService.addGoogleBook({ Book: book });

        // Add the book to the table
        setBooks((prevBooks) => [...prevBooks, book]);
        setSelectedBook(book);
    } catch (error) {
        console.error('Error adding book:', error);
    }
};

export const deleteBook = async (
    bookId: string,
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>,
): Promise<void> => {
    try {
        await bookService.deleteBook(bookId);

        // Remove the book from table.
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
        console.error('Error deleting book:', error);
    }
};

export const useUpdateUI = (setBooks: React.Dispatch<React.SetStateAction<Book[]>>): void => {
    useEffect(() => {
        // Load books from localStorage when the component mounts.
        dbManager.getAllBooks()
            .then((allBooks: Book[]) => setBooks(allBooks))
            .catch((error: any) => console.error('Error getting all books:', error));
    }, [setBooks]); // Make sure to include setBooks in the dependency array to prevent stale closure
};

export const handleReadMore = (
    bookId: string,
    books: Book[],
    setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>
): void => {
    const book = books.find((book) => book.id === bookId);
    if (book) {
        setSelectedBook(book);
    }
};

export default bookService;
