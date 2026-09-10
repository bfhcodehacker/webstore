import { Navigate, useLocation } from 'react-router';
import type { ReactNode } from 'react';
import { useAppSelector } from '../app/hooks';

export function RequireAuth({ children }: { children: ReactNode }) {
  const isSignedIn = useAppSelector((state) => Boolean(state.auth.user));
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to='/sign-in' replace state={{ from: `${location.pathname}${location.search}` }} />;
  }

  return children;
}
