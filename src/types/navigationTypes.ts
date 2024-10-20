import { DrawerScreenProps } from "@react-navigation/drawer";

export type DrawerParamList = {
    Home: undefined;
    Register: undefined;
    Login: undefined;
    Favourites: undefined;
    Recipe: undefined;
    ShoppingList: undefined;
}

export type ShoppingListScreenProps = DrawerScreenProps<DrawerParamList, "ShoppingList">;

export type HomeScreenProps = DrawerScreenProps<DrawerParamList, "Home">;

export type LoginScreenProps = DrawerScreenProps<DrawerParamList, "Login">;

export type RecipeScreenProps = DrawerScreenProps<DrawerParamList, "Recipe">;

export type RegisterScreenProps = DrawerScreenProps<DrawerParamList, "Register">;