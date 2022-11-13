import { theme } from './color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    addInput: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 20,
        fontSize: 18
    },
    editInput: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 12
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
