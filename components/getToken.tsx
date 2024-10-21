import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert, Platform } from "react-native";

const GetPushNotificationToken = async () => {
  let token;

  if (Constants.isDevice) {
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Token de notificación:", token);
  } else {
    Alert.alert(
      "Debe usar un dispositivo físico para recibir notificaciones push"
    );
    return null;
  }

  // Opciones adicionales para Android
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

export default GetPushNotificationToken