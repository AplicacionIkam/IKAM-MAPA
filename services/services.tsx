<<<<<<< HEAD
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
=======
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
import { ikam } from "@/firebase/config-ikam";
import { Pyme } from "@/models/Pyme";
import { Categoria } from "@/models/Categoria";
import AsyncStorage from "@react-native-async-storage/async-storage";
<<<<<<< HEAD
import user from "@/app/configuracion/perfil";
import { User } from "@/models/User";
=======
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e

export const suscribirseAPymes = (callback: (pymes: Pyme[]) => void) => {
  try {
    const unsubscribe = onSnapshot(
      collection(ikam, "pyme"),
      (querySnapshot) => {
        const pymesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Pyme[];
        callback(pymesArray);
      }
    );

    return unsubscribe; // Devuelve la función de limpieza
  } catch (error) {
    console.error("Error suscribiéndose a las pymes:", error);
  }
};

export const suscribirseACategorias = (
  callback: (categorias: Categoria[]) => void
) => {
  try {
    // Se suscribe a la colección "categoria" y actualiza el estado cuando hay cambios
    const unsubscribe = onSnapshot(
      collection(ikam, "categoria"),
      (querySnapshot) => {
        const categoriasArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Categoria[];
        callback(categoriasArray);
      }
    );

    // Retorna la función de limpieza para cancelar la suscripción
    return unsubscribe;
  } catch (error) {
    console.error("Error suscribiéndose a las categorías:", error);
  }
};

export const suscribirseAColonias = (callback: (colonias: any[]) => void) => {
  try {
    const unsubscribe = onSnapshot(
      collection(ikam, "colonia"),
      (querySnapshot) => {
        const coloniasArray = querySnapshot.docs.map((doc) => ({
          // id: `${doc.id}-${doc.data().nombreCol}`,
          label: doc.data().nombreCol,
          value: doc.data().nombreCol,
        }));
        callback(coloniasArray);
      }
    );
<<<<<<< HEAD

=======
    
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    return unsubscribe; // Devuelve la función de limpieza para cancelar la suscripción
  } catch (error) {
    console.error("Error suscribiéndose a las colonias:", error);
  }
};

export const obtenerDetallesPyme = async (pymeId: string) => {
  try {
    const docRef = doc(ikam, "pyme", pymeId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Pyme) : null;
  } catch (error) {
    console.error("Error obteniendo detalles de la pyme:", error);
    return null;
  }
};

