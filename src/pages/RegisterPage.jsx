import RegisterForm from '../components/Authentication/RegisterForm';
import { PageWrapper, LoginCard } from '../assets/styles/Login';


function RegisterPage() {
  return (
    <>
      <PageWrapper>
        <LoginCard>
        <RegisterForm />
        </LoginCard>
      </PageWrapper>
      
    </>
  );
}
export default RegisterPage;