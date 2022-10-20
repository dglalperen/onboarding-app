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
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={clearOnboarding}>
        <Text style={styles.buttonText}>Clear Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444b6f",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "900",
    color: "white",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#f4338f",

    borderRadius: "50%",
  },
  buttonText: {
    fontSize: 30,
    padding: 20,
    fontWeight: "500",
    color: "white",
  },
});
