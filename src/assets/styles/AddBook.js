import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #f8f9fa;  // Softened background (was #f0f0f0)
  display: flex;
  justify-content: center;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;

  @media (orientation: landscape) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const AddBookCard = styled.div`
  background: #ffffff;
  padding: 2rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);  // Softer shadow
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;

  @media (orientation: landscape) {
    width: 90%;
  }
`;

export const AddBookTitle = styled.h2`
  color: #1a1a1a;  // Darker for better readability
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;  // Slightly bolder
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (orientation: landscape) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  width: 100%;
  
  @media (orientation: landscape) {
    width: 48%;
  }
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: #4a5568;  // Darker gray-blue (was #555)
  font-weight: 500;
`;

export const Input = styled.input`
  background: #ffffff;
  border: 1px solid #e2e8f0;  // Softer border (was #e0e0e0)
  color: #2d3748;  // Darker text
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  width: calc(100% - 2rem);
  transition: all 0.2s ease;
  margin: 0.25rem 0;

  &:focus {
    outline: none;
    border-color: #4fd1c5;  // Teal accent
    box-shadow: 0 0 0 2px rgba(79, 209, 197, 0.2);
  }

  &::placeholder {
    color: #a0aec0;  // Lighter placeholder
  }
`;

export const Textarea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 120px;
`;

export const SelectInput = styled.select`
  padding: 0.75rem 1rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #2d3748;
  font-size: 0.9375rem;
  width: calc(100% - 2rem);
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%234a5568' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5'/></svg>");  // Darker arrow
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: #4fd1c5;
    box-shadow: 0 0 0 2px rgba(79, 209, 197, 0.2);
  }

  option {
    background: #ffffff;
    color: #2d3748;
  }
`;

export const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 0.875rem;
  color: #2d3748;
  background: transparent;
  border: none;

  &::file-selector-button {
    padding: 0.5rem 1rem;
    background: #4fd1c5;  // Teal accent (was blue)
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #38b2ac;  // Darker teal
    }
  }
`;

export const ImagePreview = styled.img`
  width: 100%;
  max-width: 150px;
  border-radius: 6px;
  margin-top: 0.5rem;
  border: 1px solid #edf2f7;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  // Lighter shadow
`;

export const SubmitButton = styled.button`
  background: #2d3748;  // Dark slate (was black)
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #1a202c;  // Darker slate
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

export const Message = styled.p.attrs(props => ({
  'data-error': props.$isError || undefined
}))`
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => props.$isError ? '#e53e3e' : '#38a169'};  // Better error/success colors
`;

export const HelperText = styled.span`
  font-size: 0.8rem;
  color: #718096;  // Medium gray (was #bbb)
  margin-top: -0.25rem;
`;