export type Recipe = {
    uri: string;
    ingredients: string[];
    label: string;
    image: string;
    url: string;
};

export type RecipeHit = {
    recipe: {
        label: string;
        image: string;
        uri: string;
        url: string;
        ingredientLines: string[];
    };
};