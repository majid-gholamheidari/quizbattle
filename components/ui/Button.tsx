import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";

interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    children: React.ReactNode;
    variant?: "default" | "outline";
    disabled?: boolean;
    style?: any;
}

export const Button: React.FC<ButtonProps> = ({ onPress, children, variant = "default", disabled = false, style }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.base,
                variant === "outline" ? styles.outline : styles.default,
                disabled && styles.disabled,
                style
            ]}
        >
            <Text style={variant === "outline" ? styles.outlineText : styles.defaultText}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    default: {
        backgroundColor: "#4CAF50",
    },
    outline: {
        borderWidth: 2,
        borderColor: "#4CAF50",
        backgroundColor: "transparent",
    },
    disabled: {
        opacity: 0.5,
    },
    defaultText: {
        color: "#fff",
        fontWeight: "bold",
    },
    outlineText: {
        color: "#4CAF50",
        fontWeight: "bold",
    },
});
