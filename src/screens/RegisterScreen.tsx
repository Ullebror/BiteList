import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { registerUser } from '../api/authService';
import TopBar from '../components/TopBar';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/DrawerParamList';
import commonStyles from '../theme/commonStyles';

type RegisterScreenProps = DrawerScreenProps<DrawerParamList, 'Register'>

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await registerUser(email, password, username);
            setSuccess('Registration successful! Please log in.')
            setError('');
            navigation.navigate('Login');
        } catch (error) {
            setError('Registration failed. Please try again');
            console.error(error);
        }
    }
        
    return (
        <View style={commonStyles.container}>
            <TopBar navigation={navigation} screenName='Register'/>
            <Text style={commonStyles.titleText}>Create an Account</Text>
            {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}
            {success ? <Text style={commonStyles.successText}>{success}</Text> : null}

            <Text style={[commonStyles.contentText, { marginVertical: 50, marginHorizontal: 12}]}>Email Address</Text>
            <View style={commonStyles.inputWrapper}>
                <TextInput
                    style={commonStyles.inputs}
                    placeholder="Enter your email"
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
                    value={password}
                    onChangeText={setPassword}
                />
            </View>


            <Text style={[commonStyles.contentText, {marginHorizontal: 12}]}>Confirm Password</Text>
            <View style={commonStyles.inputWrapper} >
                <TextInput
                    style={commonStyles.inputs}
                    placeholder="Confirm your password"
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