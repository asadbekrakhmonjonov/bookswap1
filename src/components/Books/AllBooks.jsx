import React, { useState, useEffect } from "react";
import { API } from '../../api';
import {
  SearchContainer,
  GenreFilterContainer,
  GenreButton,
  BookCard,
  BookImage,
  BookContent,
  BookAuthor,
  BookDescription,
  BookMeta,
  LikeButton,
  AddedBy,
  EmptyMessage,
  GenreTitle,
  BookTitle,
  BooksContainer,
  BookContact,
  StyledLink,
  BookCondition,
  BookGenre
} from '../../assets/styles/Dashboard';

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [user, setUser] = useState(null);
  const [usernames, setUsernames] = useState({});
  const [likedBooks, setLikedBooks] = useState({});
  const [expandedBooks, setExpandedBooks] = useState({});

  const GENRES = [
    "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery", "Thriller",
    "Romance", "Horror", "Biography", "History", "Self-Help", "Business", "Children's",
    "Young Adult", "Poetry", "Science", "Philosophy", "Travel", "Cooking", "Art",
    "Religion", "Sports", "Other",
  ];

  useEffect(() => {
    const fetchBooksAndUser = async () => {
      try {
        const { data: booksData } = await API.books.getBooks();
        setBooks(booksData || []);
        setFilteredBooks(booksData || []);

        const { data: userData } = await API.auth.getProfile();
        setUser(userData);

        const uniqueUserIds = [...new Set((booksData || []).map(book => book.userId))];
        const usernamesMap = {};
        await Promise.all(uniqueUserIds.map(async (id) => {
          const response = await API.auth.getUserById(id);
          usernamesMap[id] = response.success ? response.data.username : 'Unknown';
        }));

        setUsernames(usernamesMap);
      } catch (err) {
        setError(err?.status === 401 ? 'Please login to view your books' : err?.message || 'Failed to load your books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooksAndUser();
  }, []);

  useEffect(() => {
    let filtered = books;

    if (searchTerm.trim() !== '') {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(book =>
        book.title?.toLowerCase().includes(lowercasedSearch) ||
        book.author?.toLowerCase().includes(lowercasedSearch) ||
        book.description?.toLowerCase().includes(lowercasedSearch) ||
        book.genre?.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(book => book.genre?.toLowerCase() === selectedGenre.toLowerCase());
    }

    setFilteredBooks(filtered);
  }, [searchTerm, books, selectedGenre]);

  const handleLike = async (bookId) => {
    try {
      const isLiked = likedBooks[bookId];
      const response = await API.books.likeBook(bookId);

      if (response.success) {
        const updatedBooks = books.map(book =>
          book._id === bookId ? { ...book, likes: book.likes + (isLiked ? -1 : 1) } : book
        );
        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
        setLikedBooks(prev => ({
          ...prev,
          [bookId]: !isLiked,
        }));
      } else {
        setError('Failed to like the book');
      }
    } catch (err) {
      setError('Failed to like the book');
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

  const toggleDescription = (bookId) => {
    setExpandedBooks(prevState => ({
      ...prevState,
      [bookId]: !prevState[bookId]
    }));
  };

  const getContactLink = (app, id) => {
    switch (app) {
      case 'telegram':
        return `https://t.me/${id}`;
      case 'whatsapp':
        return `https://wa.me/${id}`;
      case 'email':
        return `mailto:${id}`;
      case 'kakao':
        return `https://kakao.talk/${id}`;
      default:
        return null;
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search books by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <GenreFilterContainer>
        <GenreTitle>Filter by Genre:</GenreTitle>
        {GENRES.map(genre => (
          <GenreButton
            key={genre}
            onClick={() => handleGenreClick(genre)}
            $active={genre === selectedGenre}
          >
            {genre}
          </GenreButton>
        ))}
      </GenreFilterContainer>

      {books.length === 0 ? (
        <EmptyMessage>No books yet</EmptyMessage>
      ) : filteredBooks.length === 0 ? (
        <EmptyMessage>No books found matching your criteria</EmptyMessage>
      ) : (
        <BooksContainer>
          {filteredBooks.map((book) => (
            <BookCard key={book._id}>
              {book.image?.url && (
                <BookImage src={book.image.url} alt={book.title} />
              )}
              <BookContent>
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>by {book.author}</BookAuthor>
                {book.condition && <BookCondition>{book.condition}</BookCondition>}
                {book.genre && <BookGenre>{book.genre}</BookGenre>}
                {expandedBooks[book._id] && (
                  <BookDescription $isExpanded>{book.description}</BookDescription>
                )}
                {!expandedBooks[book._id] && (
                  <span onClick={() => toggleDescription(book._id)} style={{ color: '#4fd1c5', cursor: 'pointer', fontWeight: '500' }}>
                    Show More
                  </span>
                )}
                {expandedBooks[book._id] && (
                  <span onClick={() => toggleDescription(book._id)} style={{ color: '#4fd1c5', cursor: 'pointer', fontWeight: '500' }}>
                    Show Less
                  </span>
                )}
                <BookMeta>
                  <LikeButton
                    onClick={() => handleLike(book._id)}
                    $isActive={likedBooks[book._id]}
                  >
                    {likedBooks[book._id] ? '❤️' : '♡'} Like ({book.likes || 0})
                  </LikeButton>
                  {book.userId && (
                    <AddedBy>
                      <strong>Added by:</strong> {usernames[book.userId] || 'Unknown'}
                    </AddedBy>
                  )}
                </BookMeta>
                {book.contact?.app && book.contact?.id && (
                  <BookContact>
                    {book.contact.app}: 
                    {getContactLink(book.contact.app, book.contact.id) ? (
                      <StyledLink 
                        href={getContactLink(book.contact.app, book.contact.id)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {book.contact.id}
                      </StyledLink>
                    ) : (
                      <span>{book.contact.id}</span>
                    )}
                  </BookContact>
                )}
              </BookContent>
            </BookCard>
          ))}
        </BooksContainer>
      )}
    </div>
  );
}

export default AllBooks;
