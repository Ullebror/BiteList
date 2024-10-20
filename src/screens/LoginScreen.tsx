import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { LoginScreenProps } from '../types/navigationTypes';
import { loginUser } from '../api/authService';
import commonStyles from '../theme/commonStyles';
import { SocialIcon } from 'react-native-elements';

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

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
            await loginUser(email, password);
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
    
    return (

        <View style={commonStyles.container}>
            <TopBar navigation={navigation} screenName="Login" />
            <Text style={commonStyles.titleText}>Welcome Back</Text>
            <Text style={commonStyles.subText}>Login to access your account</Text>
            
      
            <Text style={[commonStyles.contentText, { marginVertical: 50, marginHorizontal: 12}]}>Email Address</Text>
            <View style={commonStyles.inputWrapper}>
                <TextInput
                    style={commonStyles.inputs}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={handleEmailChange}
                />
            </View>

      
            <Text style={[commonStyles.contentText, {marginHorizontal: 12}]}>Password</Text>
            <View style={commonStyles.inputWrapper}>
                <TextInput
                    style={commonStyles.inputs}
                    placeholder="Enter your password"
                    secureTextEntry
                    value={password}
                    onChangeText={handlePasswordChange}
                />
            </View>
            {error ? (
                <Text style={commonStyles.errorText}>{error}</Text>
            ) : null}
      
            <TouchableOpacity>
                <Text style={[commonStyles.link, {alignSelf: 'flex-end', marginBottom: 30}]}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={[commonStyles.buttonWrapper, {alignSelf: 'center'}]}>
                <TouchableOpacity style={[commonStyles.orange, {alignSelf: 'center'}]} onPress={handleLogin}>
                <Text style={{ color: 'white' }}>Login</Text>
                </TouchableOpacity>
            </View>

            <Text style={commonStyles.orText}>-------------------- Or Sign in With --------------------</Text>

            <View style={commonStyles.socialButtonContainer}>
                <SocialIcon
                    title="Sign In With Google"
                    button
                    type="google"
                    style={commonStyles.socialButton}
                    onPress={handleGoogleSignIn}
                />
                <SocialIcon
                    title="Sign In With Facebook"
                    button
                    type="facebook"
                    style={commonStyles.socialButton}
                    onPress={handleFacebookSignIn}
                />
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={[commonStyles.contentText, {alignSelf: 'center'}]}>Don't have an account?{' '}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={commonStyles.link}>Join us</Text>
                </TouchableOpacity>
            </View>

            
        </View>        
    );
}