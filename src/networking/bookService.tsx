
const bookService = {
    getBooks: async (searchTerm: string) => {
        const API_KEY = 'AIzaSyArNAGj-ldnYbnYI6wip-hJyekCZV8QqcQ';

        const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch books from the Google Books API');
            }

            const data = await response.json();
            const bookData = data.items || [];

            // Show only the first 5 results
            const limitedResults = bookData.slice(0, 5);

            return limitedResults.map((book: any) => {
                const { id, volumeInfo } = book;
                const title: string = volumeInfo.title || 'No title available';
                const price: number = Math.floor(Math.random() * 47) + 5; // Random price between 5 and 51
                const img: string = volumeInfo.imageLinks?.thumbnail || 'N/A';
                const rate: number = volumeInfo.averageRating || 0;
                const desc: string = volumeInfo.description || 'No description available';

                // Return an object containing book information
                return { id, title, url: img, description: desc, price, rate };
            });
        } catch (error) {
            // If an error occurs during the API request or parsing, throw an error with a message
            const errorMessage = (error as { message: string }).message;
            throw new Error(`Error fetching books: ${errorMessage}`);
        }
    },

    // @TODO: Add other book-related functions if needed
};

export default bookService;
