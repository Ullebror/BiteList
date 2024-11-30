import { DrawerScreenProps } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';

export type TopBarProps = {
  navigation: NavigationProp<DrawerParamList>;
  screenName: string;
};

export type DrawerParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Favourites: undefined;
  Recipe: {
    ingredients: string[];
    label: string;
    image: string;
    url: string;
    uri: string;
  };
  ShoppingList: { ingredients?: string[]; label?: string };
  Profile: undefined;
};

export type ShoppingListScreenProps = DrawerScreenProps<
  DrawerParamList,
  'ShoppingList'
>;

export type HomeScreenProps = DrawerScreenProps<DrawerParamList, 'Home'>;

export type LoginScreenProps = DrawerScreenProps<DrawerParamList, 'Login'>;

export type RecipeScreenProps = DrawerScreenProps<DrawerParamList, 'Recipe'>;

export type RegisterScreenProps = DrawerScreenProps<
  DrawerParamList,
  'Register'
>;

export type FavouritesScreenProps = DrawerScreenProps<
  DrawerParamList,
  'Favourites'
>;

export type ProfileScreenProps = DrawerScreenProps<DrawerParamList, 'Profile'>;
