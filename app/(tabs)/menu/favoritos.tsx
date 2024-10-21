<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import { auth, ikam } from "@/firebase/config-ikam";
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, ikam } from "@/firebase/config-ikam";
import ListaPymes from "@/components/pymes";

interface Pyme {
  id: string;
  [key: string]: any; // Permite propiedades adicionales
}

export default function App() {
  const [pymeSeleccionada, setPymeSeleccionada] = useState<null | Pyme>(null);
  const [vistaDetalles, setVistaDetalles] = useState<boolean>(false);
  const [pymesLikes, setPymesLikes] = useState<string[]>([]); // Arreglo de IDs de pymes que les gustan
  const [pymesQ, setPymesQ] = useState<Pyme[]>([]); // Arreglo de pymes filtradas
  const [pymes, setPymes] = useState<Pyme[]>([]); // Arreglo de pymes obtenidas de Firestore

  useEffect(() => {
    fetchPymes();
    const unsubscribeLikes = fetchPymesLikes();

    return () => {
      if (unsubscribeLikes) {
        unsubscribeLikes();
      }
    };
  }, []);

  useEffect(() => {
    if (pymes.length > 0 && pymesLikes.length > 0) {
      const likedPymes = pymes.filter((pyme) => pymesLikes.includes(pyme.id));
      setPymesQ(likedPymes);
    } else {
      setPymesQ([]); // Resetear si no hay pymes o likes
    }
  }, [pymes, pymesLikes]);

  const fetchPymes = async () => {
=======
import ListaPymes from "@/components/pymes";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function App() {
  const [pymeSeleccionada, setPymeSeleccionada] = useState(null);
  const [vistaDetalles, setVistaDetalles] = useState(false);
  const [pymesLikes, setPymesLikes] = useState([]);
  const [pymesUser, setPymesUser] = useState([]);
  const [pymesQ, setPymesQ] = useState([]);
  const [pymes, setPymes] = useState([]);

  const obtenerPymes = async () => {
    obtenerAtributosColeccion();
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    try {
      const querySnapshot = await getDocs(collection(ikam, "pyme"));
      const pymesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
<<<<<<< HEAD
      })) as Pyme[];
=======
      }));
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
      setPymes(pymesArray);
    } catch (error) {
      console.error("Error fetching pymes:", error);
    }
  };

<<<<<<< HEAD
  const fetchPymesLikes = () => {
    try {
      const user = auth.currentUser;
      if (!user) return; // Asegurarse de que el usuario esté autenticado
=======
  const obtenerPymesLikes = () => {
    try {
      const user = auth.currentUser;
      if (!user) return; // Ensure the user is authenticated
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e

      const likesCollection = collection(ikam, "likes");
      const unsubscribe = onSnapshot(likesCollection, (querySnapshot) => {
        const pymesLikesArray = querySnapshot.docs
<<<<<<< HEAD
          .filter((doc) => doc.data().userId === user.uid)
          .map((doc) => doc.data().pymeId);
=======
          .filter((doc) => doc.data().userId === user.uid) // Filter likes for the current user
          .map((doc) => doc.data().pymeId); // Assuming each like document contains the pymeId
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e

        setPymesLikes(pymesLikesArray);
      });

<<<<<<< HEAD
      return unsubscribe;
=======
      // Cleanup subscription on unmount
      return () => unsubscribe();
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

<<<<<<< HEAD
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <Text style={styles.favoritesText}>Favoritos</Text>
      <ScrollView>
        {pymesQ.length > 0 ? (
          <View style={styles.pymesContainer}>
            <ListaPymes
              setPymeSeleccionada={setPymeSeleccionada}
              pymesQ={pymesQ}
              setVistaDetalles={setVistaDetalles}
            />
          </View>
        ) : (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>¡No tienes favoritos!</Text>
            <Text style={styles.notFoundText}>Añade algunos</Text>
            <Image
              source={require("@/assets/img/abuNotFound.png")}
              style={styles.notfoundImg}
            />
          </View>
        )}
=======
  useEffect(() => {
    obtenerPymes();
    obtenerPymesLikes();
  }, []);

  useEffect(() => {
    if (pymes.length > 0 && pymesLikes.length > 0) {
      const likedPymes = pymes.filter((pyme) => pymesLikes.includes(pyme.id));
      setPymesQ(likedPymes);
    }
  }, [pymes, pymesLikes]);

  const obtenerAtributosColeccion = async () => {
    try {
      const querySnapshot = await getDocs(collection(ikam, "likes"));
      const atributos = new Set();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        Object.keys(data).forEach((key) => {
          atributos.add(key);
        });
      });

      console.log("Atributos de la colección 'pyme':", Array.from(atributos));
    } catch (error) {
      console.error(
        "Error obteniendo los atributos de la colección 'pyme':",
        error
      );
    }
  };

  const obtenerDetallesPyme = async (pymeId) => {
    const docRef = doc(ikam, "pyme", pymeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar style="light" />
      <Text style={styles.textoFavoritos}>Favoritos</Text>
      <ScrollView>
        {pymesQ.length > 0 ? (
          <View>
            <View style={styles.contenedorPymes}>
              <ListaPymes
                setPymeSeleccionada={setPymeSeleccionada}
                pymesQ={pymesQ}
                setVistaDetalles={setVistaDetalles}
              />
            </View>
          </View>
        ) : (
          <View style={styles.contenedorNF}>
            <Text style={styles.noEncontrado}>¡No tienes favoritos!</Text>
            <Text style={styles.noEncontrado}>Añade algunos</Text>
            <Image
              source={require("@/assets/img/abuNotFound.png")}
              style={[styles.notfoundImg]}
            />
          </View>
        )}        
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  favoritesText: {
=======
  textoFavoritos: {
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    marginVertical: 15,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
<<<<<<< HEAD
  pymesContainer: {
=======
  areaSegura: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  cabecera: {
    backgroundColor: "#CC0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 85,
    height: 85,
    resizeMode: "contain",
  },
  contenedorCategorias: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  contenedorPymes: {
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
<<<<<<< HEAD
  notFoundContainer: {
=======
  contenedorNF: {
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    flex: 1,
    paddingTop: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  notfoundImg: {
    width: 300,
    height: 300,
<<<<<<< HEAD
    marginTop: 15,
  },
  notFoundText: {
    color: "#888",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
=======
    marginTop: 15
  },
  noEncontrado: {
    textAlign: "center",
    fontSize: 30,
>>>>>>> 4adf141ae0548d8b6db8da031e0ebb2402f4f58e
    marginVertical: 15,
  },
});
