import {
  PageWrapper,
  AddBookCard,
  AddBookTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Textarea,
  SelectInput, // Make sure this is defined in your styles
  SubmitButton,
  Message
} from '../../assets/styles/AddBook';

import { API } from '../../api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Children's",
  "Young Adult",
  "Poetry",
  "Science",
  "Philosophy",
  "Travel",
  "Cooking",
  "Art",
  "Religion",
  "Sports",
  "Other",
];

function EditBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    condition: '',
    contactApp: '',
    contactId: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await API.books.getMyBooks();
        const foundBook = data.find((b) => b._id.toString() === bookId);

        if (!foundBook) {
          setError('Book not found or access denied');
        } else {
          setBook(foundBook);
          setForm({
            title: foundBook.title || '',
            author: foundBook.author || '',
            description: foundBook.description || '',
            genre: foundBook.genre || '',
            condition: foundBook.condition || '',
            contactApp: foundBook.contact?.app || '',
            contactId: foundBook.contact?.id || '',
          });
        }
      } catch (err) {
        setError('Failed to fetch book data');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await API.books.updateBook(bookId, {
        ...form,
        contact: {
          app: form.contactApp,
          id: form.contactId,
        },
      });
      if (res.success) {
        navigate('/my-books');
      } else {
        setError(res.error || 'Failed to update book');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      const res = await API.books.deleteBook(bookId);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.error || 'Failed to delete book');
      }
    } catch (err) {
      setError('An unexpected error occurred while deleting the book');
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <AddBookCard>Loading book data...</AddBookCard>
      </PageWrapper>
    );
  }

  if (error && !book) {
    return (
      <PageWrapper>
        <AddBookCard>
          <Message $isError>{error}</Message>
        </AddBookCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <AddBookCard>
        <AddBookTitle>Edit Book</AddBookTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="genre">Genre</Label>
            <SelectInput
              name="genre"
              id="genre"
              value={form.genre}
              onChange={handleChange}
              required
            >
              <option value="">Select Genre</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </SelectInput>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="condition">Condition</Label>
            <SelectInput
              name="condition"
              id="condition"
              value={form.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="used">Used</option>
              <option value="worn">Worn</option>
            </SelectInput>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="contactApp">Contact App</Label>
            <SelectInput
              name="contactApp"
              id="contactApp"
              value={form.contactApp}
              onChange={handleChange}
              required
            >
              <option value="">Select App</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="kakao">Kakao Talk</option>
            </SelectInput>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contactId">Your ID/Handle</Label>
            <Input
              id="contactId"
              name="contactId"
              value={form.contactId}
              onChange={handleChange}
              required
              placeholder="e.g. @yourusername, phone, or email"
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Update Book'}
          </SubmitButton>

          {error && <Message $isError>{error}</Message>}
        </Form>

        <SubmitButton
          type="button"
          onClick={handleDelete}
          style={{
            background: '#e74c3c',
            marginTop: '1.25rem',
          }}
        >
          Delete Book
        </SubmitButton>
      </AddBookCard>
    </PageWrapper>
  );
}

export default EditBook;
