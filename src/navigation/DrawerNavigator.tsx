import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import { DrawerParamList } from '../types/DrawerParamList';
import RecipeScreen from '../screens/RecipeScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen'

const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // Hide the default header
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Favourites" component={FavouritesScreen} />
      <Drawer.Screen name="Recipe" component={RecipeScreen} />
      <Drawer.Screen name='ShoppingList' component={ShoppingListScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;