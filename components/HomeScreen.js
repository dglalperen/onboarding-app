import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DevSettings } from "react-native";

export default function HomeScreen() {
  const clearOnboarding = async () => {
    try {
      console.log("Onboarding cleared");
      await AsyncStorage.removeItem("@viewedOnboarding");
      DevSettings.reload();
    } catch (error) {
      console.log("Error @setItem: " + error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear Onboarding</Text>
      </TouchableOpacity>
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
