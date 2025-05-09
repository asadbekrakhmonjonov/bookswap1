import { BooksSection, PageContainer, GlobalStyle } from '../assets/styles/Dashboard';
import AllBooks from "../components/Books/AllBooks";
import Header from "../components/Header";



function Dashboard() {


  return (
    <>
      <GlobalStyle />
      <PageContainer>
        {/* Include the header component here */}
        <Header />
        
        {/* Books Section */}
        <BooksSection>
          <AllBooks />
        </BooksSection>
      </PageContainer>
    </>
    );
}

export default Dashboard;
