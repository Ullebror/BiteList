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
import commonStyles from '../theme/commonStyles';

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        const results = await searchRecipes(query);
        setRecipes(results);
        setIsLoading(false);
    };

    const navigateToRecipe = (recipe: any) => {
        navigation.navigate('Recipe', { recipe });
    }

    return (
        <View>
            <TopBar navigation={navigation} screenName="Home" />
            <View style={commonStyles.searchBar}>
                <TextInput
                style={commonStyles.inputs}
                placeholder="Search for a recipe..."
                value={query}
                onChangeText={setQuery}
                />
                <Button title="Search" onPress={handleSearch} />
            </View>

            {/* Loading and Results */}
            {isLoading ? (
                <Text style={commonStyles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.uri}
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToRecipe(item)}>
                        <Image source={{ uri: item.image }} />
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                    )}
                />
            )}

        </View>

    );

}