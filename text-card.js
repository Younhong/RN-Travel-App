import { styles } from './styles';
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export default function TextCard({ textKey, toDos, checkToDos, deleteToDo, editToDos }) {
    const [isEditMode, setEditMode] = useState(false);
    const [text, setText] = useState("");

    const onChangeText = (payload) => setText(payload);

    const onEdit = async () => {
        if (text === "") {
            return;
        }

        await editToDos(textKey, text);
        setEditMode(false);
        setText("");
    }

    return (
        <View style={styles.toDo} key={textKey}>
            {isEditMode ?
                (<View>
                    <TextInput
                        onSubmitEditing={onEdit}
                        onChangeText={onChangeText}
                        returnKeyType="done"
                        value={text}
                        placeholder={"Edit To Do"}
                        style={styles.editInput} />
                </View>) :
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