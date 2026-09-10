import '../styles/Auth.css';
import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import datasource from '../datasource/datasource';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signIn } from '../slices/authSlice';

export function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const destination = (location.state as { from?: string } | null)?.from || '/account';

  if (currentUser) {
    return <main className='auth-page'><div className='auth-card'><h1>You’re already signed in</h1><button onClick={() => navigate('/account')}>View Account</button></div></main>;
  }

  const submitSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await datasource.loginUser(username.trim(), password);
      dispatch(signIn(user));
      navigate(destination, { replace: true });
    } catch (requestError) {
      if (axios.isAxiosError(requestError) && !requestError.response) {
        setError('Unable to connect to the store. Check your internet connection and try again.');
      } else if (axios.isAxiosError(requestError) && requestError.response?.status === 400) {
        setError('The username or password is incorrect. Please try again.');
      } else {
        setError('We could not sign you in. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='auth-page'>
      <section className='auth-card' aria-labelledby='sign-in-heading'>
        <span className='material-icons-outlined auth-icon' aria-hidden='true'>account_circle</span>
        <h1 id='sign-in-heading'>Sign in</h1>
        <p>Sign in to view and manage your Super WebStore account.</p>

        {error && <div className='auth-error' role='alert'><span className='material-icons' aria-hidden='true'>error_outline</span>{error}</div>}

        <form onSubmit={submitSignIn}>
          <label htmlFor='username'>Username</label>
          <input id='username' name='username' autoComplete='username' required value={username} onChange={(event) => setUsername(event.target.value)} />
          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' autoComplete='current-password' required value={password} onChange={(event) => setPassword(event.target.value)} />
          <button type='submit' disabled={isSubmitting || !username.trim() || !password}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className='auth-demo'><strong>Demo account:</strong> username <code>emilys</code>, password <code>emilyspass</code></p>
      </section>
    </main>
  );
}
