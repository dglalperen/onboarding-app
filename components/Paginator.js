import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();
  return (
    <Animated.View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const animStyle = useAnimatedStyle(() => {
          return {
            width: interpolate(
              scrollX.value,
              inputRange,
              [10, 20, 10],
              Extrapolate.CLAMP
            ),
            opacity: interpolate(
              scrollX.value,
              inputRange,
              [0.5, 1, 0.5],
              Extrapolate.CLAMP
            ),
          };
        });

        return (
          <Animated.View
            key={index.toString()}
            style={[styles.dot, animStyle]}
          />
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#493d8a",
    marginHorizontal: 8,
  },
});
