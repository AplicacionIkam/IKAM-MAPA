import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Dimensions,
  View,
  StyleSheet,
  SafeAreaView,
  BackHandler,
  Alert,
  Text,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import BarraBusquedaCategoriaSeleccionada from "@/components/barraBusquedaCategoriaSeleccionada";
import { suscribirseAPymes, suscribirseACategorias } from "@/services/services";
import BarraBusquedaCategoria from "@/components/barraBusquedaCategoria";
import BarraBusqueda from "@/components/barraBusqueda";
import ListaCategorias from "@/components/categorias";
import ModalFiltro from "@/components/modalFiltro";
import { Categoria } from "@/models/Categoria";
import ListaPymes from "@/components/pymes";
import { Pyme } from "@/models/Pyme";

const { width: viewportWidth } = Dimensions.get("window");

const App = () => {
  const [pymes, setPymes] = useState<Pyme[]>([]); // BD NO MODIFICAR
  const [pymesCol, setPymesCol] = useState<Pyme[]>([]); // pyme filtro por colonia
  const [pymesQ, setPymesQ] = useState<Pyme[]>([]); // Se ocupa como copia se hace busqueda

  const [pymeSeleccionada, setPymeSeleccionada] = useState<string | null>(null);

  const [colonia, setColonia] = useState<string>("");

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriasF, setCategoriasF] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<string>("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    string | null
  >(null);
  const [busquedaPyme, setBusquedaPyme] = useState<string>("");

  const [busquedaCategoria, setBusquedaCategoria] = useState<string>("");

  const [vistaDetalles, setVistaDetalles] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Obtener todas las Pymes
  useEffect(() => {
    const unsubscribe = suscribirseAPymes(setPymes);
    return () => unsubscribe && unsubscribe();
  }, []);

  // Obtener todas las Categorias
  useEffect(() => {
    const unsubscribe = suscribirseACategorias((categorias) => {
      setCategorias(categorias);
      setCategoriasF(categorias); // Guardar la lista original
    });
    return () => unsubscribe && unsubscribe();
  }, []);
  
  useEffect(() => {
    setColonia("");
  }, []);
  
  useEffect(() => {
    if (categoriaSeleccionada) {
      if (categoriaSeleccionada !== "1") {
        const cat = categorias.find((cat) => cat.id === categoriaSeleccionada);
        setCategoria(cat?.nombreCat || "");
      } else {
        setCategoria(categoriaSeleccionada);
      }
    }
  }, [categoriaSeleccionada]);

  // Filtro por colonia y categoria
  useEffect(() => {
    if (colonia) {
      if (categoria && categoria !== "1") {
        const pyme = pymes.filter(
          (p) =>
            p.nomColonia &&
            typeof p.nomColonia === "string" &&
            p.nomColonia.includes(colonia) &&
            p.nombreCategoria &&
            typeof p.nombreCategoria === "string" &&
            p.nombreCategoria.includes(categoria)
        );
        setPymesCol(pyme);
        setPymesQ(pyme);
      } else {
        const pyme = pymes.filter(
          (p) =>
            p.nomColonia &&
            typeof p.nomColonia === "string" &&
            p.nomColonia.includes(colonia)
        );
        setPymesCol(pyme);
        setPymesQ(pyme);
      }
    } else {
      if (categoria && categoria !== "1") {
        const pyme = pymes.filter(
          (p) =>
            p.nombreCategoria &&
            typeof p.nombreCategoria === "string" &&
            p.nombreCategoria.includes(categoria)
        );
        setPymesCol(pyme);
        setPymesQ(pyme);
      } else {
        setPymesCol(pymes);
        setPymesQ(pymes);
      }
    }
  }, [colonia, pymes, categoria]);

  // Filtro por nombre de pymes
  useEffect(() => {
    if (busquedaPyme) {
      const pyme = pymesCol.filter((p) =>
        p.nombre_pyme?.toLowerCase().includes(busquedaPyme.toLowerCase())
      );
      setPymesQ(pyme);
    } else {
      setPymesQ(pymesCol);
    }
  }, [busquedaPyme, pymesCol]);

  // Filtro de categorias
  useEffect(() => {
    if (busquedaCategoria) {
      const categoriasFiltradas = categoriasF.filter((categoria) =>
        categoria.nombreCat
          .toLowerCase()
          .includes(busquedaCategoria.toLowerCase())
      );
      setCategorias(categoriasFiltradas);
    } else {
      setCategorias(categoriasF);
    }
  }, [busquedaCategoria, categoriasF]);

  // Manejar el evento de retroceso en Android
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (categoriaSeleccionada) {
          setCategoriaSeleccionada(null);
          setBusquedaCategoria("");
          return true;
        } else {
          Alert.alert(
            "Salir",
            "¿Estás seguro que quieres salir?",
            [
              { text: "No", onPress: () => null, style: "cancel" },
              { text: "Sí", onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          );
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [categoriaSeleccionada])
  );

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <StatusBar style="light" />
      {categoriaSeleccionada === null ? (
        <View style={estilos.contenedorCategorias}>
          <BarraBusquedaCategoria
            busquedaCategoria={busquedaCategoria}
            setbusquedaCategoria={setBusquedaCategoria}
            colonia={colonia}
            setColonia={setColonia}
          />
          <ListaCategorias
            setCategoriaSeleccionada={setCategoriaSeleccionada}
            categorias={categorias}
            categoriaSeleccionada={categoriaSeleccionada}
          />
        </View>
      ) : (
        <View style={estilos.contenedorPymes}>
          <BarraBusqueda
            busquedaPyme={busquedaPyme}
            setbusquedaPyme={setBusquedaPyme}
            setModalVisible={setModalVisible}
          />
          <BarraBusquedaCategoriaSeleccionada
            categorias={categorias}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
            categoriaSeleccionada={categoriaSeleccionada}
          />
          {pymes.length > 0 ? (
            <ListaPymes
              setPymeSeleccionada={setPymeSeleccionada}
              pymesQ={pymesQ}
              setVistaDetalles={setVistaDetalles}
            />
          ) : (
            <View style={estilos.contenedorMensaje}>
              <Text style={estilos.mensajeNoPymes}>
                No hay pymes disponibles para esta categoría
              </Text>
            </View>
          )}
        </View>
      )}
      <ModalFiltro
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        colonia={colonia}
        setColonia={setColonia}
      />
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
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
    flex: 1,
    paddingHorizontal: 5,
  },
  contenedorPymes: {
    flex: 1,
    paddingHorizontal: 5,
  },
  contenedorMensaje: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mensajeNoPymes: {
    textAlign: "center",
    fontSize: 25,
    marginVertical: 20,
  },
  tarjeta: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: (viewportWidth * 0.88 - 20) / 2, // Ajusta el ancho para dos columnas
    marginVertical: 10,
    marginHorizontal: 10, // Espacio horizontal entre columnas
  },
  imagenContainer: {
    width: "100%",
    height: (viewportWidth * 0.88 - 20) / 2, // Hacer que la altura sea igual al ancho para que sea cuadrado
    position: "relative",
  },
  imagenTarjeta: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Asegura que la imagen mantenga el aspecto y cubra el contenedor
  },
  detalleTarjeta: {
    flex: 1,
    padding: 10,
  },
  tituloTarjeta: {
    textAlign: "center",
    fontSize: 16,
  },
  tarjetaTodasPymes: {
    backgroundColor: "#EFEFEF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textoTarjeta: {
    fontSize: 18,
    color: "#333",
  },
});

export default App;
