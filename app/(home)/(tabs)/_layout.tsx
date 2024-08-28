import { Stack } from "expo-router";
import React from "react";
import colorsIkam from "@/assets/estilos";
import { Image, StyleSheet } from "react-native";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/images/ikam-logo.png")}
    />
  );
}

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colorsIkam.rojo.backgroundColor },
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerLeft: () => {null}, // Quitar la flecha de retroceso
      }}
    >
      <Stack.Screen name="(menu)" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
