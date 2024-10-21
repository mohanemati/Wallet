import React, { createContext, useState, ReactNode } from 'react';

// Define the type for your auth state
type AuthState = {
  loading: boolean;
  data: any; // You can replace 'any' with a more specific type if you have one
};

// Define the type for the context
export type AuthContextType = {
  auth: AuthState;
  setAuthData: (data: any) => void; // Replace 'any' with a specific type if needed
};

// Create the context with the initial value
export const authContext = createContext<AuthContextType>({
  auth: { loading: true, data: null },
  setAuthData: () => {},
});

// Define the type for the props
type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>({ loading: true, data: null });

  const setAuthData = (data: any) => { // Replace 'any' with a specific type if needed
    setAuth({ ...auth, data: data });
  };

  return (
    <authContext.Provider value={{ auth, setAuthData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
