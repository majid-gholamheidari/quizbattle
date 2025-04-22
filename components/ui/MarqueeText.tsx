import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

interface Props {
    text: string;
    speed?: number;
}

export default function MarqueeText({ text, speed = 50 }: Props) {
    const translateX = useRef(new Animated.Value(0)).current;
    const textWidth = useRef(0);
    const containerWidth = useRef(0);
    const [shouldScroll, setShouldScroll] = useState(false);

    useEffect(() => {
        if (shouldScroll) {
            const distance = textWidth.current + containerWidth.current;
            const duration = (distance / speed) * 1000;

            const animate = () => {
                translateX.setValue(containerWidth.current);
                Animated.timing(translateX, {
                    toValue: -textWidth.current,
                    duration,
                    useNativeDriver: true,
                }).start(() => animate());
            };
            animate();
        }
    }, [shouldScroll, text, speed]);

    return (
        <View
            style={styles.container}
            onLayout={(e) => {
                containerWidth.current = e.nativeEvent.layout.width;
                if (textWidth.current > containerWidth.current) {
                    setShouldScroll(true);
                } else {
                    setShouldScroll(false);
                }
            }}
        >
            <Animated.Text
                onLayout={(e) => {
                    textWidth.current = e.nativeEvent.layout.width;
                    if (textWidth.current > containerWidth.current) {
                        setShouldScroll(true);
                    } else {
                        setShouldScroll(false);
                        translateX.setValue(0);
                    }
                }}
                style={[
                    styles.text,
                    shouldScroll ? { transform: [{ translateX }] } : {},
                ]}
                numberOfLines={1}
            >
                {text}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        flex: 1,
    },
    text: {
        fontSize: 17,
    },
});
