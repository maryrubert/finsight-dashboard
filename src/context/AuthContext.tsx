import {
  createContext,
  useContext,
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
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  function signIn(email: string, password: string) {
    if (
      email === 'admin@finsight.com' &&
      password === '123456'
    ) {
      setUser({
        email,
        name: 'Administrador',
      });

      return true;
    }

    return false;
  }

  function signOut() {
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      signIn,
      signOut,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser utilizado dentro de um AuthProvider.',
    );
  }

  return context;
}