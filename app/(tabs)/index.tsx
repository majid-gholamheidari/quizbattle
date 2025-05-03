import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-paper";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { apiRequest } from "@/services/api";
import { router, useFocusEffect } from "expo-router";

const difficulties = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
];

const questionCounts = [10, 25, 35];

type Category = {
    id: number;
    title: string;
    img_url: string;
};

type Group = {
    code: string;
    categories: Category[];
};

export default function Index() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupCode, setSelectedGroupCode] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [difficulty, setDifficulty] = useState<string>("easy");
    const [questionCount, setQuestionCount] = useState<number>(10);

    const fetchCategories = async () => {
        try {
            const res = await apiRequest("/categories");
            if (Array.isArray(res.data.groups)) {
                setGroups(res.data.groups); // همینه فقط همین
            } else {
                console.error("Invalid groups format:", res);
            }
        } catch (error) {
            console.error("Failed to load groups:", error);
        } finally {
            setSelectedCategories([]);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchCategories();
        }, [])
    );

    const handleStartQuiz = async () => {
        if (selectedCategories.length === 0) return;
        try {
            const res = await apiRequest("/start-quiz", {
                method: "POST",
                body: {
                    categories: selectedCategories,
                    difficulty: difficulty,
                    question_count: questionCount,
                },
            });

            if (res.code === 200) {
                const quizCode = res.data.quiz_code;
                router.push(`/quiz/questions/${quizCode}`);
            } else {
                alert("There was a problem starting the quiz! #781");
            }
        } catch (error) {
            alert("There was a problem connecting to the server! #458");
        }
    };

    const handleSelectGroup = (group: Group) => {
        const ids = group.categories.map((cat) => cat.id);
        setSelectedCategories(ids);
        setSelectedGroupCode(group.code);
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>
                Start New Quiz
            </Text>

            <Text variant="headlineSmall" style={{ marginTop: 20, marginBottom: 10 }}>
                Choose your knowledge pack
            </Text>

            <View style={styles.groupContainer}>
                {groups.map((group) => (
                    <TouchableOpacity
                        key={group.code}
                        activeOpacity={0.8}
                        onPress={() => handleSelectGroup(group)}
                    >
                        <View style={[ styles.groupCard, selectedGroupCode === group.code && styles.groupSelected ]}>
                            <CardContent>
                                <View style={styles.categoriesRow}>
                                    {group.categories.map((cat) => (
                                        <View key={cat.id} style={styles.categoryItem}>
                                            <Image
                                                source={{ uri: cat.img_url }}
                                                style={styles.categoryImage}
                                            />
                                            <Text style={styles.categoryText} numberOfLines={2}>
                                                {cat.title}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </CardContent>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <Text variant="headlineSmall" style={{ marginTop: 20, marginBottom: 10 }}>
                Difficulty
            </Text>

            <View style={styles.row}>
                {difficulties.map((level) => (
                    <Button
                        key={level.value}
                        mode={difficulty === level.value ? "contained" : "outlined"}
                        onPress={() => setDifficulty(level.value)}
                        style={styles.button}
                    >
                        {level.label}
                    </Button>
                ))}
            </View>

            <Text variant="headlineSmall" style={{ marginTop: 20, marginBottom: 10 }}>
                Number of Questions
            </Text>

            <View style={styles.row}>
                {questionCounts.map((count) => (
                    <Button
                        key={count}
                        mode={questionCount === count ? "contained" : "outlined"}
                        onPress={() => setQuestionCount(count)}
                        style={styles.button}
                    >
                        {count}
                    </Button>
                ))}
            </View>

            <Button
                mode="contained"
                disabled={selectedCategories.length === 0}
                onPress={handleStartQuiz}
                style={{ marginTop: 30, marginBottom: 75 }}
            >
                Start Quiz
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    groupContainer: {
        flexDirection: "column",
        gap: 16,
        marginTop: 16,
    },
    groupCard: {
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#fdfdfd",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4
    },
    groupSelected: {
        backgroundColor: "rgb(215,204,222)",
        borderColor: "#4b0082",
        borderWidth: 2,
        shadowColor: "#4b0082",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    categoriesRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    categoryItem: {
        width: "48%",
        alignItems: "center",
        marginBottom: 12,
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 13,
        textAlign: "center",
        color: "#333",
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    button: {
        marginRight: 8,
        marginBottom: 8,
    },
});
