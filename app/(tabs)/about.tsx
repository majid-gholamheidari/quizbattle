import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function AboutScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: 'About QuizBattle' });
    }, []);

    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <Ionicons name="sparkles-outline" size={50} color="#4F46E5" style={styles.icon} />
                <Text style={styles.title}>Welcome to QuizBattle</Text>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.description}>
                        QuizBattle is an exciting and competitive quiz app designed to challenge your knowledge
                        and connect you with friends and players worldwide. Whether you're here to improve your skills,
                        explore new topics, or dominate the leaderboard, we have something for everyone!
                    </Text>

                    <Text style={styles.subTitle}>Features:</Text>
                    <Text style={styles.listItem}>• Real-time quiz battles against other players</Text>
                    <Text style={styles.listItem}>• Wide range of categories to explore</Text>
                    <Text style={styles.listItem}>• Track your performance and climb the leaderboard</Text>
                    <Text style={styles.listItem}>• Regular updates with new content</Text>

                    <Text style={styles.footer}>
                        Ready to test your knowledge? Jump into the game and start battling!
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#F3F4F6',
    },
    card: {
        height: height - 32 - 70,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 5,
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 15,
        marginTop: 15,
        textAlign: 'center',
        color: '#111827',
    },
    content: {
        paddingBottom: 20,
    },
    description: {
        fontSize: 20,
        color: '#374151',
        textAlign: 'justify',
        marginBottom: 35,
        lineHeight: 25,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#1F2937',
    },
    listItem: {
        fontSize: 15,
        color: '#374151',
        marginBottom: 8,
    },
    footer: {
        marginTop: 20,
        fontSize: 16,
        color: '#4F46E5',
        fontWeight: '600',
        textAlign: 'center',
    },
});
