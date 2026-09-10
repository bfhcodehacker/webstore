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

export type UserDetails = {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  image?: string;
  role?: string;
  university?: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
    stateCode?: string;
    postalCode?: string;
    country?: string;
  };
  company?: {
    name?: string;
    title?: string;
    department?: string;
  };
}
