import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text,Linking, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import api from '../enviroments/api.json'


var navigation_:any;
const Mapa = ({ route,navigation}:any) => {
    navigation_ = navigation;
    const [data, setData] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => { 
        //navigation_.setOptions({headerShown:false});
        const fetchData = async () => {
            try {
  
              const suser:any = await AsyncStorage.getItem("usuario");
              const type = route?.params?.TYPE;
              const obj = route?.params?.DATA;
              if(!suser || suser==null){
                  navigation_.replace("Login");
                  return;
              } 
  
              const usuario = JSON.parse(suser);
              
              const response = await fetch(api.url+'/app', 
              {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json',},
                  body: JSON.stringify({key:api.key, type:type,data:obj}),                                       
              });
              const data = await response.json();
              setData(data.data);

              const getLocation = () => {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                  },
                  (error) => {
                    setError(error.message);
                  },
                  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
              };
          
              // Llama a la función para obtener la ubicación
              getLocation();
            } catch (error) {
              return {estado:"error", error};
            }
          }
          fetchData();
    }, []);
    const sendGoggleMaps=(obj:any)=>{
        const lati = parseFloat(obj.LATITUD)
        const long =parseFloat(obj.LONGITUD);   

        console.log(obj)
        const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${lati},${long}`;
        Linking.openURL(mapUrl)
          .catch((error) => console.error('Error al abrir Google Maps:', error));
    }
    const pintarSucursales=()=>{
        if(data){
            return Object.values(data).map((sucursal:any)=>{
                return <Marker
                    key={sucursal.ID}
                    coordinate={{ latitude: parseFloat(sucursal.LATITUD), longitude: parseFloat(sucursal.LONGITUD) }}
                    title={sucursal.DESCRIPCION}
                    description={sucursal.DIRECCION}
                    onPress={() => sendGoggleMaps(sucursal)} 
                    />
            })
        }
        return null;
    };

    return (
        <View>
            <MapView 
                style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}
                initialRegion={{
                    latitude: -17.1214164,
                    longitude: -62.8460487,
                    latitudeDelta: 15,
                    longitudeDelta: 14,
                }}>
                    {
                        pintarSucursales()
                    }
                </MapView>
        </View>
    )
};

export default Mapa;