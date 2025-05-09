import styled, { createGlobalStyle} from 'styled-components';
import { Link } from 'react-router-dom';


export const theme = {
  colors: {
    background: '#f8f9fa', // Softer off-white
    cardBackground: '#ffffff',
    text: '#1a1a1a', // Higher contrast black
    secondaryText: '#4a5568', // Soft blue-gray
    border: '#e2e8f0', // Softer border
    accent: '#4fd1c5', // Teal for interactive elements
    accentDark: '#38b2ac', // Darker teal
    likeActive: '#e53e3e', // Vibrant red
    likeInactive: '#cbd5e0', // Light gray
    filterActive: '#2d3748', // Dark slate (replaces black)
    filterInactive: 'transparent',
    success: '#38a169', // Green for positive actions
    error: '#e53e3e', // Red for errors
  },
  fonts: {
    title: '1.25rem',
    author: '1rem',
    description: '0.875rem',
    meta: '0.75rem',
    filter: '0.9rem',
  },
  spacing: {
    cardPadding: '1rem',
    elementMargin: '0.5rem',
    sectionMargin: '2rem',
  },
  borderRadius: '6px', // Slightly rounded
  shadow: '0 2px 8px rgba(0, 0, 0, 0.08)', // Softer shadow
};
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    background-color: ${theme.colors.background};
    font-family: sans-serif;
    font-size: 16px;
    /* Changed from min-height: 100vh to height: 100% */
    height: 100%;
    /* Ensure scrolling works */
    overflow-x: hidden;
  }

  #root {
    /* Make root element take full height */
    height: 100%;
    /* Enable scrolling for content */
    overflow-y: auto;
  }
`;
export const PageContainer = styled.div`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  padding: 2rem;
`;

export const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.sectionMargin};
`;

export const BooksSection = styled.section`
  max-width: 1800px;
  margin: 0 auto;
`;

export const BooksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
`;

export const BookCard = styled.div`
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadow};
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const BookImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 1px solid ${theme.colors.border};
`;

export const BookContent = styled.div`
  padding: ${theme.spacing.cardPadding};
`;

export const BookTitle = styled.h3`
  font-size: ${theme.fonts.title};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.elementMargin} 0;
  font-weight: 600; // Semi-bold
  text-align: center;
`;

export const BookAuthor = styled.p`
  font-size: ${theme.fonts.author};
  color: ${theme.colors.secondaryText};
  margin: 0 0 ${theme.spacing.elementMargin} 0;
  text-align: center;
  font-style: italic;
`;

export const BookDescription = styled.p`
  font-size: ${theme.fonts.description};
  color: ${theme.colors.secondaryText};
  margin: ${theme.spacing.elementMargin} 0;
  line-height: 1.5; // Improved readability
  max-height: ${(props) => (props.isExpanded ? 'none' : '100px')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  
  span {
    color: ${theme.colors.accent};
    cursor: pointer;
    font-weight: 500;
    margin-left: 5px;
  }
`;

export const BookMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.elementMargin};
  padding-top: ${theme.spacing.elementMargin};
  border-top: 1px dashed ${theme.colors.border};
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.$isActive ? theme.colors.likeActive : theme.colors.likeInactive};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.likeActive};
  }
`;

export const AddedBy = styled.span`
  font-size: ${theme.fonts.meta};
  color: ${theme.colors.secondaryText};
`;

export const BookLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block; // Makes entire card clickable
`;

export const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto ${theme.spacing.sectionMargin};
  
  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius};
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.accent};
      box-shadow: 0 0 0 2px rgba(79, 209, 197, 0.2);
    }
  }
`;

export const GenreFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: ${theme.spacing.sectionMargin};
  flex-wrap: wrap;
`;

export const GenreTitle = styled.h4`
  font-size: ${theme.fonts.filter};
  color: ${theme.colors.text};
  width: 100%;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const GenreButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${theme.colors.border};
  background: ${props => props.$active ? theme.colors.filterActive : theme.colors.filterInactive};
  color: ${props => props.$active ? theme.colors.cardBackground : theme.colors.text};
  border-radius: ${theme.borderRadius};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${theme.fonts.filter};

  &:hover {
    background: ${theme.colors.filterActive};
    color: ${theme.colors.cardBackground};
  }
`;

export const EmptyBooksMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: ${theme.colors.secondaryText};
  margin: ${theme.spacing.sectionMargin} 0;
  padding: 2rem;
  background: ${theme.colors.cardBackground};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadow};
`;

export const EmptyMessage = styled(EmptyBooksMessage)``;

export const BooksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const BookContact = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${theme.colors.secondaryText};
  background-color: ${theme.colors.background};
  padding: 0.75rem;
  border-radius: ${theme.borderRadius};
  border: 1px solid ${theme.colors.border};
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;


export const StyledLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.accent};
  font-size: ${theme.fonts.description};
  padding: 0.5rem;
  border-radius: ${theme.borderRadius};
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:hover {
    color: ${theme.colors.accentDark};
    background-color: rgba(79, 209, 197, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(79, 209, 197, 0.3);
  }
`;
export const BookCondition = styled.span`
  display: inline-block;
  background-color: ${theme.colors.success};
  color: ${theme.colors.cardBackground};
  font-size: ${theme.fonts.meta};
  padding: 0.25rem 0.5rem;
  border-radius: ${theme.borderRadius};
  font-weight: 500;
  margin-top: 0.5rem;
`;

export const BookGenre = styled.span`
  display: inline-block;
  background-color: ${theme.colors.accent};
  color: ${theme.colors.cardBackground};
  font-size: ${theme.fonts.meta};
  padding: 0.25rem 0.5rem;
  border-radius: ${theme.borderRadius};
  font-weight: 500;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
`;
// components/EditButton.js

export const EditButton = styled.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentDark};
    color: white;
  }
`;

