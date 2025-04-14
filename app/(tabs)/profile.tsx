import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Text, TextInput, Button, Avatar, RadioButton } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const [fullName, setFullName] = useState("John Doe");
    const [username, setUsername] = useState("john_d");
    const [gender, setGender] = useState("male");
    const email = "john.doe@example.com"; // should be fetched from API in real case
    const [avatar, setAvatar] = useState(null);
    const router = useRouter();

    const handleAvatarChange = () => {
        Alert.alert("Change Avatar", "This feature will let you pick a new avatar!");
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        router.replace("/auth/login");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleAvatarChange}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <Avatar.Icon size={100} icon="account" style={styles.avatarPlaceholder} />
                )}
            </TouchableOpacity>

            <TextInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
            />

            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />

            <TextInput
                label="Email"
                value={email}
                disabled
                style={styles.input}
            />

            <Text style={styles.label}>Gender</Text>
            <RadioButton.Group onValueChange={setGender} value={gender}>
                <View style={styles.genderOption}>
                    <RadioButton value="male" />
                    <Text>Male</Text>
                </View>
                <View style={styles.genderOption}>
                    <RadioButton value="female" />
                    <Text>Female</Text>
                </View>
                <View style={styles.genderOption}>
                    <RadioButton value="other" />
                    <Text>Other</Text>
                </View>
            </RadioButton.Group>

            <Button mode="contained" style={styles.saveButton} onPress={() => Alert.alert("Saved", "Your profile has been updated!")}>
                Save Changes
            </Button>

            <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton}>
                Log Out
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        marginBottom: 20,
    },
    avatarPlaceholder: {
        alignSelf: "center",
        marginBottom: 20,
    },
    input: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 4,
    },
    genderOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    saveButton: {
        marginTop: 20,
        borderRadius: 10
    },
    logoutButton: {
        marginTop: 10,
        // borderColor: "red",
        borderRadius: 10
    },
});
