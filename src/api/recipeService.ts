/* eslint-disable no-undef */
import axios from 'axios';
import { Recipe, RecipeHit } from '../types/ParameterTypes';

const apiUrl = 'https://api.edamam.com/api/recipes/v2';

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

    return response.data.hits.map(
      (hit: RecipeHit): Recipe => ({
        label: hit.recipe.label,
        image: hit.recipe.image,
        uri: hit.recipe.uri,
        url: hit.recipe.url,
        ingredients: hit.recipe.ingredientLines,
      })
    );
  } catch (error) {
    console.error('Error fetchin recipes:', error);
    return [];
  }
};

export const fetchFavoriteRecipes = async (
  uris: string[]
): Promise<Recipe[]> => {
  try {
    if (uris.length === 0) return [];

    let url = `${apiUrl}/by-uri?type=public&app_id=${appId}&app_key=${appKey}`;

    // Add each URI as a separate query parameter
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    uris.forEach((uri, index) => {
      url += `&uri=${encodeURIComponent(uri)}`;
    });

    console.log('Fetching with URL:', url);

    // Send the request to the Edamam API
    const response = await axios.get(url);

    console.log('Edamam API Response:', response.data);

    return response.data.hits.map(
      (hit: RecipeHit): Recipe => ({
        label: hit.recipe.label,
        image: hit.recipe.image,
        uri: hit.recipe.uri,
        url: hit.recipe.url,
        ingredients: hit.recipe.ingredientLines,
      })
    );
  } catch (error) {
    console.error('Error fetching favorites from edamam: ', error);
    return [];
  }
};
