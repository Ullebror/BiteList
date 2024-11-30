import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/navigationTypes';

type CustomDrawerContentProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

const CustomDrawerContent = ({ navigation }: CustomDrawerContentProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <DrawerContentScrollView>
      <DrawerItem label="Home" onPress={() => navigation.navigate('Home')} />
      <DrawerItem
        label="Shopping List"
        onPress={() => navigation.navigate('ShoppingList')}
      />

      {!isAuthenticated && (
        <>
          <DrawerItem
            label="Login"
            onPress={() => navigation.navigate('Login')}
          />
          <DrawerItem
            label="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </>
      )}
      {isAuthenticated && (
        <>
          <DrawerItem
            label="Favourites"
            onPress={() => navigation.navigate('Favourites')}
          />
          <DrawerItem
            label="Profile"
            onPress={() => navigation.navigate('Profile')}
          />
          <DrawerItem label="Logout" onPress={handleLogout} />
        </>
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
