import React from 'react';
import AddBookForm from '../components/Books/AddBookForm';
import { PageWrapper, AddBookCard } from '../assets/styles/AddBook';
import Header from '../components/Header';

function AddBooksPage() {
  return (
    <div>
      <Header />
      <PageWrapper>
      <AddBookCard>
        <AddBookForm />
      </AddBookCard>
    </PageWrapper>
    </div>
  );
}

export default AddBooksPage;
