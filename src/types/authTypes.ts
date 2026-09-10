export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  accessToken: string;
  refreshToken: string;
}

export type AuthState = {
  user: AuthUser | null;
}
