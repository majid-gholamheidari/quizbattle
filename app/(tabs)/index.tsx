import React, { useState } from "react";
import {View, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import { Card } from "@/components/ui/Card";
import { Button, Text } from "react-native-paper";
import { CardContent } from "@/components/ui/CardContent";
import { apiRequest } from "@/services/api";
import {router, useFocusEffect} from "expo-router";

const difficulties = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
];

const questionCounts = [10, 25, 35];

export default function Index() {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<string>("easy");
    const [questionCount, setQuestionCount] = useState<number>(10);

    const fetchCategories = async () => {
        try {
            const res = await apiRequest("/categories");
            if (Array.isArray(res.data.categories)) {
                const sorted = res.data.categories
                    .map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        avatar: item.img_url,
                        sort: item.sort
                    }))
                    .sort((a, b) => a.sort - b.sort);

                setCategories(sorted);

            } else {
                console.error("Invalid categories format:", res);
            }
        } catch (error) {
            console.error("Failed to load categories:", error);
        } finally {
            setSelectedCategory(null)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchCategories();
        }, [])
    );

    const handleStartQuiz = async () => {
        if (!selectedCategory) return;
        try {
            const res = await apiRequest("/start-quiz", {
                method: "POST",
                body: {
                    category: selectedCategory,
                    difficulty: difficulty,
                    question_count: questionCount
                }
            });

            console.log(res)
            if (res.code == 200) {
                const quizCode = res.data.quiz_code;
                router.push(`/quiz/questions/${quizCode}`);
            } else {
                alert("There was a problem starting the quiz!");
            }
        } catch (error) {
            alert("There was a problem connecting to the server!");
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text variant="headlineMedium" style={{ marginBottom: 20 }}>Select Category</Text>
            <View style={styles.cardContainer}>
                {categories.map((cat, index) => (
                    <Card key={`category-${index}`} style={[
                            styles.card,
                            {
                                borderWidth: selectedCategory === cat.id ? 2 : 1,
                                borderColor: selectedCategory === cat.id ? "#4CAF50" : "#ccc",
                            }
                        ]}>
                        <CardContent>
                            <TouchableOpacity  onPress={() => setSelectedCategory(cat.id)} style={{width: "100%"}}>
                                <View style={styles.categorySelection}>
                                    <Image
                                        source={{ uri: cat.avatar }}
                                        style={{ width: 25, height: 25, borderRadius: 8, marginRight: 8 }}
                                    />
                                    <Text style={[styles.cardContent, {fontSize: 17}]}>{cat.title}</Text>
                                </View>

                            </TouchableOpacity>
                        </CardContent>
                    </Card>
                ))}
            </View>

            <Text variant="headlineSmall" style={{ marginBottom: 10 }}>Difficulty</Text>
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

            <Text variant="headlineSmall" style={{ marginBottom: 10 }}>Number of Questions</Text>
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
                disabled={!selectedCategory}
                onPress={handleStartQuiz}
                style={{ marginTop: 20, marginBottom: 75 }}
            >
                Start Quiz
            </Button>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 12
    },
    cardContent: {
        marginLeft: 5,
    },
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 8
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 8
    },
    button: {
        marginRight: 8,
        marginBottom: 8
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    categorySelection: {
        flexDirection: "row",
        alignItems: "center"
    }
});
