import { styles } from './styles';
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export default function TextCard({textKey, toDos, checkToDos, deleteToDo }) {
    const [isEditMode, setEditMode] = useState(false);

    return (
        <View style={styles.toDo} key={textKey}>
            {isEditMode ?
                (<View></View>) :
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingRight: 20 }}>
                        <TouchableOpacity onPress={() => checkToDos(textKey)}>
                            <FontAwesome name='check-square' size={18} color={
                                toDos[textKey].isDone ? "white" : "black"} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        ...styles.toDoText, textDecorationLine:
                            toDos[textKey].isDone ? 'line-through' : null
                    }}>{toDos[textKey].text}</Text>
                </View>
            }

            <View style={{ flexDirection: 'row' }}>
                <View style={{ paddingRight: 20 }}>
                    <TouchableOpacity onPress={() => setEditMode(!isEditMode)}>
                        <FontAwesome name='pencil' size={18} color="white" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => deleteToDo(textKey)}>
                    <Fontisto name='trash' size={18} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}