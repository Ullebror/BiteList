import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
    AuthError,
    sendPasswordResetEmail,
    User
} from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { ref, set } from 'firebase/database';

type AuthErrorType = AuthError | Error;

export const registerUser = async (
    email: string,
    password: string,
    username: string,
): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        await set(ref(db, 'users/' + user.uid), {
          username,
          email,
        });

        return userCredential;
    } catch (error) {
        console.error('Registration error: ', error);
        throw error as AuthErrorType;
    }
};

export const loginUser = async (
    email: string,
    password: string,
    login: (user: User) => void
): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;
        login(user);

        return userCredential;
    } catch (error) {
        console.error('Login error: ', error);
        throw error as AuthErrorType;
    }
};

export const logoutUser = async (
        logout: () => void
    ): Promise<void> => {
    try {
        await signOut(auth);
        logout();
    } catch (error) {
        console.error('Logout error: ', error);
        throw error as AuthErrorType;
    }
}

export const passwordReset = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);  
    } catch (error) {
        console.error('Reset password error: ', error);
        throw error as AuthErrorType;

    }
};