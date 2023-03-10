import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInUser, signUpUser } from '../../redux/operations';
import FormInput from '../FormInput';
import Button from '../Button/Button';
import './SignForm.scss';

const SignForm = ({ action }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignIn = action === 'signin';
  const title = isSignIn ? 'Sign In' : 'Sign Up';

  const handleSubmit = event => {
    event.preventDefault();
    switch (action) {
      case 'signin':
        dispatch(signInUser({ email, password }));
        break;

      case 'signup':
        signUpUser({ name, email, password });
        navigate('/signin', { replace: true });
        break;
      default:
        console.log('wrong route');
        return;
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">{title}</h2>
      {action === 'signup' && <FormInput value={name} setValue={setName} type="name" name="name" />}
      <FormInput value={email} setValue={setEmail} type="email" name="email" />
      <FormInput value={password} setValue={setPassword} type="password" name="password" />
      <Button
        type="submit"
        title="Submit"
        label={isSignIn ? 'Sign In' : 'Sign Up'}
        mb="32px"
        mt="32px"
        disabled={action === 'signup' ? !name || !email || !password : !email || !password}
      />
      <p className="form__notification">
        {`If you ${!isSignIn ? 'already have an' : 'do not have an'} account, please `}
        <NavLink to={isSignIn ? '/signup' : '/signin'} className="form__notification-link">
          {!isSignIn ? 'Sign In' : 'Sign Up'}
        </NavLink>
      </p>
    </form>
  );
};

export default SignForm;
