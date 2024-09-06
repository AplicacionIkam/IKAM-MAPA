import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import { ikam } from "@/firebase/config-ikam";
import { Pyme } from "@/models/Pyme";
import { Categoria } from "@/models/Categoria";

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
    const querySnapshot = await getDocs(collection(ikam, 'preguntas'));
    const questions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

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
    return () => {}; // Retorna una función vacía en caso de error
  }
};

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
