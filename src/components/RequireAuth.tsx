import React, { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DrawerParamList } from '../types/navigationTypes';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return <>{children}</>;
};

export default RequireAuth;
