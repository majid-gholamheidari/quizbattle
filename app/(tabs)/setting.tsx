import { Text, View, StyleSheet } from 'react-native';
import {Link} from "expo-router";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 25
    },
    button: {
        margin: 9,
        backgroundColor: '#f3f3f3',
        padding: 12,
        borderRadius: 8
    }
});
