import { Text, View, StyleSheet } from 'react-native';
import {Link} from "expo-router";

export default function SettingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Setting screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
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
