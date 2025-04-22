import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, BackHandler, Alert } from "react-native";
import { Button } from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";
import {apiRequest} from "@/services/api";

export default function QuizPage() {
    const { quizId } = useLocalSearchParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [questions, setQuestions] = useState([]);


    const question = questions[currentQuestion];

    const handleNext = () => { setSelectedOption(null); setCurrentQuestion(prev => prev + 1); };
    const handlePrev = () => { setSelectedOption(null); setCurrentQuestion(prev => prev - 1); };

    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    "Exit Quiz",
                    "If you exit now, you will receive a negative score. Are you sure?",
                    [
                        { text: "Back to Quiz", style: "cancel" },
                        {
                            text: "Exit",
                            style: "destructive",
                            onPress: async () => {
                                try {
                                    await apiRequest(`/${quizId}/leave-quiz`, {method: "POST"});
                                } catch (error) {
                                    console.error("Error notifying server about leaving quiz:", error);
                                } finally {
                                    router.push('/score');
                                }
                            }
                        }
                    ]
                );
                return true;
            };

            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, [router, quizId])
    );

    const fetchQuestions = async () => {
        try {
            const res = await apiRequest(`/${quizId}/questions`);
            if (res.code === 200) {
                setQuestions(res.data.questions);
            } else {
                alert("Problem loading quiz questions!");
            }
        } catch (error) {
            alert("Error connecting to the server!");
        }
    };
    useEffect(() => {
        if (quizId) {
            fetchQuestions();
        }
    }, [quizId]);

    const handleOptionSelect = (index: number) => {
        setQuestions(prev => {
            const newArr = [...prev];
            newArr[currentQuestion].selectedAnswer = newArr[currentQuestion].options[index];
            return newArr;
        });
        setSelectedOption(index);
    };

    const handleFinish = async () => {
        if (!questions.length) return;

        const payload = {
            questions: questions.map(q => ({
                id: q.id,
                answer: q.selectedAnswer || " "
            }))
        };

        try {
            const res = await apiRequest(`/${quizId}/save-answers`, {
                method: "POST",
                body: payload
            });

            if (res.code === 200) {
                alert("Your answers were submitted successfully!");
                router.push("/score");
            } else {
                alert("There was a problem saving your answers.");
            }
        } catch (error) {
            alert("Could not connect to the server!");
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Quiz Code: {quizId}</Text>
                <View style={{ height: 2.5, backgroundColor: '#6750a4', marginTop: 8 }} />
            </View>

            {questions.length === 0 ? (
                <View style={styles.questionWrapper}>
                    <Text style={{ fontSize: 18 }}>Loading questions...</Text>
                </View>
            ) : (
                <>
                    <View style={styles.questionWrapper}>
                        <View style={styles.card}>
                            <LinearGradient
                                colors={["#5734b7", "#b0a1d9"]}
                                style={ styles.questionContainer }
                            >
                                <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
                            </LinearGradient>

                            {questions[currentQuestion].options.map((opt, index) => (
                                <Button
                                    key={index}
                                    mode={selectedOption === index ? "contained" : "outlined"}
                                    onPress={() => handleOptionSelect(index)}
                                    style={{ marginBottom: 10, borderRadius: 8, paddingVertical: 4 }}
                                >
                                    {opt}
                                </Button>
                            ))}
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        {currentQuestion === 0 && (
                            <Button
                                mode="outlined"
                                onPress={handleNext}
                                style={styles.fullWidth}
                            >
                                Next
                            </Button>
                        )}

                        {currentQuestion > 0 && currentQuestion < questions.length - 1 && (
                            <>
                                <Button
                                    mode="outlined"
                                    onPress={handlePrev}
                                    style={styles.halfWidth}
                                >
                                    Previous
                                </Button>
                                <Button
                                    mode="outlined"
                                    onPress={handleNext}
                                    style={styles.halfWidth}
                                >
                                    Next
                                </Button>
                            </>
                        )}

                        {currentQuestion === questions.length - 1 && (
                            <>
                                <Button
                                    mode="outlined"
                                    onPress={handlePrev}
                                    style={styles.halfWidth}
                                >
                                    Previous
                                </Button>
                                <Button
                                    mode="outlined"
                                    onPress={handleFinish}
                                    style={styles.halfWidth}
                                >
                                    Finish Quiz
                                </Button>
                            </>
                        )}
                    </View>
                </>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        padding: 10,
        borderRadius: 8,
        margin: 20,
    },
    headerText: {
        color: "#6750a4",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    questionWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    questionContainer: {
        height: 195,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 25
    },
    card: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
        width: "100%",
        elevation: 2
    },
    questionText: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 15,
        color: "#fff"
    },
    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    fullWidth: {
        width: "100%",
        marginBottom: 10,
        borderRadius: 8,
    },
    halfWidth: {
        width: "48%",
        marginBottom: 10,
        borderRadius: 8,
    }
});
