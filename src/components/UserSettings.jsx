import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API } from '../api';
import {
  Form,
  LoginTitle,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  AuthHelperText,
} from '../assets/styles/Login';

const Settings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: '',
    currentPassword: '',
  });
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      setMessage({ type: 'error', text: 'You are not logged in.' });
      return;
    }

    if (isAuthenticated) {
      API.auth.getProfile().then((res) => {
        if (res.success) {
          setProfile(prev => ({
            ...prev,
            username: res.data.username || '',
            email: res.data.email || '',
          }));
        }
      });
    }
  }, [isAuthenticated, authLoading]);

  if (!isAuthenticated && !authLoading) {
    return <AuthHelperText>{message.text}</AuthHelperText>;
  }

  if (authLoading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Permanently delete your account? This cannot be undone.')) return;

    setUpdating(true);
    try {
      const result = await API.auth.deleteAccount();
      if (result.success) {
        logout();  // Clears the token and updates context
        navigate('/');
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete account' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred during deletion' });
    } finally {
      setUpdating(false);
    }
  };

  const validate = () => {
    const errors = {};
    if (!profile.username.trim()) errors.username = 'Username required';
    if (!profile.email.trim()) {
      errors.email = 'Email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      errors.email = 'Invalid email format';
    }
    if (profile.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(profile.password)) {
      errors.password = '8+ chars with uppercase, lowercase, and number';
    }
    if (profile.password && !profile.currentPassword) {
      errors.currentPassword = 'Current password required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setUpdating(true);
    setMessage({ type: '', text: '' });

    try {
      const { username, email, password, currentPassword } = profile;
      const updatePayload = { username, email };
      if (password) updatePayload.password = password;

      const res = await API.auth.updateProfile(updatePayload);

      if (res.success) {
        setMessage({ type: 'success', text: 'Profile updated! Redirecting...' });
        setProfile(prev => ({ ...prev, password: '', currentPassword: '' }));
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage({ type: 'error', text: res.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Update failed' });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <LoginTitle>Update Profile</LoginTitle>
      
      {message.text && (
        <AuthHelperText style={message.type === 'success' ? { color: 'green' } : {}}>
          {message.text}
        </AuthHelperText>
      )}

      <FormGroup>
        <Label>Username</Label>
        <Input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
        />
        {formErrors.username && <AuthHelperText>{formErrors.username}</AuthHelperText>}
      </FormGroup>

      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />
        {formErrors.email && <AuthHelperText>{formErrors.email}</AuthHelperText>}
      </FormGroup>

      <FormGroup>
        <Label>New Password</Label>
        <Input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current"
        />
        {formErrors.password && <AuthHelperText>{formErrors.password}</AuthHelperText>}
      </FormGroup>

      {profile.password && (
        <FormGroup>
          <Label>Current Password</Label>
          <Input
            type="password"
            name="currentPassword"
            value={profile.currentPassword}
            onChange={handleChange}
          />
          {formErrors.currentPassword && <AuthHelperText>{formErrors.currentPassword}</AuthHelperText>}
        </FormGroup>
      )}

      <SubmitButton disabled={updating}>
        {updating ? 'Updating...' : 'Update Profile'}
      </SubmitButton>

      <SubmitButton 
        onClick={handleDelete}
        style={{ 
          backgroundColor: '#ff4444',
          marginTop: '20px',
          ':hover': {
            backgroundColor: '#cc0000'
          }
        }}
        disabled={updating}
      >
        {updating ? 'Processing...' : 'Delete Account'}
      </SubmitButton>
    </Form>
  );
};

export default Settings;
