import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { ShoppingListScreenProps } from '../types/navigationTypes';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
import { getAuth } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { db } from '../../firebaseConfig'; // Ensure this is properly set up
import styles from '../theme/styles';

export default function ShoppingListScreen({
  navigation,
  route,
}: ShoppingListScreenProps) {
  const { ingredients = [], label = 'Shopping List' } = route.params || {}; //Empty if accessed through menu and not from a recipe
  const [shoppingList, setShoppingList] = useState<string[]>(ingredients);
  const [newItem, setNewItem] = useState('');
  const [mergeDialogVisible, setMergeDialogVisible] = useState(false);

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const shoppingListRef = ref(db, 'shoppingLists/' + userId);
      get(shoppingListRef).then((snapshot) => {
        if (snapshot.exists()) {
          setShoppingList(snapshot.val());
        }
      });
      if (ingredients.length > 0) {
        handleAddRecipeIngredients();
      }
    }
  }, [userId, ingredients]);

  useEffect(() => {
    if (!userId) {
      // Clear the shopping list from the UI when the user logs out
      setShoppingList([]);
    }
  }, [userId]); // Trigger this effect when userId changes

  useEffect(() => {
    if (mergeDialogVisible) {
      Alert.alert(
        'Merge List?',
        'Do you want to merge the recipe ingredients with your existing list or overwrite the list?',
        [
          { text: 'Merge', onPress: handleMerge },
          { text: 'Overwrite', onPress: handleOverwrite },
          { text: 'Cancel', onPress: () => setMergeDialogVisible(false) },
        ]
      );
    }
  }, [mergeDialogVisible]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const updatedList = [...shoppingList, newItem.trim()];
      setShoppingList(updatedList);
      setNewItem('');

      if (userId) {
        // Save the shopping list to Firebase
        set(ref(db, 'shoppingLists/' + userId), updatedList);
      }
    }
  };

  const handleAddRecipeIngredients = () => {
    // If the user is logged in, ask to merge or overwrite
    if (userId) {
      if (shoppingList.length > 0) {
        setMergeDialogVisible(true); // Show the merge dialog
      } else {
        saveShoppingListToFirebase(ingredients);
        setShoppingList(ingredients);
      }
    } else {
      // If the user is not logged in, just add the recipe ingredients
      setShoppingList(ingredients);
      saveShoppingListToFirebase(ingredients);
    }
  };

  const saveShoppingListToFirebase = (newList: string[]) => {
    if (userId) {
      set(ref(db, 'shoppingLists/' + userId), newList);
    }
  };

  const handleMerge = () => {
    // Merge ingredients: Add all recipe ingredients without checking for duplicates
    const mergedList = [...shoppingList, ...ingredients];
    setShoppingList(mergedList);
    saveShoppingListToFirebase(mergedList);
    setMergeDialogVisible(false);
  };

  const handleOverwrite = () => {
    // Overwrite the shopping list with the recipe ingredients
    setShoppingList(ingredients);
    saveShoppingListToFirebase(ingredients);
    setMergeDialogVisible(false);
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <BouncyCheckBox
          disableText={false}
          fillColor="green"
          textStyle={styles.contentText}
          text={item}
          size={30}
          iconStyle={{ borderColor: 'green' }}
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          onPress={(isChecked: boolean) => {}} //comes from BouncyCheckBox and needs to be as is
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <TopBar navigation={navigation} screenName="Shopping List" />

        <Text style={styles.titleText}> {label}</Text>

        <FlatList
          data={shoppingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        />

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.inputs, { flex: 1 }]}
                placeholder="Add an item..."
                value={newItem}
                onChangeText={setNewItem}
              />
              <TouchableOpacity
                style={[styles.orangeButton, { width: '20%' }]}
                onPress={handleAddItem}
              >
                <Text style={{ color: 'white' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* Merge Confirmation Dialog */}
      </View>
    </KeyboardAvoidingView>
  );
}
