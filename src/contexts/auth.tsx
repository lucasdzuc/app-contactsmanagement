import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface IUser {
  _id?: string;
  name?: string;
  lastname?: string;
  email?: string;
}
interface AuthState {
  user: IUser;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user?: IUser | any;
  token?: any;
  signed?: boolean;
  loading?: boolean;
  signIn(credentials: SignInCredentials): Promise<any>;
  signOut(): void;
  updateUser?(user: IUser): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
// const AuthContext = createContext({});

const AuthProvider = ({ children }): JSX.Element => {
  const [user, setUser] = useState<AuthState | null>(null);
  const [token, setToken] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // LOAD DATA LOCAL STORAGE
  async function loadStorageData() {
    try {
      const storageUser = await AsyncStorage.getItem('@Contact:user');
      const storageToken = await AsyncStorage.getItem('@Contact:token');

      if (storageUser && storageToken) {
        api.defaults.headers.authorization = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
        setToken(storageToken);
      }

      setLoading(false);
    } catch (error) {
      return (
        console.log(error),
        setLoading(false)
      );
    }
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  const signIn = useCallback(async (data: { email: string; password: string; }): Promise<void> => {
    try {
      // console.log(data);
      setLoading(true);
      const { email, password } = data;
      const response = await api.post('sessions', { email, password });
      // console.log(response.data);
      setUser(response.data.user);
      setToken(response.data.token);
      api.defaults.headers.authorization = `Bearer ${response.data.token}`;
      await AsyncStorage.setItem('@Contact:user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('@Contact:token', response.data.token);
      setLoading(false);
    } catch (error) {
        return (
          console.log(error)
        );
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('@Contact:user');
      await AsyncStorage.removeItem('@Contact:token');
      setUser(null);
      setToken(null);
      setLoading(false);
    } catch (error) {
      return (
        console.log("Erro na função do logout", error),
        setLoading(false)
      )
    }
  }, []);

  const updateUser = useCallback(async (data: any) => {
    console.log(data);
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        signed: user ? true : false,
        user,
        token,
        loading,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
