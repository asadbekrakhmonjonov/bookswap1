import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api';
import {
  Form,
  LoginTitle,
  FormGroup,
  Label,
  Input,
  AuthHelperText,
  SubmitButton,
  LogoText,
  AuthLink
} from '../../assets/styles/Login';
import { useAuth } from '../../context/AuthContext';
function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)
    ) {
      newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setIsSubmitting(true);
    setApiError('');
    setSuccessMessage('');
  
    try {
      const result = await API.auth.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
  
      if (result.success && result.data?.token) {
        await login({ email: formData.email, password: formData.password });
      } else {
        setApiError(result.error || 'Registration failed');
      }
    } catch (error) {
      setApiError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <>
      <LogoText>BookSwap</LogoText>
      <LoginTitle>Register</LoginTitle>

      {apiError && <AuthHelperText>{apiError}</AuthHelperText>}
      {successMessage && <p style={{ textAlign: 'center', color: 'green', marginBottom: '1rem' }}>{successMessage}</p>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <AuthHelperText>{errors.username}</AuthHelperText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <AuthHelperText>{errors.email}</AuthHelperText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <AuthHelperText>{errors.password}</AuthHelperText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <AuthHelperText>{errors.confirmPassword}</AuthHelperText>}
        </FormGroup>

        <SubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </SubmitButton>

        <p>
          Already have an account? <AuthLink to="/login">Log in here</AuthLink>
        </p>
      </Form>
    </>
  );
}

export default RegisterForm;
