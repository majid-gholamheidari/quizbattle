import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from "react-native";
import { Text, TextInput, Button, Avatar, RadioButton } from "react-native-paper";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "@/services/api";
import AvatarCarousel from "@/components/AvatarCarousel";

interface UserProfile {
    first_name?: string;
    last_name?: string;
    gender?: string;
    email?: string;
    username?: string;
    avatar?: string;
}

export default function ProfileScreen() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const loadUserProfile = async () => {
        try {
            const response = await apiRequest("/profile", { method: "GET", body: null });
            if (!response.success || !response.data) {
                throw new Error(response.message || "Failed to fetch profile.");
            }
            setProfile(response.data.profile);
            setAvatar(response.data.profile.avatar ?? "https://avatar.iran.liara.run/public/5");
        } catch (error: any) {
            console.log(error);
            Alert.alert("Error", error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadUserProfile();
        }, [])
    );

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        router.replace("/auth/login");
    };

    const handleSaveChanges = async () => {
        setLoading(true)
        if (!profile) return;

        try {
            const response = await apiRequest("/update-profile", {
                method: "PUT",
                body: {
                    username: profile.username,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    avatar: avatar,
                    gender: profile.gender
                }
            });

            if (!response.success) {
                throw new Error(response.message || "Failed to update profile.");
            }

            Alert.alert("Success", "Your profile has been updated.");
        } catch (error: any) {
            console.log(error);
            Alert.alert("Error", error.message || "Something went wrong.");
        } finally {
            setLoading(true)
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <AvatarCarousel
                            currentAvatar={avatar}
                            onSelect={(url) => setAvatar(url)}
                        />
                    </View>

                    <TextInput
                        label="First Name"
                        value={profile?.first_name}
                        onChangeText={(text) =>
                            setProfile((prev) => ({ ...prev!, first_name: text }))
                        }
                        style={styles.input}
                    />

                    <TextInput
                        label="Last Name"
                        value={profile?.last_name}
                        onChangeText={(text) =>
                            setProfile((prev) => ({ ...prev!, last_name: text }))
                        }
                        style={styles.input}
                    />

                    <TextInput
                        label="Username"
                        value={profile?.username}
                        onChangeText={(text) =>
                            setProfile((prev) => ({ ...prev!, username: text }))
                        }
                        style={styles.input}
                    />

                    <TextInput
                        label="Email"
                        value={profile?.email}
                        disabled
                        style={styles.input}
                    />

                    <Text style={styles.label}>Gender</Text>
                    <RadioButton.Group
                        onValueChange={(value) =>
                            setProfile((prev) => ({ ...prev!, gender: value }))
                        }
                        value={profile?.gender as string}
                    >
                        <View style={styles.genderOption}>
                            <RadioButton value="male" />
                            <Text>Male</Text>
                        </View>
                        <View style={styles.genderOption}>
                            <RadioButton value="female" />
                            <Text>Female</Text>
                        </View>
                    </RadioButton.Group>

                    <Button mode="contained" style={styles.saveButton} onPress={handleSaveChanges}>
                        Save Changes
                    </Button>

                    <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton}>
                        Log Out
                    </Button>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
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
        marginBottom: 20,
    },
    avatarPlaceholder: {
        marginBottom: 20,
    },
    input: {
        width: "100%",
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 4,
        alignSelf: "flex-start",
    },
    genderOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    saveButton: {
        marginTop: 20,
        borderRadius: 10,
        width: "100%",
    },
    logoutButton: {
        marginTop: 10,
        borderRadius: 10,
        width: "100%",
    },
    avatarContainer: {
        height: 160,
        marginBottom: 10,
    },
});
