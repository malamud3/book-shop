import { Book } from "../models/book";

const dbManager = {
    addBook: async (bookToAdd: Book): Promise<void> => {
        try {
            // Get existing books from localStorage (if any).
            const existingBooksJson = localStorage.getItem('books');
            const existingBooks = existingBooksJson ? JSON.parse(existingBooksJson) : [];

            // Add the new book to the existing books array.
            existingBooks.push(bookToAdd);

            // Convert the updated books array to JSON and store it in localStorage.
            localStorage.setItem('books', JSON.stringify(existingBooks));
        } catch (error) {
            console.error('Error adding book:', error);
            throw new Error('Failed to add book to localStorage');
        }
    },

    modifyBookPrice: async (bookId: string, newPrice: number): Promise<void> => {
        try {
            // Get existing books from localStorage (if any).
            const existingBooksJson = localStorage.getItem('books');
            const existingBooks = existingBooksJson ? JSON.parse(existingBooksJson) : [];

            // Find the book with the given bookId.
            const bookToUpdate = existingBooks.find((book: Book) => book.id === bookId);

            if (!bookToUpdate) {
                throw new Error('Book not found');
            }

            // Update the price of the book with the new price.
            bookToUpdate.price = newPrice;

            // Convert the updated books array to JSON and store it in localStorage.
            localStorage.setItem('books', JSON.stringify(existingBooks));
        } catch (error) {
            console.error('Error modifying book price:', error);
            throw new Error('Failed to modify book price');
        }
    },

    deleteBook: async (bookId: string): Promise<void> => {
        try {
            // Get existing books from localStorage (if any).
            const existingBooksJson = localStorage.getItem('books');
            const existingBooks = existingBooksJson ? JSON.parse(existingBooksJson) : [];

            // Find the index of the book with the given bookId.
            const bookIndexToDelete = existingBooks.findIndex((book: Book) => book.id === bookId);

            if (bookIndexToDelete === -1) {
                throw new Error('Book not found');
            }

            // Remove the book from the array.
            existingBooks.splice(bookIndexToDelete, 1);

            // Convert the updated books array to JSON and store it in localStorage.
            localStorage.setItem('books', JSON.stringify(existingBooks));
        } catch (error) {
            console.error('Error deleting book:', error);
            throw new Error('Failed to delete book');
        }
    },
    isBookExists: async (bookId: string): Promise<boolean> => {
        try {
            // Get existing books from localStorage (if any).
            const existingBooksJson = localStorage.getItem('books');
            const existingBooks = existingBooksJson ? JSON.parse(existingBooksJson) : [];

            // Check if the book with the given bookId exists in the array.
            const isExists = existingBooks.some((book: Book) => book.id === bookId);

            return isExists;
        } catch (error) {
            console.error('Error checking if book exists:', error);
            throw new Error('Failed to check if book exists');
        }
    },
};

export default dbManager;
