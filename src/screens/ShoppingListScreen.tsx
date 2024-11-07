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
} from 'react-native';
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { ShoppingListScreenProps } from '../types/navigationTypes';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
import styles from '../theme/styles';

export default function ShoppingListScreen({ navigation, route }: ShoppingListScreenProps) {
    const { ingredients, label } = route.params;
    const [shoppingList, setShoppingList] = useState(ingredients);
    const [newItem, setNewItem] = useState('');

    const handleAddItem = () => {
        if (newItem.trim()) {
            setShoppingList(prevItems => [...prevItems, newItem.trim()]);
            setNewItem('');
        }
    };

    const renderItem = ({ item }: { item: string }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <BouncyCheckBox
                    disableText={false}
                    fillColor="green"
                    textStyle={styles.contentText}
                    text={item}
                    size={30}
                    iconStyle={{ borderColor: 'green' }}
                    onPress={(isChecked: boolean) => {}}
                />
            </View>
        );
    }

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
            </View>
        </KeyboardAvoidingView>
    );
}