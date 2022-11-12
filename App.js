import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { theme } from './color';
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TODO_KEY = '@toDos';
const TAB_KEY = '@tabs';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
    loadTabs();
  }, []);

  const travel = async () => {
    setWorking(false);

    await saveTabs({ 'working': false });
  };

  const work = async () => {
    setWorking(true);

    await saveTabs({ 'working': true });
  };

  const onChangeText = (payload) => setText(payload);

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(TODO_KEY);

    if (s) {
      setToDos(JSON.parse(s));
    }
  }

  const addTodo = async () => {
    if (text === "") {
      return;
    }

    const newToDos = {
      ...toDos, [Date.now()]: {
        text, working, 'isDone': false
      }
    };

    // const newToDos = Object.assign(
    //   {},
    //   toDos,
    //   { [Date.now()]: { text, work: working } }
    // );
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = async (key) => {
    if (Platform.OS === 'web') {
      const ok = confirm("Do you want to delete this To Do?");
      if (ok) {
        const newToDos = { ...toDos };
        delete newToDos[key];
        setToDos(newToDos);
        await saveToDos(newToDos);
      }
    } else {
      Alert.alert(
        "Delete To Do?",
        "Are you sure?", [
        { text: "Cancel" },
        {
          text: "Sure",
          style: "destructive",
          onPress: async () => {
            const newToDos = { ...toDos };
            delete newToDos[key];
            setToDos(newToDos);
            await saveToDos(newToDos);
          }
        }
      ]);
    }
  };

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(toSave));
  }

  const checkToDos = async (key) => {
    const newToDos = { ...toDos };

    newToDos[key].isDone = !newToDos[key].isDone;

    setToDos(newToDos);
    await saveToDos(newToDos);
  }

  const loadTabs = async () => {
    const s = await AsyncStorage.getItem(TAB_KEY);

    if (s) {
      setWorking(JSON.parse(s)['working']);
    }
  }

  const saveTabs = async (toSave) => {
    await AsyncStorage.setItem(TAB_KEY, JSON.stringify(toSave));
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{
            ...styles.btnText,
            color: working ? "white" : theme.grey
          }}>Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{
            ...styles.btnText,
            color: !working ? "white" : theme.grey
          }}>Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addTodo}
        onChangeText={onChangeText}
        returnKeyType="done"
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input} />
      <ScrollView>{
        Object.keys(toDos).map(key =>
        (
          toDos[key].working === working ?
            <View style={styles.toDo} key={key}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ paddingRight: 20 }}>
                  <TouchableOpacity onPress={() => checkToDos(key)}>
                    <FontAwesome name='check-square' size={18} color={
                      toDos[key].isDone ? "white" : "black"} />
                  </TouchableOpacity>
                </View>
                <Text style={{
                  ...styles.toDoText, textDecorationLine:
                    toDos[key].isDone ? 'line-through' : null
                }}>{toDos[key].text}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ paddingRight: 20 }}>
                  <TouchableOpacity onPress={() => console.log('update')}>
                    <FontAwesome name='pencil' size={18} color="white" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name='trash' size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View> : null)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500"
  }
});
