import { API } from '../../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import {
  Form,
  FormGroup,
  Label,
  Input,
  Textarea,
  SelectInput,
  FileInput,
  ImagePreview,
  SubmitButton,
  Message,
  HelperText,
  AddBookTitle
} from '../../assets/styles/AddBook';

function AddBookForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    description: '',
    image: null,
    contactApp: '',
    contactId: '',
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: file }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        const payload = {
          title: formData.title,
          author: formData.author,
          genre: formData.genre,
          condition: formData.condition,
          description: formData.description,
          image: base64Image,
          contact: {
            app: formData.contactApp,
            id: formData.contactId,
          },
        };

        await API.books.createBook(payload);

        setMessage({ type: 'success', text: 'Book added successfully!' });
        setFormData({
          title: '',
          author: '',
          genre: '',
          condition: '',
          description: '',
          image: null,
          contactApp: '',
          contactId: '',
        });
        setPreview(null);
        setLoading(false);

        // Navigate to the homepage after successful creation
        navigate('/');
      };

      reader.readAsDataURL(formData.image);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err?.response?.data?.error || 'Failed to add book.',
      });
      setLoading(false);
    }
  };

  const GENRES = [
    "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery", 
    "Thriller", "Romance", "Horror", "Biography", "History", "Self-Help", 
    "Business", "Children's", "Young Adult", "Poetry", "Science", "Philosophy", 
    "Travel", "Cooking", "Art", "Religion", "Sports", "Other",
  ];

  return (
    <>
      <AddBookTitle>Add New Book</AddBookTitle>

      {message.text && (
        <Message $isError={message.type === 'error'}>
          {message.text}
        </Message>
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Book title"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Author</Label>
          <Input
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Author name"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="genre">Genre</Label>
          <SelectInput
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </SelectInput>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="condition">Condition</Label>
          <SelectInput
            name="condition"
            id="condition"
            value={formData.condition}
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
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Short description..."
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="image">Image</Label>
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="image"
            required
          />
          {preview && <ImagePreview src={preview} alt="Preview" />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="contactApp">Contact App</Label>
          <SelectInput
            name="contactApp"
            id="contactApp"
            value={formData.contactApp}
            onChange={handleChange}
            required
          >
            <option value="">Select App</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="kakao">KakaoTalk</option>
          </SelectInput>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="contactId">Your ID/Handle</Label>
          <Input
            name="contactId"
            id="contactId"
            value={formData.contactId}
            onChange={handleChange}
            required
            placeholder="e.g. @yourusername or phone/email"
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </SubmitButton>
      </Form>
    </>
  );
}

export default AddBookForm;
