import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { Recipe } from '../types/ParameterTypes';
import TopBar from '../components/TopBar';
import { HomeScreenProps } from '../types/navigationTypes';
import { searchRecipes } from '../api/recipeService';
import styles from '../theme/styles';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const results = await searchRecipes(query);
    const uniqueRecipes = Array.from(
      new Set(results.map((recipe: Recipe) => recipe.uri))
    ).map((uri) => results.find((recipe) => recipe.uri === uri) as Recipe);
    setRecipes(uniqueRecipes);
    setIsLoading(false);
  };

  const navigateToRecipe = (recipe: Recipe) => {
    navigation.navigate('Recipe', {
      ingredients: recipe.ingredients,
      label: recipe.label,
      image: recipe.image,
      url: recipe.url,
      uri: recipe.uri,
    });
  };

  const renderItem = ({ item }: { item: Recipe }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToRecipe(item)}
        style={styles.touchableImage}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: 150 }} // Adjust height as needed
          resizeMode="cover"
        />
        <Text style={styles.cardText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  // Function to render a row of two items
  const renderRow = ({ item }: { item: Recipe[] }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {item.map((recipe, index) => (
          <View
            key={`${recipe.uri}-${recipe.label}-${index}`}
            style={{ flex: 1 }}
          >
            {renderItem({ item: recipe })}
          </View>
        ))}
      </View>
    );
  };

  // Create an array of pairs
  const groupedRecipes: Recipe[][] = [];
  for (let i = 0; i < recipes.length; i += 2) {
    groupedRecipes.push(recipes.slice(i, i + 2));
  }

  return (
    <View>
      <TopBar navigation={navigation} screenName="Home" />
      <View style={styles.searchBarWrapper}>
        <TextInput
          style={[styles.inputs, { flex: 1 }]}
          placeholder="Search for a recipe..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          style={[styles.searchButton, { width: '20%' }]}
          onPress={handleSearch}
        >
          <Text style={{ color: 'white' }}>Search</Text>
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
          ListFooterComponent={<View style={{ height: 200 }} />}
        />
      )}
    </View>
  );
}
