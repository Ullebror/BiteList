import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { registerUser } from '../api/authService';
import TopBar from '../components/TopBar';
import { RegisterScreenProps } from '../types/navigationTypes';
import { checkPasswordStrength } from '../utils/checkPasswordStrength';
import styles from '../theme/styles';

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (): Promise<void> => {
        //Checks if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setPassword('');
            setConfirmPassword('');
            return;
        }
        //Password strength check
        const passwordStrength = await checkPasswordStrength(password);
        if (passwordStrength !== 'Valid') {
            setError(passwordStrength);
            return;
        }

        try {
            await registerUser(email, password, username);
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setError(null);
            navigation.navigate('Login');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                setPassword('');
                setConfirmPassword('');
            } else {
                setError('Registration failed. Please try again');
                setPassword('');
                setConfirmPassword('');
            }

            console.error(error);
        }
    }
        
    return (
        <View style={styles.container}>
            <TopBar navigation={navigation} screenName='Register'/>
            <Text style={styles.titleText}>Create an Account</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Text style={[
                styles.contentText, 
                { marginVertical: 50, marginHorizontal: 12}
                ]}
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
                    onChangeText={setEmail}
                />
            </View>

            <Text style={[styles.contentText, {marginHorizontal: 12}]}>
                Username
            </Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Choose a username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <Text style={[styles.contentText, {marginHorizontal: 12}]}>
                Password
            </Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Enter your password"
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>


            <Text style={[styles.contentText, {marginHorizontal: 12}]}>
                Confirm Password
            </Text>
            <View style={styles.inputWrapper} >
                <TextInput
                    style={styles.inputs}
                    placeholder="Confirm your password"
                    autoCapitalize="none"                    
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            <View style={[styles.buttonWrapper, {alignSelf: 'center'}]}>
                <TouchableOpacity style={[
                    styles.orangeButton, {alignSelf: 'center'}]} 
                    onPress={handleRegister}
                >
                    <Text style={{ color: 'white' }}>Register</Text>
                </TouchableOpacity>
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
                    Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Log in</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}