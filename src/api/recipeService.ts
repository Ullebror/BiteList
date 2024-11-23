import axios from 'axios';
import { Recipe, RecipeHit } from '../types/ParameterTypes';

const apiUrl = "https://api.edamam.com/api/recipes/v2";
const appId = process.env.EDAMAM_ID;
const appKey = process.env.EDAMAM_KEY;

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                type: 'public',
                q: query,
                app_id: appId,
                app_key: appKey,
            },
        });

        return response.data.hits.map((hit: RecipeHit): Recipe => ({
            label: hit.recipe.label,
            image: hit.recipe.image,
            uri: hit.recipe.uri,
            url: hit.recipe.url,
            ingredients: hit.recipe.ingredientLines,
        }));
        
    } catch (error) {
        console.error("Error fetchin recipes:", error);
        return [];
    }
};