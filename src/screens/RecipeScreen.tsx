import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';
import TopBar from '../components/TopBar';
import { Ionicons } from '@expo/vector-icons';
import { RecipeScreenProps } from '../types/navigationTypes';
import { AuthContext } from '../context/AuthContext';
import styles from '../theme/styles';

export default function RecipeScreen({ navigation, route }: RecipeScreenProps) {
    const { ingredients, label, image, url } = route.params;
    const [isFavorited, setIsFavorited] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
 
    const handleOpenOutsideSource = () => {
        Linking.openURL(url);
    }
    
    const handleAddToShoppingList = () => {
        navigation.navigate(
            'ShoppingList',
            {ingredients: ingredients, label: label}
        );
    }

    const getDomainName = (url: string) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.hostname;
        } catch (error) {
            return 'Website';
        }
    }
    
    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    }

    return (
        <View>
            <TopBar navigation={navigation} screenName='Recipe'/>
            <TouchableOpacity onPress={toggleFavorite} style={{ paddingLeft: 10 }}>
                            <Ionicons
                                name={isFavorited ? "star" : "star-outline"} // Filled or outlined star
                                size={50}
                                style={styles.favourited} // Filled yellow or gray outline
                            />
                        </TouchableOpacity>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={{ uri: image }} style={{width: 200, height: 200 }} />
                    <View style={{padding: 20}}>

                        <TouchableOpacity style={[styles.orangeButton, {width: '100%'}]} onPress={handleAddToShoppingList}>
                            <Text>Create Shopping List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <Text style={styles.titleText}>{label}</Text>
                <TouchableOpacity onPress={handleOpenOutsideSource}>
                    <Text style={[styles.link, {fontSize: 16}]}>View Full Recipe on {getDomainName(url)} </Text>
                </TouchableOpacity>
                <Text style={[styles.subText, {textAlign: 'left', paddingTop: 20}]}>Ingredients:</Text>
                {ingredients && ingredients.length > 0 ? (
                        ingredients.map((ingredient: string, index: number) => (
                            <Text style={styles.contentText} key={index}>{ingredient}</Text>
                        ))
                    ) : (
                        <Text>No ingredients available.</Text>
                    )}
                

            </ScrollView>
            
            

        </View>

    );
}