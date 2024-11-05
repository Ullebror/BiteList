import axios from 'axios';

const apiUrl = "https://api.edamam.com/api/recipes/v2";
const appId = process.env.EDAMAM_ID;
const appKey = process.env.EDAMAM_KEY;

export const searchRecipes = async (query: string) => {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                type: 'public',
                q: query,
                app_id: appId,
                app_key: appKey,
            },
        });
        return response.data.hits.map((hit: any) => ({
            label: hit.recipe.label,
            image: hit.recipe.images.THUMBNAIL.url,
            uri: hit.recipe.uri,
        }));
    } catch (error) {
        console.error("Error fetchin recipes:", error);
        return [];
    }
};