import { db } from '../../firebaseConfig'; // Import your Firebase config
import { ref, set, remove, get } from 'firebase/database'; // For Realtime Database

// Add a recipe to the user's favorites
export const addToFavorites = async (userId: string, recipeUri: string) => {
    const favoriteRef = ref(db, `users/${userId}/favorites/${recipeUri}`);
    try {
        await set(favoriteRef, true);
    } catch (error) {
        console.error("Error adding to favorites:", error);
        throw new Error('Error adding to favorites');
    }
};

// Remove a recipe from the user's favorites
export const removeFromFavorites = async (userId: string, recipeUri: string) => {
    const favoriteRef = ref(db, `users/${userId}/favorites/${recipeUri}`);
    try {
        await remove(favoriteRef);
    } catch (error) {
        console.error("Error removing from favorites:", error);
        throw new Error('Error removing from favorites');
    }
};

// Check if a recipe is favorited by the user
export const isRecipeFavorited = async (userId: string, recipeUri: string) => {
    const favoriteRef = ref(db, `users/${userId}/favorites/${recipeUri}`);
    try {
        const snapshot = await get(favoriteRef);
        return snapshot.exists(); // true if the recipe is favorited
    } catch (error) {
        console.error("Error checking if recipe is favorited:", error);
        throw new Error('Error checking favorite status');
    }
};
