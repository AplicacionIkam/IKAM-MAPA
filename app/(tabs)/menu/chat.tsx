import { getUserData } from "@/auth/authService";
import Chatlist from "@/components/Chatlist";
import { Pyme } from "@/models/Pyme";
import { User } from "@/models/User";
import {
  suscribirseAPymes,
  suscribirseAChats,
  suscribirseAMensajes,
  suscribirseAChatsPyme,
  suscribirseAMensajesPyme,
  suscribirseAUser,
} from "@/services/services"; // Asegúrate de que las funciones estén definidas
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";

interface Chat {
  id: string;
  idPyme: string;
  idUser: string;
  ultimoMensaje?: string;
  hora?: string;
  user?:string;
}

interface Chats {
  id: string;
  idPyme: string;
  idUser: string;
  img: string;
  nombre: string;
  ultimoMensaje?: string;
  hora?: string;
  user?:string;
}

const Chat = () => {
  const [userData, setUserData] = useState<User | null>(null);

  const [pymes, setPymes] = useState<Pyme[]>([]);
  const [users, setUsers] = useState<User[] | null>(null);

  // Paso 1
  const [chat, setChat] = useState<Chat[]>([]);
  const [chats, setChats] = useState<Chats[]>([]);
  // Paso 2
  const [chatPyme, setChatPyme] = useState<Chat[]>([]);
  const [chatsPyme, setChatsPyme] = useState<Chats[]>([]);

  // Datos del Usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Traer PYMEs
  useEffect(() => {
    const unsubscribe = suscribirseAPymes((pymesData) => {
      const pymesOrdenadas = pymesData.sort((a, b) =>
        a.nombre_pyme.localeCompare(b.nombre_pyme)
      );
      setPymes(pymesOrdenadas);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  // Traer usuarios si es pyme
  useEffect(() => {
    if (userData?.isPyme) {
      const unsubscribe = suscribirseAUser((userData) => {
        setUsers(userData); // Actualiza el estado de los usuarios
      });

      return () => unsubscribe && unsubscribe();
    }
  }, [userData]);

  // 1.- Traer chats del usuario
  useEffect(() => {
    if (userData) {
      const unsubscribe = suscribirseAChats(userData.uid, (chatsData) => {
        setChat(chatsData); // Guarda los chats en el estado
      });

      return () => unsubscribe && unsubscribe();
    }
  }, [userData]);

  // 2.- Escuchar mensajes y actualizar el último mensaje
  useEffect(() => {
    chat.forEach((chatItem) => {
      const unsubscribe = suscribirseAMensajes(chatItem.id, (mensajes: any) => {
        if (mensajes.length > 0) {
          const ultimoMensaje = mensajes[mensajes.length - 1]; // Obtiene el último mensaje
          setChats((prevChats) =>
            prevChats.map((c) =>
              c.id === chatItem.id
                ? {
                    ...c,
                    ultimoMensaje: ultimoMensaje.mensaje,
                    hora: ultimoMensaje.timestamp,
                    user:ultimoMensaje.user
                  }
                : c
            )
          );
        }
      });

      return () => unsubscribe && unsubscribe();
    });
  }, [chat]);

  // 3.- Combinar chats con PYMEs
  useEffect(() => {
    const chatsConInfo = chat
      .map((chatItem) => {
        const pyme = pymes.find((p) => p.id === chatItem.idPyme);
        return {
          id: chatItem.id,
          user:chatItem.user,
          idPyme: chatItem.idPyme,
          idUser: chatItem.idUser,
          img: pyme ? pyme.imagen1 : "",
          nombre: pyme ? pyme.nombre_pyme : "PYME no encontrada",
          ultimoMensaje: chatItem.ultimoMensaje,
          hora: chatItem.hora || new Date().toISOString(),
        };
      })
      .sort((a, b) => new Date(a.hora).getTime() - new Date(b.hora).getTime());

    setChats(chatsConInfo);
  }, [chat, pymes]);

  /***
   *
   * Aqui esta la logica para los chats que son para la pyme
   *
   */

  // 1.- Traer chats del usuario-pyme
  useEffect(() => {
    if (userData?.isPyme) {
      const unsubscribe = suscribirseAChatsPyme(userData.pyme, (chatsData) => {
        setChatPyme(chatsData);
      });

      return () => unsubscribe && unsubscribe();
    }
  }, [userData]);

  // 2.- Escuchar mensajes y actualizar el último mensaje
  useEffect(() => {
    if (chatPyme.length > 0) {
      const unsubscribeArray = chatPyme.map((chatItem) =>
        suscribirseAMensajesPyme(chatItem.id, (mensajes: any) => {
          if (mensajes.length > 0) {
            const ultimoMensaje = mensajes[mensajes.length - 1];
            setChatPyme((prevChats) =>
              prevChats.map((c) =>
                c.id === chatItem.id
                  ? {
                      ...c,
                      ultimoMensaje: ultimoMensaje.mensaje,
                      hora: ultimoMensaje.timestamp,
                      user: ultimoMensaje.user
                    }
                  : c
              )
            );
          }
        })
      );

      return () =>
        unsubscribeArray.forEach((unsubscribe) => unsubscribe && unsubscribe());
    }
  }, [chatPyme]);

  // 3.- Combinar chats con PYMEs
  useEffect(() => {
    const chatsConInfo = chatPyme.map((chatItem) => {
      const user = users?.find((p) => p.id === chatItem.idUser);
      return {
        id: chatItem.id,
        user: chatItem.user,
        idPyme: chatItem.idPyme,
        idUser: chatItem.idUser,
        img: user ? user.photo_url : "",
        nombre: user
          ? user.display_name.toUpperCase() + " " + user.last_name.toUpperCase()
          : "PYME no encontrada",
        ultimoMensaje: chatItem.ultimoMensaje,
        hora: chatItem.hora || new Date().toISOString(),
      };
    });
    setChatsPyme(chatsConInfo);
  }, [chatPyme, users]);

  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ flex: 1 }}>
        {chatsPyme.length > 0 && (
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#333",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Mensajes de tus clientes
            </Text>
            <Chatlist users={chatsPyme} user={userData?.uid}/>
          </View>
        )}

        {chats.length > 0 && (
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#333",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Interacciones con otras tiendas
            </Text>
            <Chatlist users={chats} user={userData?.uid} />
          </View>
        )}

        {chats.length == 0 && chatsPyme.length == 0 && (
          <Text 
          style={{ 
            fontSize: 24, 
            color: "#888", 
            textAlign: "center", 
            marginTop: "50%", 
            fontWeight: "bold" 
          }}>
          No tienes interacciones recientes
        </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Chat;
