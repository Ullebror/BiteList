import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
    AuthError
} from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { ref, set } from 'firebase/database';

type AuthErrorType = AuthError | Error;


export const registerUser = async (
    email: string,
    password: string,
    username: string
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
    password: string
): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(
                                    auth,
                                    email,
                                    password
                                );
        return userCredential;
    } catch (error) {
        console.error('Login error: ', error);
        throw error as AuthErrorType;
    }
};

export const logoutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout error: ', error);
        throw error as AuthErrorType;
    }
}