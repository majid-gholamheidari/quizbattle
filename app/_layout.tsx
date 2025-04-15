import { useLoading } from '@/stores/useLoading';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    const loading = useLoading(state => state.loading);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}
            <Slot />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#00000055',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    }
})
