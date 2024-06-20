import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin' | 'user';
}

interface UserContextType {
  user: User | null;
  login: (username: string, role: User['role']) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, role: User['role']) => {
    setUser({ username, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
