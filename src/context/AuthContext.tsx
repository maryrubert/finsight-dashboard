import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

const STORAGE_KEY = 'finsight:user';

const AuthContext = createContext<AuthContextData | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }

    setIsLoading(false);
  }, []);

  function signIn(email: string, password: string) {
    if (email === 'admin@finsight.com' && password === '123456') {
      const authenticatedUser: User = {
        email,
        name: 'Administrador',
      };

      setUser(authenticatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));

      return true;
    }

    return false;
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signOut,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider.');
  }

  return context;
}