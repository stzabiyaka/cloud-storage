import SignForm from '../../components/SignForm';
import { useLocation } from 'react-router-dom';

const SignView = () => {
  const location = useLocation();
  const action = location.pathname.slice(1);
  return (
    <section className="section">
      <div className="container">
        <SignForm action={action} />
      </div>
    </section>
  );
};

export default SignView;
