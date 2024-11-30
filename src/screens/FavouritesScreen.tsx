import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import RequireAuth from '../components/RequireAuth';
import TopBar from '../components/TopBar';
import { Recipe } from '../types/ParameterTypes';
import { FavouritesScreenProps } from '../types/navigationTypes';
import { getUserFavorites } from '../api/favoriteService';
import { fetchFavoriteRecipes } from '../api/recipeService';
import { useAuth } from '../context/AuthContext';

export default function FavouritesScreen({
  navigation,
}: FavouritesScreenProps) {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const userFavorites = await getUserFavorites(user.uid);
          console.log('User Favorites:', userFavorites);

          const labels = Object.keys(userFavorites);
          console.log('Labels:', labels);

          if (labels.length > 0) {
            const uris = labels.map((label) => userFavorites[label]);

            console.log('Uris:', uris);
            const favoriteRecipes = await fetchFavoriteRecipes(uris);
            setFavorites(favoriteRecipes);
            console.log('Favorite Recipes:', favoriteRecipes);
          }
        } catch (error) {
          console.error('Error fetching favorites: ', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  const navigateToRecipe = (recipe: Recipe) => {
    navigation.navigate('Recipe', {
      uri: recipe.uri,
      label: recipe.label,
      image: recipe.image,
      url: recipe.url,
      ingredients: recipe.ingredients,
    });
  };

  const renderItem = ({ item }: { item: Recipe }) => {
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
          overflow: 'hidden', // Ensure contents don't overflow
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: 150 }} // Adjust height as needed
          resizeMode="cover"
        />
        <Text
          style={{
            padding: 10, // Padding around text
            textAlign: 'center',
            fontWeight: 'bold', // Make the text bold
          }}
        >
          {item.label}
        </Text>
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
  for (let i = 0; i < favorites.length; i += 2) {
    groupedRecipes.push(favorites.slice(i, i + 2));
  }

  if (loading) {
    return (
      <RequireAuth>
        <ActivityIndicator size="large" color="#0000ff" />
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <View>
        <TopBar navigation={navigation} screenName="Favourites" />
        {favorites.length === 0 ? (
          <Text>You have no favorites Yet!</Text>
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
    </RequireAuth>
  );
}
