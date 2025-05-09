import React from 'react';
import Header from "../components/Header";
import MyBooks from "../components/Books/MyBooks";
import { ThemeProvider } from 'styled-components';
import { PageContainer, BooksSection, DashboardHeader, GlobalStyle } from "../assets/styles/Dashboard";
import { theme } from '../assets/styles/Dashboard';
import styled from 'styled-components';

const PageTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sectionMargin};
`;

function UserBooks() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <PageContainer>
          <Header />
          <BooksSection>
            <DashboardHeader>
              <PageTitle>My Books</PageTitle>
            </DashboardHeader>
            <MyBooks />
          </BooksSection>
        </PageContainer>
      </ThemeProvider>
    </>
  );
}

export default UserBooks;
