import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { API } from "../../api";
import styled from 'styled-components';

import {
  BookCard,
  BookImage,
  BookContent,
  BookTitle,
  BookAuthor,
  BookDescription,
  BookMeta,
  AddedBy,
  BookLink,
  SearchContainer,
  EmptyMessage,
  BookContact,
  StyledLink,
  BooksContainer,
  EditButton
} from '../../assets/styles/Dashboard';


function MyBooks() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBooks, setExpandedBooks] = useState({});

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const { data } = await API.books.getMyBooks();
        setBooks(data || []);
        setFilteredBooks(data || []);
      } catch (err) {
        setError(
          err.status === 401
            ? 'Please login to view your books'
            : err.error || 'Failed to load your books'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, []);

  useEffect(() => {
    let filtered = books;

    if (searchTerm.trim() !== '') {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(book =>
        book.title?.toLowerCase().includes(lowercasedSearch) ||
        book.author?.toLowerCase().includes(lowercasedSearch) ||
        book.description?.toLowerCase().includes(lowercasedSearch)
      );
    }

    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const toggleDescription = (bookId) => {
    setExpandedBooks(prevState => ({
      ...prevState,
      [bookId]: !prevState[bookId]
    }));
  };

  if (loading) return <EmptyMessage>Loading your books...</EmptyMessage>;
  
  if (error) return <EmptyMessage $error>Error: {error}</EmptyMessage>;
  
  if (!books.length) return <EmptyMessage>You haven't added any books yet.</EmptyMessage>;

  return (
    <>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search books by title, author, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <BooksContainer>
        {filteredBooks.map((book) => (
          <BookCard key={book._id}>
            {book.image?.url && (
              <BookImage src={book.image.url} alt={book.title} />
            )}
            <BookContent>
              <BookTitle>{book.title}</BookTitle>
              <BookAuthor>{book.author}</BookAuthor>
              {book.description && (
                <BookDescription isExpanded={expandedBooks[book._id]}>
                  {expandedBooks[book._id] ? book.description : `${book.description.slice(0, 100)}...`}
                  <span onClick={() => toggleDescription(book._id)}>
                    {expandedBooks[book._id] ? ' Show Less' : ' Show More'}
                  </span>
                </BookDescription>
              )}
              <BookMeta>
                <AddedBy>
                  Added on: {new Date(book.createdAt).toLocaleDateString()}
                </AddedBy>
                <BookLink to={`/edit-book/${book._id}`}>
                  <EditButton>Edit</EditButton>
                </BookLink>
              </BookMeta>
              {book.contact?.app && book.contact?.id && (
                <BookContact>{book.contact.app}: {book.contact.id}</BookContact>
              )}
            </BookContent>
          </BookCard>
        ))}
      </BooksContainer>
    </>
  );
}

export default MyBooks;