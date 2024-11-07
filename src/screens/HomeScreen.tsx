import {  
    View, 
    TextInput, 
    Button, 
    FlatList, 
    Text, 
    TouchableOpacity, 
    Image,
} from 'react-native';
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { HomeScreenProps } from '../types/navigationTypes';
import { searchRecipes } from '../api/recipeService';
import styles from '../theme/styles';

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        const results = await searchRecipes(query);
        const uniqueRecipes = Array.from(new Set(results.map(recipe => recipe.uri)))
            .map(uri => results.find(recipe => recipe.uri === uri));
        setRecipes(uniqueRecipes);
        setIsLoading(false);
    };

    const navigateToRecipe = (recipe: any) => {
        navigation.navigate('Recipe', { recipe });
    };

    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity 
                onPress={() => navigateToRecipe(item)} 
                style={{
                    flex: 1,
                    margin: 5,
                    backgroundColor: '#fff', // Card background color
                    borderRadius: 10, // Rounded corners
                    elevation: 2, // For Android shadow effect
                    shadowColor: '#000', // For iOS shadow color
                    shadowOffset: { width: 0, height: 1 }, // Shadow offset
                    shadowOpacity: 0.2, // Shadow opacity
                    shadowRadius: 1.5, // Shadow blur radius
                    overflow: 'hidden' // Ensure contents don't overflow
                }}>
                <Image 
                    source={{ uri: item.image }} 
                    style={{ width: '100%', height: 150 }} // Adjust height as needed
                    resizeMode="cover" 
                />
                <Text style={{
                    padding: 10, // Padding around text
                    textAlign: 'center',
                    fontWeight: 'bold' // Make the text bold
                }}>
                    {item.label}
                </Text>
            </TouchableOpacity>
        );
    };

    // Function to render a row of two items
    const renderRow = ({ item }: { item: any[] }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {item.map((recipe, index) => (
                    <View key={`${recipe.uri}-${recipe.label}-${index}`} style={{ flex: 1 }}>
                        {renderItem({ item: recipe })}
                    </View>
                ))}
            </View>
        );
    };

    // Create an array of pairs
    const groupedRecipes: any[][] = [];
    for (let i = 0; i < recipes.length; i += 2) {
        groupedRecipes.push(recipes.slice(i, i + 2));
    };


    return (
        <View>
            <TopBar navigation={navigation} screenName="Home" />
            <View style={styles.searchBarWrapper}>
                <TextInput
                    style={[styles.inputs, {flex: 1}]}
                    placeholder="Search for a recipe..."
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity style={[styles.searchButton, {width: '20%'}]} onPress={handleSearch}>
                    <Text style={{color: 'white'}}>Search</Text>
                </TouchableOpacity>
            </View>

            {/* Loading and Results */}
            {isLoading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={groupedRecipes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderRow}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListFooterComponent={<View style={{ height: 200}} />}
                />
            )}
        </View>
    );

}