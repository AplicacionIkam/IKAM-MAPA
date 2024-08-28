import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import ModalTerminosCondiciones from '@/components/modalPoliticas'; // Asegúrate de que la ruta sea correcta
 
import Icon from "react-native-vector-icons/FontAwesome5";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserCircle, faShieldAlt, faBell, faLock, faSignOutAlt, faGavel, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import { getUserData, clearUserData } from "@/auth/authService";
import { useRouter } from 'expo-router';
import { doc, deleteDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { auth, ikam } from '@/firebase/config-ikam';
import { deleteUser } from 'firebase/auth';
 
 
export default function App() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(); // Obtener datos del usuario desde AsyncStorage y Firestore
        if (data && data.uid) {
          const userDocRef = doc(ikam, 'users', data.uid);
          const userDoc = await getDoc(userDocRef);
 
          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Guardar datos del usuario en el estado
          } else {
            console.log('No such document!');
            setUserData(null); // Manejar el caso en que no se encuentra el documento
          }
        } else {
          console.log('No user data found or UID is missing');
          setUserData(null); // Manejar el caso en que no hay datos de usuario
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Siempre debe establecerse a false cuando se complete la carga
      }
    };
    fetchUserData();
  }, []);
 
 
  const handleSignin = () => {
    router.replace('/LoginScreen');
  };
  
  useEffect(() => {
    library.add(faUserCircle, faShieldAlt, faBell, faLock, faSignOutAlt, faGavel, faUserTimes);
  }, []);
 
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  
  const handleSignIn = () => {
    router.replace('/LoginScreen');
  };
 
  if (!userData) {
    return <SafeAreaView style={styles.safeArea}>
    <View style={styles.contenedorPerfil}>
      <View style={styles.contenedorPerfilColumnas}>
        <Icon name="user-circle" size={70} color="#FFF" solid />
        <View style={styles.textoPerfilContainer}>
          <Text style={styles.textoPerfil}>Invitado</Text>
        </View>
      </View>
    </View>
    <ScrollView style={styles.contenedorOpciones}>
      <RenderOption icon="gavel" text="Política Privacidad" onPress={() => setModalVisible(true)} />
      <RenderOption icon="sign-in-alt" text="Iniciar Sesión" onPress={handleSignIn} />
    </ScrollView>
    <ModalTerminosCondiciones
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  </SafeAreaView>
  }
 
  const handleSignOut = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que desea cerrar tu sesión?',
      [
        { text: 'No', onPress: () => null, style: 'cancel' },
        {
          text: 'Sí', onPress: async () => {
            try {
              await clearUserData();
              router.replace('/WelcomeScreen');
            } catch (error) {
              console.error('Error signing out:', error);
            }
          }
        },
      ],
      { cancelable: false }
    );
  };
 
  const handleDeletAccount = () => {
    Alert.alert(
      '¿Estás seguro que desea eliminar su cuenta?',
      'Esta acción eliminara su cuenta, aunque puede volver a crear una nueva con su correo',
      [
        { text: 'No', onPress: () => null, style: 'cancel' },
        {
          text: 'Sí', onPress: async () => {
            try {
              const user = auth.currentUser;
 
              if (user) {
                const userId = user.uid;
                // Elimina los datos del usuario en Firestore
                const userDocRef = doc(ikam, 'users', user.uid);
                await deleteDoc(userDocRef);
 
                // Eliminar todos los documentos en la colección 'likes' donde userId coincide
                const likesCollectionRef = collection(ikam, 'likes');
                const q = query(likesCollectionRef, where('userId', '==', userId));
                const querySnapshot = await getDocs(q);
 
                querySnapshot.forEach(async (doc) => {
                  await deleteDoc(doc.ref);
                });
 
                // Elimina la cuenta de Firebase Authentication
                await deleteUser(user);
 
                // Redirige a la pantalla de bienvenida
                router.replace('/WelcomeScreen');
              }
            } catch (error) {
              console.error('Error deleting account:', error);
              router.replace('/WelcomeScreen');
            }
          }
        },
      ],
      { cancelable: false }
    );
  };
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contenedorPerfil}>
        <View style={styles.contenedorPerfilColumnas}>
          <Icon name="user-circle" size={70} color="#FFF" solid />
          <View style={styles.textoPerfilContainer}>
            <Text style={styles.textoPerfil}>{userData.display_name + " " + userData.last_name}</Text>
            <Text style={styles.textoCorreo}>{userData.email}</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.contenedorOpciones}>
        <RenderOption icon="gavel" text="Política Privacidad" onPress={() => setModalVisible(true)} />
        <RenderOption icon="sign-out-alt" text="Cerrar Sesión" onPress={handleSignOut} />
        <RenderOption icon="user-times" text="Eliminar Cuenta" onPress={handleDeletAccount} />
      </ScrollView>
      <ModalTerminosCondiciones
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}
 
const RenderOption = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.elementoOpcion} onPress={onPress}>
    <Icon name={icon} size={24} color="#888" solid />
    <Text style={styles.textoOpcion}>{text}</Text>
    <Text style={styles.flecha}>›</Text>
  </TouchableOpacity>
);
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
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
  contenedorPerfil: {
    backgroundColor: "#222C57",
    paddingVertical: 20,
    paddingLeft: 25,
  },
  contenedorPerfilColumnas: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoPerfilContainer: {
    marginLeft: 20,
  },
  textoPerfil: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  textoCorreo: {
    fontSize: 17,
    color: "#FFF",
  },
  contenedorOpciones: {
    paddingHorizontal: 20,
  },
  elementoOpcion: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  textoOpcion: {
    marginLeft: 15,
    fontSize: 20,
  },
  flecha: {
    fontSize: 35,
    color: "#888",
    marginLeft: "auto",
  },
});