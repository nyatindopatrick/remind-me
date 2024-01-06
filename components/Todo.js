import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const Todo = () => {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');

    const addItem = () => {
        setItems(prevItems => [...prevItems, { id: Date.now().toString(), text: input, completed: false }]);
        setInput('');
    };

    const toggleComplete = (id) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Add an item"
            />
            <Button title="Add Item" onPress={addItem} />
            <FlatList
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text style={item.completed ? styles.completed : null} onPress={() => toggleComplete(item.id)}>
                        {item.text}
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    completed: {
        textDecorationLine: 'line-through',
    },
});

export default Todo;