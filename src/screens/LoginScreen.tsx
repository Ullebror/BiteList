import { Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/DrawerParamList';
import { loginUser } from '../api/authService';

type LoginScreenProps = DrawerScreenProps<DrawerParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await loginUser(email, password);
            navigation.navigate('Home');
        } catch (error) {
            setError('Login failed. Please check your credentials.')
        }
    }
    
    return (
        <View>
            <TopBar navigation={navigation} screenName="Login" />
            <TextInput
                placeholder="Email" 
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error ? <Text>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
            
        </View>
    );
}