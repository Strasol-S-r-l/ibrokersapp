import React, { useEffect, useState }  from 'react';
import { Text, View, Image, FlatList, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import api from '../enviroments/api.json'

const send = {
    key:api.key,
    type:"getUsuarios" 
};

var navigation_:any;
const Usuarios = ({navigation}:any) => {
    const [data, setData] = useState(null);

    useEffect(() => { 
        const fetchData = async () => {
          try {
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify(send),                                       
            });
            const data = await response.json();
            setData(data.data);
          } catch (error) {
            return {estado:"error", error};
          }
        }
        fetchData();
    }, []);

    const pintar=(usuario:any)=>{    
        return  <View key={usuario.PERSONA.CI} style={styles.card}>
            <View style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
                <Image 
                    style={{width:100, height:100, borderRadius:15}}
                    source={{uri: api.url+"/imagesAdmin/"+usuario.PERSONA.CI}}
                />
            </View>
            <Text style={styles.texto}>{usuario.PERSONA.CI}</Text>
            <Text style={styles.texto}>{usuario.PERSONA.NOMBRE_COMPLETO}</Text>
            <Text style={styles.texto}>{usuario.PERSONA.EMAIL}</Text>
            <Text style={styles.texto}>{usuario.PERSONA.TELEFONO}</Text>
        </View>
    };


    navigation_ = navigation;
    return (
        <View>
            
             <ImageBackground 
                source={require('../images/fondoBlanco.jpeg')}
                style={{height:'100%', width:'100%'}}>
                {data ? <Text style={{textAlign:"center", marginTop:10}}>Resultados: {Object.keys(data).length}</Text> : ""}
                {data?
                <FlatList
                    data={Object.values(data)}
                    renderItem={({item}) =>  pintar(item)}
                    keyExtractor={item => item.ID}
                />:<View style={{flex:1, width:'100%', justifyContent:'center', alignItems:'center' ,backgroundColor:'rgba(0,0,0,0.7)'}}><ActivityIndicator size={'large'} color={'white'}/></View>
                }
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    card:{
        marginTop:5, 
        borderRadius:10,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#000000aa', 
        padding:10, 
        paddingBottom:10,
        elevation:5,
        shadowColor:'#000',
        shadowOpacity: 0.7,
        shadowOffset:{width:5,height:5},
        shadowRadius:4,
    },
    texto:{
        color:"#fff",
        textAlign:'center',
        paddingTop:5
    },
});

export default Usuarios;