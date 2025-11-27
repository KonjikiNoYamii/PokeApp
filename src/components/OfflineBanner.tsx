import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { SlideInDown, SlideOutUp } from "react-native-reanimated";

export default function OfflineBanner() {
  return (
    <Animated.View 
      entering={SlideInDown}
      exiting={SlideOutUp}
      style={styles.banner}
    >
      <Text style={styles.text}>⚠ Anda sedang offline</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#E63946",
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
    elevation: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
