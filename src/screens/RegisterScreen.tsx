import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { registerUser } from '../api/authService';
import TopBar from '../components/TopBar';
import { RegisterScreenProps } from '../types/navigationTypes';
import { checkPasswordStrength } from '../utils/checkPasswordStrength';
import commonStyles from '../theme/commonStyles';

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
        <View style={commonStyles.container}>
            <TopBar navigation={navigation} screenName='Register'/>
            <Text style={commonStyles.titleText}>Create an Account</Text>
            {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}

            <Text style={[commonStyles.contentText, { marginVertical: 50, marginHorizontal: 12}]}>Email Address</Text>
            <View style={commonStyles.inputWrapper}>
                <TextInput
                    style={commonStyles.inputs}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <Text style={[commonStyles.contentText, {marginHorizontal: 12}]}>Username</Text>
            <View style={commonStyles.inputWrapper}>
                <TextInput
                    style={commonStyles.inputs}
                    placeholder="Choose a username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <Text style={[commonStyles.contentText, {marginHorizontal: 12}]}>Password</Text>
            <View style={commonStyles.inputWrapper}>
                <TextInput
                    style={commonStyles.inputs}
                    placeholder="Enter your password"
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>


            <Text style={[commonStyles.contentText, {marginHorizontal: 12}]}>Confirm Password</Text>
            <View style={commonStyles.inputWrapper} >
                <TextInput
                    style={commonStyles.inputs}
                    placeholder="Confirm your password"
                    autoCapitalize="none"                    
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            <View style={[commonStyles.buttonWrapper, {alignSelf: 'center'}]}>
                <TouchableOpacity style={[commonStyles.orange, {alignSelf: 'center'}]} onPress={handleRegister}>
                    <Text style={{ color: 'white' }}>Register</Text>
                </TouchableOpacity>
            </View>
           

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={[commonStyles.contentText, {alignSelf: 'center'}]}>Already have an account?{' '}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={commonStyles.link}>Log in</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}