export const getQuestions = async () => {
  try {
<<<<<<< HEAD
    const querySnapshot = await getDocs(collection(ikam, "preguntas"));
    const questions = querySnapshot.docs.map((doc) => ({
=======
    const querySnapshot = await getDocs(collection(ikam, 'preguntas'));
    const questions = querySnapshot.docs.map(doc => ({
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
      id: doc.id,
      ...doc.data(),
    }));
    return questions;
  } catch (error) {
<<<<<<< HEAD
    console.error("Error fetching questions:", error);
=======
    console.error('Error fetching questions:', error);
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    return [];
  }
};

<<<<<<< HEAD
export const subscribeToQuestions = (callback: any) => {
  try {
    const unsubscribe = onSnapshot(
      collection(ikam, "preguntas"),
      (querySnapshot) => {
        const questions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(questions);
      }
    );

    return unsubscribe; // Devuelve la función de desuscripción
  } catch (error) {
    console.error("Error subscribing to questions:", error);
=======
export const subscribeToQuestions = (callback:any) => {
  try {
    const unsubscribe = onSnapshot(collection(ikam, 'preguntas'), (querySnapshot) => {
      const questions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(questions);
    });

    return unsubscribe; // Devuelve la función de desuscripción
  } catch (error) {
    console.error('Error subscribing to questions:', error);
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    return () => {}; // Retorna una función vacía en caso de error
  }
};

<<<<<<< HEAD
export const preguntaDb = async (pregunta: any, correo: any) => {
  try {
    await addDoc(collection(ikam, "preguntas"), {
      correo: correo,
      pregunta: pregunta,
      created_time: Timestamp.now(),
    });
    console.log("Documento agregado con éxito");
  } catch (error) {
    console.error("Error al agregar el documento:", error);
  }
};

export const soporte = async (asunto: any, mensaje: any, correo: any) => {
  try {
    await addDoc(collection(ikam, "soporte"), {
      correo: correo,
      asunto: asunto,
      mensaje: mensaje,
      created_time: Timestamp.now(),
    });
    console.log("Documento agregado con éxito");
  } catch (error) {
    console.error("Error al agregar el documento:", error);
  }
};

export const listenToUserChanges = (userUID: any, setUserData: any) => {
=======
export const preguntaDb = async (pregunta:any, correo:any) => {
  try {
    await addDoc(collection(ikam, "preguntas"), {      
      correo: correo,
      pregunta: pregunta,      
      created_time: Timestamp.now()
    });
    console.log('Documento agregado con éxito');
  } catch (error) {
    console.error('Error al agregar el documento:', error);
  }
};

export const soporte = async (asunto:any, mensaje:any, correo:any) => {
  try {
    await addDoc(collection(ikam, "soporte"), {      
      correo: correo,
      asunto: asunto,
      mensaje: mensaje,
      created_time: Timestamp.now()
    });
    console.log('Documento agregado con éxito');
  } catch (error) {
    console.error('Error al agregar el documento:', error);
  }
};

export const listenToUserChanges = (userUID:any, setUserData:any) => {
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
  const userDocRef = doc(ikam, "users", userUID);

  // Escuchar los cambios en el documento del usuario
  const unsubscribe = onSnapshot(userDocRef, async (docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
<<<<<<< HEAD
      console.log("Datos del usuario actualizados:", userData);

      // Combinar el `uid` con los datos obtenidos del documento
      const combinedUserData = {
        ...userData, // Datos de Firestore
        uid: userUID, // Añadir el UID del usuario
=======
      console.log('Datos del usuario actualizados:', userData);

      // Combinar el `uid` con los datos obtenidos del documento
      const combinedUserData = {
        ...userData,  // Datos de Firestore
        uid: userUID  // Añadir el UID del usuario
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
      };

      // Guardar los datos actualizados en AsyncStorage
      try {
<<<<<<< HEAD
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify(combinedUserData)
        );
        console.log("Datos del usuario guardados en AsyncStorage.");
      } catch (error) {
        console.error("Error al guardar los datos en AsyncStorage:", error);
=======
        await AsyncStorage.setItem('userData', JSON.stringify(combinedUserData));
        console.log('Datos del usuario guardados en AsyncStorage.');
      } catch (error) {
        console.error('Error al guardar los datos en AsyncStorage:', error);
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
      }

      // Actualizar el estado local con los datos actualizados
      setUserData(combinedUserData);
    } else {
<<<<<<< HEAD
      console.log("El documento del usuario no existe.");
=======
      console.log('El documento del usuario no existe.');
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    }
  });

  // Retorna la función para cancelar la suscripción (desconectar la escucha)
  return unsubscribe;
};
<<<<<<< HEAD

export const verificarYCrearChat = async (
  chatId: string,
  userid: string,
  pymeid: string
) => {
  const chatDocRef = doc(ikam, "chat", chatId);
  const chatDoc = await getDoc(chatDocRef);
  if (!chatDoc.exists()) {
    await setDoc(chatDocRef, {
      creadoEn: new Date(),
      idPyme: pymeid,
      idUser: userid,
    });
  }
};

export const suscribirseAlChat = (
  chatId: string,
  callback: (mensajes: any[]) => void
) => {
  try {
    // Escuchar los mensajes de la subcolección `mensaje` en tiempo real
    const mensajesQuery = query(
      collection(ikam, "chat", chatId, "mensaje"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(mensajesQuery, (querySnapshot) => {
      const mensajesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(mensajesArray);
    });

    return unsubscribe; // Devuelve la función de limpieza
  } catch (error) {
    console.error("Error suscribiéndose al chat:", error);
  }
};

// Función para suscribirse a los chats del usuario
export const suscribirseAChats = (
  userId: string,
  callback: (chats: any[]) => void
) => {
  try {
    const q = query(collection(ikam, "chat"), where("idUser", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(chatsArray);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error suscribiéndose a los chats:", error);
  }
};

// Función para suscribirse a los chats del usuario pyme
export const suscribirseAChatsPyme = (
  userId: string,
  callback: (chats: any[]) => void
) => {
  try {
    const q = query(collection(ikam, "chat"), where("idPyme", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(chatsArray);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error suscribiéndose a los chats de pyme:", error);
  }
};

export const enviarMensaje = async (
  chatId: string,
  mensaje: string,
  uid: string
) => {
  if (mensaje.trim() === "") return; // No enviar si el mensaje está vacío

  try {
    // Enviar el mensaje a la subcolección `mensaje`
    await addDoc(collection(ikam, "chat", chatId, "mensaje"), {
      mensaje: mensaje, // El texto del mensaje
      timestamp: new Date(), // Marca de tiempo
      user: uid, // ID del usuario que envía el mensaje
    });

    console.log("Mensaje enviado:", mensaje);
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  }
};

export const suscribirseAMensajes = (chatId: any, callback: any) => {
  const mensajesRef = collection(ikam, "chat", chatId, "mensaje");
  
  const q = query(mensajesRef, orderBy("timestamp")); // Asegúrate de que el campo que usas aquí es el correcto
  
  return onSnapshot(q, (querySnapshot) => {
    const mensajes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(mensajes);
  });
};

export const suscribirseAMensajesPyme = (chatId: any, callback: any) => {  
  const mensajesRef = collection(ikam, "chat", chatId, "mensaje");
  const q = query(mensajesRef, orderBy("timestamp"));  
  return onSnapshot(q, (querySnapshot) => {
    const mensajes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(mensajes);
  });
};

export const suscribirseAUser = (callback: (user: User[]) => void) => {
  try {
    const unsubscribe = onSnapshot(
      collection(ikam, "users"),
      (querySnapshot) => {
        const usersArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        callback(usersArray);
      }
    );

    return unsubscribe; // Devuelve la función de limpieza
  } catch (error) {
    console.error("Error suscribiéndose a los usuarios:", error);
  }
};
=======
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
