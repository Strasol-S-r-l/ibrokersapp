import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, Dimensions } from 'react-native';
import api from '../enviroments/api.json'
import IconComponent from './assets/icons/IconComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const send = {
    key: api.key,
    TIPO: 0,
    ID: 0,
    type: "getUsuarios"
};

var navigation_: any;
const uniqueTimestamp = new Date().getTime() + '';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Usuarios = ({ route, navigation }: any) => {
    const [data, setData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                navigation.setOptions({ headerShown: false });
                const suser: any = await AsyncStorage.getItem("usuario");
                if (!suser || suser == null) {
                    navigation_.replace("Login");
                    return;
                }
                const usuario = JSON.parse(suser);
                send.TIPO = route?.params?.TIPO;
                send.ID = usuario.ID_CLIENTES;
                const response = await fetch(api.url + '/app',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', },
                        body: JSON.stringify(send),
                    });
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                return { estado: "error", error };
            }
        }
        fetchData();
    }, []);

    const pintar = (usuario: any) => {
        let color_seguimiento = '#334477';
        if (usuario?.SEGUIMIENTO_SINIESTRO || usuario.APERTURA_SINIESTRO) {
            color_seguimiento = 'orange';
        }
        return <View key={usuario.CI} style={{ ...styles.card, position: 'relative' }}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}>
                <IconComponent nameIcon='fondoCardUsuario' alto='' ancho='' data={{ color_2: "white", color_1: color_seguimiento, heightV: screenHeight * 0.3, widthV: screenWidth * 0.95, opacity: "1", offset_1: "48%", offset_2: "50%" }}></IconComponent>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                <View style={{ width: '50%', padding: 10, height: screenHeight * 0.3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 15 }}
                        source={{ uri: api.url + "/imagesAdmin/" + usuario.CI + '?timestamp=' + uniqueTimestamp }}
                    />
                    <Text style={{ ...styles.texto, width: 100, textAlign: "center" }}>{usuario.CI}</Text>
                    <Text style={{ ...styles.texto, textAlign: "center" }}>{usuario.NOMBRE_COMPLETO}</Text>
                    <Text style={{ ...styles.texto, textAlign: "center" }}>{usuario.CARGO}</Text>
                </View>
                <View style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <View style={{ left: "10%", flex: 1, minHeight: "10%", maxHeight: "33.33%", width: "84%", justifyContent: "center" }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => callUser(usuario.TELEFONO)}>
                            <Text style={{ textAlign: 'left', color: "skyblue" }}>{usuario.TELEFONO}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ left: "20%", flex: 1, maxHeight: "33.33%", width: "84%", justifyContent: "center" }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => sendEmail(usuario.EMAIL)}>
                            <Text style={{ textAlign: 'left', color: "skyblue" }}>{usuario.EMAIL}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ left: "15%", flex: 1, maxHeight: "33.33%", width: "84%", justifyContent: "center" }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => actionJSON('Mapa',{TYPE:'getSucursalUsuario',DATA:usuario})}>
                            <Text style={{ textAlign: 'left', color: "black" }}>{usuario.SUCURSAL}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    };
    const callUser = (telefono: any) => {
        Linking.openURL("tel:" + telefono)
            .then((supported) => {
                if (!supported) {
                    console.log('La aplicación de teléfono no está disponible en este dispositivo.');
                }
            })
            .catch((error) => {
                console.error('Error al intentar abrir la aplicación de teléfono:', error);
            });
    }
    const pintarMainContainer = () => {
        return <FlatList
            data={Object.values(data)}
            renderItem={({ item }) => pintar(item)}
            keyExtractor={item => item.ID}
        />

    }
    const sendEmail = (email: any) => {
        let subject = 'Asunto del correo';
        let body = 'Contenido del correo electrónico';

        const emailUrl = `mailto:${email}?subject=${subject}&body=${body}`;

        Linking.openURL(emailUrl)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(emailUrl);
                } else {
                    console.error('No es posible abrir la aplicación de correo electrónico.');
                }
            })
            .catch((err) => {
                console.error('Error al abrir la aplicación de correo electrónico:', err);
            });
    };
    const toBack = () => {
        navigation.goBack();
    }
    const actionJSON = (nav: String, obj: any) => {
        navigation.navigate(nav, obj);
    }
    return (
        <View style={{ flex: 1, position: "relative" }} >

            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <IconComponent nameIcon='fondo' alto='55px' ancho='55px' data={{ color_1: "#BBEEAA", color_2: "#334477" }}></IconComponent>
            </View>
            
            <View style={{ flex: 1 }}>
                <View style={{ top: 0, left: 0, width: screenWidth,height:54,padding:2 ,backgroundColor:'rgba(0,0,0,0.3)'}}>
                    <TouchableOpacity onPress={() => toBack()}>
                        <IconComponent nameIcon="iconLeftCircle" alto="50" ancho="50" data={{ color_1: "none" }}></IconComponent>
                    </TouchableOpacity>
                </View>
                {data ? pintarMainContainer() : <View style={{ flex: 1,position:'absolute', left:0,top:0,bottom:0,right:0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}><ActivityIndicator size={'large'} color={'white'} /></View>}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 15,
        borderRadius: 10,
        marginLeft: screenWidth * 0.025,
        marginRight: screenWidth * 0.025,
        height: screenHeight * 0.3,
        width: screenWidth * 0.95
    },
    texto: {
        color: "#fff",
        paddingTop: 5
    },
});

export default Usuarios;