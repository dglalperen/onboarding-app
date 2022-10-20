import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  DevSettings,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import slides from "../Data/slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import { useSharedValue } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const slidesRef = useRef();

  const onViewCallback = useCallback((viewableItems) => {
    setCurrentIndex(viewableItems.viewableItems[0].index);
  }, []);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        console.log("Onboarding viewed");
        await AsyncStorage.setItem("@viewedOnboarding", "true");
        DevSettings.reload();
      } catch (error) {
        console.log("Error @setItem: " + error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={({ nativeEvent }) => {
            scrollX.value = nativeEvent.contentOffset.x;
          }}
          scrollEventThrottle={32}
          onViewableItemsChanged={onViewCallback}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton
        percentage={(currentIndex + 1) * (100 / slides.length)}
        scrollTo={scrollTo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
