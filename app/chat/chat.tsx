import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
<<<<<<< HEAD
=======
  FlatList,
  Image,
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
<<<<<<< HEAD
import { Feather } from "@expo/vector-icons";
import colorsIkam from "@/assets/estilos";
import { getUserData } from "@/auth/authService";
import { User } from "@/models/User";
import {
  enviarMensaje,
  suscribirseAlChat,
  verificarYCrearChat,
} from "@/services/services";
import * as Notifications from "expo-notifications";

type Mensaje = {
  user: string;
  mensaje: string;
  timestamp: string;
};

// Función para enviar notificación push con manejo de errores
async function sendPushNotification(
  expoPushToken: string,
  title: string,
  body: string
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { someData: "chat message" },
  };

  console.log(message);

  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();

    // Verificación de estado
    if (response.ok) {
      console.log("Notificación enviada exitosamente:", data);
      return true; // Notificación enviada con éxito
    } else {
      console.error("Error al enviar la notificación:", data);
      return false; // Error en el envío
    }
  } catch (error) {
    console.error("Error de red o al enviar la notificación:", error);
    return false; // Error de red o fallo en el envío
  }
}

const chatNuevo = () => {
  const item = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData?.uid && item) {
      const chatId = item.id;
      const crearChatYEscucharMensajes = () => {
        const unsubscribe = suscribirseAlChat(chatId.toString(), (mensajes) => {
          setMensajes(mensajes);
        });
        return () => unsubscribe && unsubscribe();
      };
      crearChatYEscucharMensajes();
    }
  }, [userData]);

  // Enviar mensaje y notificación push
  const enviarMesaje = async () => {
    if (mensaje.trim() === "") return;
    const chatId = item.id;

    if (userData?.uid) {
      // Enviar mensaje al chat
      enviarMensaje(chatId.toString(), mensaje, userData.uid);

      // Preparar notificación
      const recipientPushToken = "ExponentPushToken[EdC2GpIy1XndDqpGe7NRsX]"; // Token del usuario receptor
      const tituloNotificacion = userData.display_name; // Usar el nombre del usuario como título
      const cuerpoNotificacion = mensaje; // Usar el mensaje como cuerpo

      // Enviar notificación
      const notificacionEnviada = await sendPushNotification(
        recipientPushToken,
        tituloNotificacion,
        cuerpoNotificacion
      );

      if (notificacionEnviada) {
        console.log("La notificación fue enviada correctamente");
      } else {
        console.log("Hubo un error al enviar la notificación");
      }
    }
    setMensaje("");
  };

  const formatearHora = (timestamp: any) => {
    const date = timestamp.toDate(); // Convertir el Timestamp a objeto Date
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Formato de hora
=======
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import colorsIkam from "@/assets/estilos";
type Mensaje = {
  user: string;
  mensaje: string;
  time: string;
};

const chat = () => {
  const item = useLocalSearchParams();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mensaje, setMensaje] = useState("");
  const user = "1";

  const men = [
    {
      user: "1",
      mensaje: " hola, buenas noches",
      time: "10:30 pm",
    },
    { user: "2", mensaje: "hola, buenas noches", time: "10:32 pm" },
    { user: "2", mensaje: "En que le puedo servir", time: "10:32 pm" },
    { user: "1", mensaje: "Quisiera saber los costos", time: "10:33 pm" },
    { user: "2", mensaje: "Le envio nuestra lista de precios", time: "10:32 pm" },
    { user: "1", mensaje: "Gracias", time: "10:33 pm" },
  ];

  useEffect(() => {
    setMensajes(men);
  }, []);  

  const verDetalle = (item: any) => {
    // router.push({ pathname: "/list/[id]", params: item });
  };

  const enviarMesaje = () => {
    if (mensaje == "") return;
    // console.log(mensaje);
    setMensajes((prevMensajes) => [
      ...prevMensajes,
      { user: "1", mensaje: mensaje, time: "10:50 pm" },
    ]);

    setMensaje("");
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
  };

  return (
    <View style={estilos.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colorsIkam.rojo.backgroundColor },
<<<<<<< HEAD
          headerTitle: item.nombre ? item.nombre.toString() : "Sin nombre",
          headerTintColor: "white",
          headerBackTitle: "Volver",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <View style={estilos.chatContainer}>
        <ScrollView>
          <View style={estilos.messagesContainer}>
            <Text
              style={{ fontSize: 20, textAlign: "center", marginTop: 15 }}
            ></Text>
            {mensajes.length > 0 ? (
              <View>
                {mensajes.map((m, index) => (
                  <View key={index}>
                    {m.user == userData?.uid ? (
                      <View style={estilos.containerMensajeDerecha}>
                        <View style={estilos.messageContainerDer}>
                          <View>
                            <Text style={estilos.mensajeTexto}>
                              {m.mensaje}
                            </Text>
                            <Text style={estilos.mensajeHora}>
                              {formatearHora(m.timestamp)}
                            </Text>
=======
          headerTitle: item.nombre_pyme.toString(),
          headerTintColor: "white",
          headerBackTitle: "Volver",
          headerShown: true,
          headerTitleAlign: "center",          
        }}
      />
      {/* <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "blue" },
          headerTintColor: "white",
          headerBackTitle: "Atras",
          headerTitle: `${item.nombre}`,
          headerTitleAlign: "center",
          headerRight: () => (
            <View>
              {item?.img && typeof item.img === "string" && (
                <TouchableOpacity onPress={() => verDetalle(item)}>
                  <Image
                    source={{ uri: item.img }}
                    style={estilos.headerImage}
                  />
                </TouchableOpacity>
              )}
            </View>
          ),
        }}
      /> */}
      <View style={estilos.chatContainer}>
        <ScrollView>
          <View style={estilos.messagesContainer}>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 15 }}>
              {item.img}
            </Text>
            {mensajes.length > 0 ? (
              <View>
                {mensajes.map((m, index) => (
                  <View>
                    {m.user == "1" ? (
                      <View style={estilos.containerMensajeDerecha}>
                        <View style={estilos.messageContainerDer}>
                          <View key={index}>
                            <Text style={estilos.mensajeTexto}>
                              {m.mensaje}
                            </Text>
                            <Text style={estilos.mensajeHora}>{m.time}</Text>
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View style={estilos.containerMensajeIzquierda}>
                        <View style={estilos.messageContainerIzq}>
<<<<<<< HEAD
                          <View>
                            <Text style={estilos.mensajeTexto}>
                              {m.mensaje}
                            </Text>
                            <Text style={estilos.mensajeHora}>
                              {formatearHora(m.timestamp)}
                            </Text>
=======
                          <View key={index}>
                            <Text style={estilos.mensajeTexto}>
                              {m.mensaje}
                            </Text>
                            <Text style={estilos.mensajeHora}>{m.time}</Text>
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ) : (
<<<<<<< HEAD
              <View>{/* <Text>No hay mensajes todavia</Text> */}</View>
=======
              <View>
                <Text>No hay mensajes todavia</Text>
              </View>
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
            )}
          </View>
        </ScrollView>
        <View style={estilos.inputContainer}>
          <View style={estilos.inputRow}>
            <TextInput
              placeholder="Mensaje"
              style={estilos.textInput}
              value={mensaje}
              onChangeText={(mensaje) => setMensaje(mensaje)}
            />
            <TouchableOpacity style={estilos.sendButton} onPress={enviarMesaje}>
              <Feather name="send" size={25} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
  },
<<<<<<< HEAD
=======
  headerImage: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
  chatContainer: {
    flex: 1,
    justifyContent: "space-between",
    overflow: "visible",
  },
  messagesContainer: {
    flex: 1,
  },
  containerMensajeIzquierda: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
    marginLeft: 12,
  },
  messageContainerIzq: {
    alignSelf: "flex-end",
    padding: 12,
    borderRadius: 24,
    backgroundColor: "#CEF8FF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    maxWidth: 350,
  },
  containerMensajeDerecha: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
    marginRight: 12,
  },
  messageContainerDer: {
    alignSelf: "flex-end",
    padding: 12,
    borderRadius: 24,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    maxWidth: 350,
  },
  mensajeTexto: {
    fontSize: 20,
  },
  mensajeHora: {
    fontSize: 10,
    textAlign: "right",
  },
  inputContainer: {
    padding: 8,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 2,
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    fontSize: 20,
    marginLeft: 15,
  },
  sendButton: {
    position: "relative",
    backgroundColor: "#e5e5e5",
    padding: 5,
    marginRight: 2,
    borderRadius: 50, // rounded-full
  },
});

<<<<<<< HEAD
export default chatNuevo;
=======
export default chat;
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
