import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

interface AvatarCarouselProps {
    currentAvatar: string | null;
    onSelect: (avatarUrl: string) => void;
}

const avatars = Array.from({ length: 100 }, (_, i) => `https://avatar.iran.liara.run/public/${i + 1}`);

const { width } = Dimensions.get("window");
const ITEM_SIZE = 120;
const CENTER_ITEM_SIZE = 120;
const SPACING = 20;

const AvatarCarousel: React.FC<AvatarCarouselProps> = ({ currentAvatar, onSelect }) => {
    const [activeAvatar, setActiveAvatar] = useState<string | null>(currentAvatar);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (currentAvatar) {
            setActiveAvatar(currentAvatar);
            scrollToAvatar(currentAvatar);
        }
    }, [currentAvatar]);

    const scrollToAvatar = (avatarUrl: string) => {
        const index = avatars.findIndex((a) => a === avatarUrl);
        if (index !== -1 && flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5
            });
        }
    };

    const handleSelect = (avatarUrl: string) => {
        setActiveAvatar(avatarUrl);
        onSelect(avatarUrl);
        scrollToAvatar(avatarUrl);
    };

    return (
        <FlatList
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            data={avatars}
            keyExtractor={(item) => item}
            snapToAlignment="center"
            snapToInterval={ITEM_SIZE + SPACING}
            decelerationRate="fast"
            onScrollToIndexFailed={() => {}} // جلوگیری از ارور در اسکرول سریع
            renderItem={({ item }) => {
                const isActive = item === activeAvatar;
                return (
                    <TouchableOpacity
                        onPress={() => handleSelect(item)}
                        activeOpacity={0.8}
                        style={[
                            styles.avatarContainer,
                            isActive && styles.activeContainer
                        ]}
                    >
                        <Image
                            style={[
                                styles.avatarImage,
                                isActive ? styles.activeAvatar : styles.inactiveAvatar
                            ]}
                            source={{ uri: item }}
                        />
                    </TouchableOpacity>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        justifyContent: "center",
        paddingVertical: 20,
    },
    avatarContainer: {
        alignItems: "center",
    },
    avatarImage: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: ITEM_SIZE / 2,
        borderWidth: 2,
        borderColor: "transparent",
    },
    activeAvatar: {
        width: CENTER_ITEM_SIZE,
        height: CENTER_ITEM_SIZE,
        borderRadius: CENTER_ITEM_SIZE / 2,
        borderColor: "#4CAF50",
        borderWidth: 3,
        opacity: 1,
    },
    inactiveAvatar: {
        opacity: 0.5,
        transform: [{ scale: 0.85 }],
    },
    activeContainer: {
        alignItems: "center",
    }
});

export default AvatarCarousel;
