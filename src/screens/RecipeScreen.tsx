import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import React from 'react';
import TopBar from '../components/TopBar';
import { RecipeScreenProps } from '../types/navigationTypes';
import commonStyles from '../theme/commonStyles';

export default function RecipeScreen({ navigation, route }: RecipeScreenProps) {
    const { recipe } = route.params;
    const handleOpenOutsideSource = () => {
        Linking.openURL(recipe.url);
    }
    
    const handleAddToShoppingList = () => {
        navigation.navigate('ShoppingList', {ingredients: recipe.ingredients, label: recipe.label });
    }
    console.log(recipe);

    const getDomainName = (url: string) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.hostname;
        } catch (error) {
            return 'Website';
        }
    }

    return (
        <View>
            <TopBar navigation={navigation} screenName='Recipe'/>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={{ uri: recipe.image }} style={{width: 200, height: 200 }} />
                    <View style={{padding: 20}}>
                        <TouchableOpacity style={commonStyles.orange} onPress={handleAddToShoppingList}>
                            <Text>Create Shopping List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <Text style={commonStyles.titleText}>{recipe.label}</Text>
                <TouchableOpacity onPress={handleOpenOutsideSource}>
                    <Text>View Full Recipe on {getDomainName(recipe.url)} </Text>
                </TouchableOpacity>
                <Text>Ingredients:</Text>
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                        recipe.ingredients.map((ingredient: string, index: number) => (
                            <Text key={index}>{ingredient}</Text>
                        ))
                    ) : (
                        <Text>No ingredients available.</Text>
                    )}
                

            </ScrollView>
            
            

        </View>

    );
}