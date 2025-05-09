// src/context/SearchContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { API } from '../api';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch books once
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await API.books.getBooks();
        setBooks(data || []);
      } catch (err) {
        console.error("Error fetching books", err);
      }
    };
    fetchBooks();
  }, []);

  // Filter whenever searchTerm or selectedGenre changes
  useEffect(() => {
    let filtered = books;

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(book =>
        book.title?.toLowerCase().includes(lower) ||
        book.author?.toLowerCase().includes(lower) ||
        book.description?.toLowerCase().includes(lower) ||
        book.genre?.toLowerCase().includes(lower)
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(book => book.genre?.toLowerCase() === selectedGenre.toLowerCase());
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedGenre, books]);

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      selectedGenre,
      setSelectedGenre,
      books,
      filteredBooks
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
