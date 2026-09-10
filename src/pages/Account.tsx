import '../styles/Auth.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signOut } from '../slices/authSlice';

export function Account() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <main className='auth-page'>
      <section className='auth-card account-card' aria-labelledby='account-heading'>
        {user.image && <img src={user.image} alt='' className='account-avatar' />}
        <h1 id='account-heading'>Welcome, {user.firstName}</h1>
        <dl>
          <div><dt>Name</dt><dd>{user.firstName} {user.lastName}</dd></div>
          <div><dt>Username</dt><dd>{user.username}</dd></div>
          <div><dt>Email</dt><dd>{user.email}</dd></div>
        </dl>
        <button type='button' onClick={() => dispatch(signOut())}>Sign Out</button>
      </section>
    </main>
  );
}
