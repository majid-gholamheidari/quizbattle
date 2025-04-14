import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            if (email && password) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await AsyncStorage.setItem("token", "dummy-token");
                router.replace("/(tabs)/");
            } else {
                alert("Email and password are required.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.innerContainer}>
                <Image
                    source={require('../../assets/images/LOGO.png')}
                    style={styles.logo}
                />
                <Text variant="headlineMedium" style={styles.title}>
                    Welcome to QuizBattle
                </Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                >
                    Login
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
    },
    innerContainer: {
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 20,
    },
    title: {
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
});
