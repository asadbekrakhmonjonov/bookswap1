import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #f5f5f5;  // Softer gray background
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d0d0d0;  // Darker border for definition
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;  // Dark blue-gray for contrast
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #4a5568;  // Darker gray-blue for readability
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #2b6cb0;  // Soft blue on hover (or use #1abc9c for teal)
  }
`;

const LogoutButton = styled.button`
  background-color: #e53e3e;  // Vibrant red (softer than #e74c3c)
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c53030;  // Darker red on hover
  }
`;

const Header = () => {
  const navigate = useNavigate();
  function logout() {
    API.auth.logout();
    navigate("/");
  }

  return (
    <HeaderContainer>
      <Logo to="/">BookSwap</Logo>
      <Nav>
        <NavLink to="/my-books">My Books</NavLink>
        <NavLink to="/add-book">Add Book</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;