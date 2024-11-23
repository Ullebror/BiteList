import
    React,
    { createContext, useContext, useState, ReactNode, useEffect }
from 'react';
import {onAuthStateChanged, User} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// Define the type for the context value
interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
}

// Create a context with an initial undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component that will wrap the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Manage the logged-in state
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);  // Set user if logged in
            setIsLoggedIn(true);
          } else {
            setUser(null);  // Clear user if logged out
            setIsLoggedIn(false);
          }
        });
    
        // Cleanup the subscription when component unmounts
        return () => unsubscribe();
      }, []);

    // Define login and logout functions
    const login = (user: User) => {
        setUser(user);
        setIsLoggedIn(true);
    }
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
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
