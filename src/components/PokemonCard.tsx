// PokemonCard.tsx
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useFavorite } from '../context/FavoritesContext';

interface PokemonCardProps {
  name: string;
  url: string;
  isDark?: boolean;
  onPress: () => void;
  small?: boolean;
  style?: object; 
}

export default function PokemonCard({ name, url, onPress, isDark, small, style }: PokemonCardProps) {
  const [image, setImage] = React.useState<string | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorite();
  const isFavorite = favorites.some(p => p.name === name);

  React.useEffect(() => {
    (async () => {
      const res = await fetch(url);
      const json = await res.json();
      setImage(json.sprites.front_default);
    })();
  }, [url]);

  const cardBg = isDark ? "#1e1e1e" : "#fafafa";
  const textColor = isDark ? "#eee" : "#222";

  const toggleFavorite = () => {
    if (!image) return;
    if (isFavorite) removeFavorite(name);
    else addFavorite({ name, image });
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        small && styles.cardSmall,
        { backgroundColor: cardBg },
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.85 },
        style, // override style tambahan
      ]}
      onPress={onPress}
    >
      <View style={[styles.imageWrapper, small && styles.imageWrapperSmall, { backgroundColor: isDark ? "#2a2a2a" : "#fff" }]}>
        {image ? <Image source={{ uri: image }} style={[styles.img, small && styles.imgSmall]} /> 
               : <ActivityIndicator size="small" color={isDark ? "#fff" : "#007bff"} />}
      </View>

      <View style={styles.right}>
        <Text style={[styles.name, small && styles.nameSmall, { color: textColor }]}>{name}</Text>
      </View>

      <Pressable onPress={toggleFavorite} style={styles.favoriteIcon}>
        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={small ? 18 : 24} color="red"/>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginBottom: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    position: "relative",
  },
  cardSmall: {
    padding: 8,
    marginBottom: 10,
    borderRadius: 10,
  },
  imageWrapper: { width: 65, height: 65, borderRadius: 12, justifyContent: "center", alignItems: "center", overflow: "hidden", elevation: 2 },
  imageWrapperSmall: { width: 45, height: 45, borderRadius: 8 },
  img: { width: "80%", height: "80%", resizeMode: "contain" },
  imgSmall: { width: "70%", height: "70%" },
  right: { flex: 1, justifyContent: "center" },
  name: { fontSize: 20, fontWeight: "700", textTransform: "capitalize" },
  nameSmall: { fontSize: 14 },
  favoriteIcon: { position: "absolute", top: 5, right: 5 },
});
