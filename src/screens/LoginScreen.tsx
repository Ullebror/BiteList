import { 
    Text,
    View, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TopBar from '../components/TopBar';
import { LoginScreenProps } from '../types/navigationTypes';
import { loginUser, passwordReset } from '../api/authService';
import styles from '../theme/styles';
import { SocialIcon } from 'react-native-elements';

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [resetEmail, setResetEmail] = useState<string>('');

    const { login } = useAuth();

    // Google and Facebook sign-in will be on hold for now. Change typing if continuing
    const handleGoogleSignIn = (): void => {
        // Implement Google sign-in logic here
        console.log('Google Sign-In pressed');
    };

    const handleFacebookSignIn = (): void => {
        // Implement Facebook sign-in logic here
        console.log('Facebook Sign-In pressed');
    };

    const handleLogin = async (): Promise<void> => {
        try {
            await loginUser(email, password, login);
            setEmail('');
            setPassword('');
            navigation.navigate('Home');
        } catch (error: unknown) {
            setError('Login failed. Please check your credentials.')
            setPassword('');
        }
    }

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (error) setError(null); // Clear error when typing in email
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (error) setError(null); // Clear error when typing in password
    };

    const handleForgotPassword= () => {
        setModalVisible(true);
    }

    const handleResetPassword = async (): Promise<void> => {
        if (!resetEmail) {
            Alert.alert('Please enter your email address');
            return;
        }

        try {
            await passwordReset(resetEmail);
            Alert.alert('Check your email for a password reset link');
            setResetEmail('');
            setModalVisible(false);
        } catch (error: unknown) {
            setError('Failed to send password reset email. Please try again.');
        }
    };
    
    return (

        <View style={styles.container}>
            <TopBar navigation={navigation} screenName="Login" />
            <Text style={styles.titleText}>Welcome Back</Text>
            <Text style={styles.subText}>Login to access your account</Text>
            
      
            <Text style={[
                styles.contentText,
                { marginVertical: 50, marginHorizontal: 12}]}
            >
                Email Address
            </Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={handleEmailChange}
                />
            </View>

      
            <Text style={[
                styles.contentText,
                {marginHorizontal: 12}]}
            >
                Password
            </Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Enter your password"
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={handlePasswordChange}
                />
            </View>
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
      
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={[
                    styles.link,
                    {alignSelf: 'flex-end', marginBottom: 30}
                    ]}
                >Forgot Password?</Text>
            </TouchableOpacity>

            <View style={[styles.buttonWrapper, {alignSelf: 'center'}]}>
                <TouchableOpacity style={[
                    styles.orangeButton,
                    {alignSelf: 'center'}]}
                    onPress={handleLogin}
                >
                    <Text style={{ color: 'white' }}>Login</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.orText}
            >
                -------------------- Or Sign in With --------------------
            </Text>

            <View style={styles.socialButtonContainer}>
                <SocialIcon
                    title="Sign In With Google"
                    button
                    type="google"
                    style={styles.socialButton}
                    onPress={handleGoogleSignIn}
                />
                <SocialIcon
                    title="Sign In With Facebook"
                    button
                    type="facebook"
                    style={styles.socialButton}
                    onPress={handleFacebookSignIn}
                />
            </View>
            
            <View style={{ 
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20 
                }}
            >
                <Text style={[
                    styles.contentText,
                    {alignSelf: 'center'}
                    ]}
                >
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.link}>Join us</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                                Reset Password
                            </Text>
                            <Text style={styles.modalText}>
                                Enter your email address:
                            </Text>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={resetEmail}
                                onChangeText={setResetEmail}
                            />
                            <TouchableOpacity style={[
                                styles.orangeButton,
                                {marginVertical: 10}
                                ]}
                                onPress={handleResetPassword}
                                >
                                    <Text style={{ color: 'white' }}>
                                        Send Reset Link
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.link}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            
        </View>        
    );
}