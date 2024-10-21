import React, { type ComponentProps } from "react";
import { Image, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import colorsIkam from "@/assets/estilos";

// Componente LogoTitle
const LogoTitle = () => (
  <Image
    style={styles.image}
    source={require("@/assets/images/ikam-logo.png")}
  />
);

// Extraemos el tipo para el nombre de los íconos válidos
type IoniconsName = ComponentProps<typeof TabBarIcon>['name'];

// Función para crear el ícono de la pestaña
const createTabBarIcon = (focusedName: IoniconsName, unfocusedName: IoniconsName) => 
  ({ color, focused }: { color: string; focused: boolean }) => (
    <TabBarIcon name={focused ? focusedName : unfocusedName} color={color} />
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#222C57",
          height: 65,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#FFFFFF",
        headerShown: true,
        headerStyle: { backgroundColor: colorsIkam.rojo.backgroundColor },
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: createTabBarIcon("home", "home-outline"),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: createTabBarIcon("heart", "heart-outline"),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: createTabBarIcon("chatbubble-ellipses", "chatbubble-outline"),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: createTabBarIcon("person", "person-outline"),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
