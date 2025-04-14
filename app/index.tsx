import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

export default function IndexPage() {
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    router.replace("/(tabs)/");
                } else {
                    router.replace("/auth/login");
                }
            } catch (error) {
                console.error("Error checking token:", error);
            } finally {
                setChecking(false);
            }
        };

        checkToken();
    }, []);

    if (checking) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return null;
}
