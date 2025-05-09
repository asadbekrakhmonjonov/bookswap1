import styled from 'styled-components';
import { Link } from 'react-router-dom';



export const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
`;

export const LoginCard = styled.div`
  background: #ffffff;
  padding: 2rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: calc(100% - 3rem);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;


export const LoginTitle = styled.h2`
  color: #000000;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: #555555;
  font-weight: 500;
`;

export const Input = styled.input`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  color: #333333;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  width: calc(100% - 2rem);
  transition: all 0.2s ease;
  margin: 0.25rem 0;

  &:focus {
    outline: none;
    border-color: #888888;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
  }

  &::placeholder {
    color: #aaaaaa;
  }
`;
export const SubmitButton = styled.button`
  background: #000000;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #333333;
  }

  &:disabled {
    background: #aaaaaa;
    cursor: not-allowed;
  }
`;

export const AuthHelperText = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #666666;
  margin-top: 1.5rem;
`;

export const ErrorText = styled(AuthHelperText)`
  color: #ff0000;
  text-align: left;
`;

export const AuthLink = styled(Link)`
  color: #333333;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

export const LogoText = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #000000;
  text-align: center;
  margin-bottom: 2rem;
`;

export const TogglePassword = styled.button`
  position: absolute;
  right: 10px;
  top: 32px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666666;
  font-size: 0.75rem;
`;

export const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;




