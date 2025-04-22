import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { apiRequest } from "@/services/api";
import {useFocusEffect} from "expo-router";

const UserStatsScreen = () => {
    const [quizHistory, setQuizHistory] = useState([]);
    const [summary, setSummary] = useState([]);

    const fetchQuizHistory = async () => {
        try {
            const res = await apiRequest('/quiz-history', { method: "GET", body: null });
            if (res.code === 200) {
                setQuizHistory(res.data.quizzes);
                setSummary(res.data.summary)
            } else {
                alert("Problem loading quiz history!");
            }
        } catch (error) {
            alert("Error connecting to the server!");
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchQuizHistory();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileBox}>
                <Image
                    source={{ uri: summary.avatar }}
                    style={styles.avatar}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{summary.full_name}</Text>
                    <Text style={styles.rank}>Rank: #{summary.rank}</Text>
                </View>
                <View style={styles.badge}>
                    <Ionicons name={'star'} color={"#fff"} size={15} style={{ marginRight: 8 }} />
                    <Text style={styles.badgeText}>{summary.score}</Text>
                </View>
            </View>

            <View style={{ alignItems: "center", marginTop: 12 }}>
                <Text style={{ textAlign: "center", fontSize: 21 }}>Quiz History</Text>
                <View style={{ alignItems: "center", height: 1.5, backgroundColor: '#7e7e7e', marginTop: 8, width: '90%' }} />
            </View>

            <FlatList
                data={quizHistory}
                keyExtractor={(item, index) => `${item.code}-${index}`}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.historyItem}>
                        <View style={styles.historyInfo}>
                            {/*<Text style={{ marginBottom: 8 }}>{item.code}</Text>*/}
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={{ uri: item.category.img }}
                                    style={{ width: 25, height: 25, borderRadius: 8, marginRight: 8 }}
                                />
                                <Text style={styles.quizTitle}>{item.category.title}</Text>
                                <Text style={{ marginLeft:4, fontSize:15, marginTop:2 }}> ({item.difficulty})</Text>
                            </View>
                            <Text style={styles.quizDate}>{item.started_at}</Text>
                        </View>
                        <View style={[
                            styles.scoreBadge,
                            { backgroundColor: item.score != 0 ? (item.score > 0 ? "#59af59" : "#de5c59") : '#9f9f9f' }
                        ]}>
                            <Ionicons
                                name={item.score != 0 ? (item.score > 0 ? "trending-up-outline" : "trending-down-outline") : 'remove-outline'}
                                size={16}
                                color="#fff"
                                style={{ marginRight: 5 }}
                            />
                            <Text style={styles.scoreBadgeText}>{Math.abs(item.score)}</Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 45, fontSize: 35 }}>
                        No quiz history yet.
                    </Text>
                }
            />
        </View>
    );
};

export default UserStatsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingBottom: 53
    },

    profileBox: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        margin: 15,
        borderRadius: 12,
        elevation: 3
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 35,
        marginRight: 15
    },
    userInfo: {
        flex: 1
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5
    },
    rank: {
        fontSize: 16,
        color: "#4b0082",
        fontWeight: "600"
    },

    listContainer: { padding: 20 },
    historyItem: {
        backgroundColor: "#e0e0e0",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    historyInfo: {
        flexDirection: "column"
    },
    quizTitle: { fontSize: 18, fontWeight: "bold" },
    quizDate: { fontSize: 14, color: "#666", marginTop: 4 },

    scoreBadge: {
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    scoreBadgeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15
    },

    badge: {
        backgroundColor: "#4b0082",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14
    }
});
