/* eslint-disable prettier/prettier */
import { useContext } from 'react';

import { AuthContext } from '../contexts/auth';

interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar_url: string;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user?: IUser;
  token?: any;
  loading?: boolean;
  signIn(credentials: SignInCredentials): Promise<any>;
  signOut(): void;
  updateUser(user: IUser): Promise<void>;
}

function useAuth(): AuthContextData {

    const context = useContext(AuthContext);

    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }

    return context as any;
  }

export default useAuth;
