import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
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
