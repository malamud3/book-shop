import { Book } from '../models/book';
import dbManager from "../DB/dbManager";
import bookService from "../networking/bookService";
import React, {useEffect} from "react";

export const searchBook = async (searchTerm: string): Promise<Book[]> => {
    try {
        const results = await bookService.getBooks(searchTerm);
        return results;
    } catch (error) {
        console.error('Error searching books:', error);
        return [];
    }
};

export const addSelectedBook = async  (
    book: Book,
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>,
    setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>
) => {
    try {

        // Check if the book already exists in localStorage
        const bookExists = await dbManager.isBookExists(book.id);

        if (bookExists) {
            console.warn('Book already exists in localStorage:', book);
            return;
        }

        // Add the book to the local storage using bookService
        await bookService.addGoogleBook({ Book: book });

        // Add the book to table
        setBooks((prevBooks) => [...prevBooks, book]);
        setSelectedBook(book);
    } catch (error) {
        console.error('Error adding book:', error);
    }
};

export const deleteBook = async (
    bookId: string,
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>,
) => {
    try {
        await dbManager.deleteBook(bookId);

        // Remove the book from table .
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
        console.error('Error deleting book:', error);
    }
};

export const useUpdateUI = (setBooks: React.Dispatch<React.SetStateAction<Book[]>>) => {
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
) => {
    const book = books.find((book) => book.id === bookId);
    if (book) {
        setSelectedBook(book);
    }
};
