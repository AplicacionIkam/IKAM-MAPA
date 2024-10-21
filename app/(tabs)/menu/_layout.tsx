<<<<<<< HEAD
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
=======
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet } from "react-native";
import colorsIkam from "@/assets/estilos";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/images/ikam-logo.png")}
    />
  );
}
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e

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
<<<<<<< HEAD
        headerShown: true,
        headerStyle: { backgroundColor: colorsIkam.rojo.backgroundColor },
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: "center",
        headerTintColor: "white",
=======
        headerShown: true,        
        headerStyle: { backgroundColor: colorsIkam.rojo.backgroundColor },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          headerTintColor: "white",
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
<<<<<<< HEAD
          tabBarIcon: createTabBarIcon("home", "home-outline"),
=======
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
<<<<<<< HEAD
          tabBarIcon: createTabBarIcon("heart", "heart-outline"),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: createTabBarIcon("chatbubble-ellipses", "chatbubble-outline"),
=======
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
            />
          ),
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
<<<<<<< HEAD
          tabBarIcon: createTabBarIcon("person", "person-outline"),
=======
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
=======
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
