import React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle, StyleProp } from "react-native";

interface CardProps {
    children: React.ReactNode;
    onClick?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({ children, onClick, style }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onClick}
            style={[styles.card, style]}
        >
            <View>{children}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
});
