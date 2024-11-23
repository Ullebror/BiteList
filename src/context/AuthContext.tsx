import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

// Create a context with an initial undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component that will wrap the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Manage the logged-in state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // Define login and logout functions
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext in other components
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Ensure the context is being used inside the provider
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
};
