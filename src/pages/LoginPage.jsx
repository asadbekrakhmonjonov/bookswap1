import { PageWrapper, LoginCard } from "../assets/styles/Login";
import { GlobalStyle } from '../assets/styles/Dashboard';
import LoginForm from "../components/Authentication/LoginForm";

function LoginPage() {
  return (
    <>
      <GlobalStyle /> {/* Global styles are injected here */}
      <PageWrapper>
        <LoginCard>
          <LoginForm />
        </LoginCard>
      </PageWrapper>
    </>
  );
}

export default LoginPage;
