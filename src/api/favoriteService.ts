import { db } from '../../firebaseConfig'; // Import your Firebase config
import { ref, set, remove, get } from 'firebase/database'; // For Realtime Database

// Add a recipe to the user's favorites
export const addToFavorites = async (
  userId: string,
  recipeLabel: string,
  recipeUri: string
) => {
  const favoriteRef = ref(db, `users/${userId}/favorites/${recipeLabel}`);
  try {
    await set(favoriteRef, recipeUri);
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw new Error('Error adding to favorites');
  }
};

// Remove a recipe from the user's favorites
export const removeFromFavorites = async (
  userId: string,
  recipeLabel: string
) => {
  const favoriteRef = ref(db, `users/${userId}/favorites/${recipeLabel}`);
  try {
    await remove(favoriteRef);
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw new Error('Error removing from favorites');
  }
};

// Check if a recipe is favorited by the user
export const isRecipeFavorited = async (
  userId: string,
  recipeLabel: string
) => {
  const favoriteRef = ref(db, `users/${userId}/favorites/${recipeLabel}`);
  try {
    const snapshot = await get(favoriteRef);
    return snapshot.exists(); // true if the recipe is favorited
  } catch (error) {
    console.error('Error checking if recipe is favorited:', error);
    throw new Error('Error checking favorite status');
  }
};

// Fetch all favorites for a user
export const getUserFavorites = async (userId: string) => {
  const userFavoritesRef = ref(db, `users/${userId}/favorites`);
  try {
    const snapshot = await get(userFavoritesRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Returns an object of { recipeUri: true }
    } else {
      return {}; // Return empty object if no favorites
    }
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw new Error('Error fetching user favorites');
  }
};
