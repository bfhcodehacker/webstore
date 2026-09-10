import '../styles/Auth.css';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signOut } from '../slices/authSlice';
import datasource from '../datasource/datasource';
import { RequestState } from '../components/RequestState';
import { getRequestErrorMessage, shouldRetryRequest } from '../utils/requestError';

export function Account() {
  const dispatch = useAppDispatch();
  const signedInUser = useAppSelector((state) => state.auth.user);
  const userQuery = useQuery({
    queryKey: ['user', signedInUser?.id],
    queryFn: () => datasource.fetchUser(signedInUser!.id),
    enabled: Boolean(signedInUser),
    retry: shouldRetryRequest,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
  });

  if (!signedInUser) return null;

  const user = userQuery.data;
  const fullName = [user?.firstName || signedInUser.firstName, user?.lastName || signedInUser.lastName].filter(Boolean).join(' ');
  const address = user?.address;
  const company = user?.company;

  return (
    <main className='auth-page account-page'>
      <section className='auth-card account-card' aria-labelledby='account-heading'>
        <div className='account-header'>
          {(user?.image || signedInUser.image) && <img src={user?.image || signedInUser.image} alt='' className='account-avatar' />}
          <div>
            <span className='account-eyebrow'>Your account</span>
            <h1 id='account-heading'>Welcome, {user?.firstName || signedInUser.firstName}</h1>
            <p>{user?.role || 'Customer'}</p>
          </div>
          <button className='account-sign-out' type='button' onClick={() => dispatch(signOut())}>Sign Out</button>
        </div>

        {userQuery.isPending && <RequestState title='Loading your account...' icon='hourglass_empty' />}
        {userQuery.isError && <RequestState title='Unable to load account details' message={getRequestErrorMessage(userQuery.error, 'your account information')} isRetrying={userQuery.isFetching} onRetry={() => userQuery.refetch()} />}

        {user && (
          <div className='account-details'>
            <section aria-labelledby='personal-heading'>
              <h2 id='personal-heading'>Personal information</h2>
              <dl>
                <div><dt>Name</dt><dd>{fullName}</dd></div>
                {user.maidenName && <div><dt>Maiden name</dt><dd>{user.maidenName}</dd></div>}
                <div><dt>Username</dt><dd>{user.username || signedInUser.username}</dd></div>
                {user.age !== undefined && <div><dt>Age</dt><dd>{user.age}</dd></div>}
                {user.gender && <div><dt>Gender</dt><dd>{user.gender}</dd></div>}
                {user.birthDate && <div><dt>Birth date</dt><dd>{user.birthDate}</dd></div>}
              </dl>
            </section>

            <section aria-labelledby='contact-details-heading'>
              <h2 id='contact-details-heading'>Contact information</h2>
              <dl>
                <div><dt>Email</dt><dd><a href={`mailto:${user.email || signedInUser.email}`}>{user.email || signedInUser.email}</a></dd></div>
                {user.phone && <div><dt>Phone</dt><dd><a href={`tel:${user.phone}`}>{user.phone}</a></dd></div>}
                {address && <div><dt>Address</dt><dd>{[address.address, address.city, address.stateCode || address.state, address.postalCode, address.country].filter(Boolean).join(', ')}</dd></div>}
              </dl>
            </section>

            {(company || user.university) && (
              <section aria-labelledby='organization-heading'>
                <h2 id='organization-heading'>Organization</h2>
                <dl>
                  {company?.name && <div><dt>Company</dt><dd>{company.name}</dd></div>}
                  {company?.title && <div><dt>Title</dt><dd>{company.title}</dd></div>}
                  {company?.department && <div><dt>Department</dt><dd>{company.department}</dd></div>}
                  {user.university && <div><dt>University</dt><dd>{user.university}</dd></div>}
                </dl>
              </section>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
