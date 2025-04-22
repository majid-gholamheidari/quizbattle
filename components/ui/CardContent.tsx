import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface CardContentProps {
    children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
    return <View style={styles.content}><Text>{children}</Text></View>;
};

const styles = StyleSheet.create({
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
});
